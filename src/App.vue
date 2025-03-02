<template>
  <div id="app">
    <header class="app-header">
      <h1 class="app-title">
        <span class="extra">Extra</span>
        <span class="curricula">Curricula</span>
      </h1>
    </header>

    <!-- Show LessonList and ShoppingCart if not checking out -->
    <div v-if="!isCheckingOut">
      <LessonList 
        :backendUrl="backendUrl" 
        @add-to-cart="addToCart" 
      />
      <ShoppingCart 
        :cartItems="cart" 
        :backendUrl="backendUrl"
        @remove-from-cart="removeFromCart"
        @proceed-checkout="showCheckoutPage"
      />
    </div>

    <!-- Show CheckoutForm if checking out -->
    <CheckoutForm 
      v-else 
      :cartItems="cart"
      :backendUrl="backendUrl"
      @order-placed="completeOrder" 
      @back-to-cart="cancelCheckout"
    />
  </div>
</template>

<script>
import LessonList from './components/LessonList.vue';
import ShoppingCart from './components/ShoppingCart.vue';
import CheckoutForm from './components/CheckoutForm.vue';

export default {
  components: { LessonList, ShoppingCart, CheckoutForm },
  data() {
    return {
      cart: [], // ✅ Cart is now reactive
      isCheckingOut: false, // ✅ Tracks checkout state
      backendUrl: process.env.VUE_APP_BACKEND_URL || "https://extracurricula-backend.onrender.com" 
    };
  },
  methods: {
    async addToCart(lesson) {
      console.log('App.vue: Adding to cart:', lesson);

      const existingItem = this.cart.find(item => item._id === lesson._id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ ...lesson, quantity: 1 });
      }

      // ✅ Update spaces in backend and ensure latest data
      try {
        const response = await fetch(`${this.backendUrl}/lessons/${lesson._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ spaces: Math.max(0, lesson.spaces - 1) }), // ✅ Prevent negative spaces
        });

        if (response.ok) {
          lesson.spaces = Math.max(0, lesson.spaces - 1); // ✅ Ensure frontend consistency
          this.cart = [...this.cart]; // ✅ Force Vue reactivity update
        } else {
          console.error('❌ Failed to update spaces in backend');
        }
      } catch (error) {
        console.error('❌ Error updating lesson spaces:', error);
      }
    },

    async removeFromCart(_id) {
      console.log('App.vue: Removing from cart item with id:', _id);
      const itemIndex = this.cart.findIndex(item => item._id === _id);

      if (itemIndex !== -1) {
        const item = this.cart[itemIndex];

        // ✅ Ensure spaces are correctly updated
        try {
          const response = await fetch(`${this.backendUrl}/lessons/${_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ spaces: item.spaces + 1 }), // ✅ Corrected spaces update
          });

          if (response.ok) {
            item.spaces++; // ✅ Restore space count correctly
            if (item.quantity > 1) {
              item.quantity--;
            } else {
              this.cart.splice(itemIndex, 1);
            }
            this.cart = [...this.cart]; // ✅ Ensure Vue updates UI
          } else {
            console.error('❌ Failed to update spaces in backend');
          }
        } catch (error) {
          console.error('❌ Error restoring lesson spaces:', error);
        }
      }
    },

    showCheckoutPage() {
      console.log('App.vue: Proceeding to checkout');
      this.isCheckingOut = true;
    },
    completeOrder() {
      console.log('App.vue: Order completed');
      this.cart = [];
      this.isCheckingOut = false;
    },
    cancelCheckout() {
      console.log('App.vue: Returning to cart');
      this.isCheckingOut = false;
    }
  }
};
</script>

<style scoped>
.app-header {
  text-align: center;
  padding: 20px;
  background-color: #4CAF50;
  color: white;
}

.app-title {
  font-size: 2rem;
  font-weight: bold;
}

.extra {
  color: #ffffff;
}

.curricula {
  color: #e97100;
}
</style>
