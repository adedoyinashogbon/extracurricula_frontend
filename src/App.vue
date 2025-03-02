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
      <LessonList :backendUrl="backendUrl" @add-to-cart="addToCart" />
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
      cart: [], // ✅ Reactive cart array
      isCheckingOut: false, // ✅ Tracks checkout state
      backendUrl: process.env.VUE_APP_BACKEND_URL || "https://extracurricula-backend.onrender.com"
    };
  },
  methods: {
    async addToCart(lesson) {
      console.log('App.vue: Adding to cart:', lesson);

      try {
        const response = await fetch(`${this.backendUrl}/lessons/${lesson._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ spaces: lesson.spaces - 1 }),
        });

        if (response.ok) {
          lesson.spaces -= 1; // ✅ Update local lesson space count
          this.cart.push({ ...lesson }); // ✅ Ensures reactivity
          this.cart = [...this.cart]; // ✅ Vue detects array changes
        } else {
          console.error('❌ Failed to update lesson spaces on the backend');
        }
      } catch (error) {
        console.error('❌ Error updating lesson:', error);
      }
    },
    async removeFromCart(_id) {
      console.log('App.vue: Removing from cart:', _id);

      try {
        const lessonToRemove = this.cart.find(item => item._id === _id);

        if (lessonToRemove) {
          const response = await fetch(`${this.backendUrl}/lessons/${_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ spaces: lessonToRemove.spaces + 1 }), // ✅ Increase space back when removing
          });

          if (response.ok) {
            this.cart = this.cart.filter(item => item._id !== _id);
          } else {
            console.error('❌ Failed to restore lesson space on the backend');
          }
        }
      } catch (error) {
        console.error('❌ Error removing item from cart:', error);
      }
    },
    showCheckoutPage() {
      console.log('App.vue: Proceeding to checkout');
      this.isCheckingOut = true;
    },
    completeOrder() {
      console.log('App.vue: Order completed');
      this.cart = []; // ✅ Clear the cart after checkout
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
