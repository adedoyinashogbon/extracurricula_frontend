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
      <LessonList @add-to-cart="addToCart" />
      <ShoppingCart 
        :cartItems="cart" 
        @remove-from-cart="removeFromCart" 
        @proceed-checkout="showCheckoutPage" 
      />
    </div>

    <!-- Show CheckoutForm if checking out -->
    <CheckoutForm 
      v-else 
      @order-placed="completeOrder" 
      @cancel-checkout="cancelCheckout" 
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
      cart: [], // Stores items in the cart
      isCheckingOut: false // Tracks whether the checkout page is visible
    };
  },
  methods: {
    addToCart(lesson) {
      console.log('App.vue: Adding to cart:', lesson);
      this.cart.push(lesson);
    },
    removeFromCart(id) {
      console.log('App.vue: Removing from cart item with id:', id);
      this.cart = this.cart.filter(item => item.id !== id);
    },
    showCheckoutPage() {
      console.log('App.vue: Proceeding to checkout');
      this.isCheckingOut = true; // Show only checkout page
    },
    completeOrder(orderDetails) {
      console.log('App.vue: Order completed:', orderDetails);
      this.cart = []; // Clear the cart
      this.isCheckingOut = false; // Return to lesson list
    },
    cancelCheckout() {
      console.log('App.vue: Returning to cart');
      this.isCheckingOut = false; // Navigate back to cart
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
  border-bottom: 2px solid #ddd;
}

.app-title {
  font-size: 2rem;
  font-weight: bold;
}

.extra {
  color: #ffffff;
  text-shadow: 1px 1px 2px #333;
}

.curricula {
  color: #e97100;
  text-shadow: 1px 1px 2px #4CAF50;
}
</style>

<style scoped>
.app-header {
  text-align: center;
  padding: 20px;
  background-color: #4CAF50;
  color: white;
  border-bottom: 2px solid #ddd;
}

.app-title {
  font-size: 2rem;
  font-weight: bold;
}
</style>
