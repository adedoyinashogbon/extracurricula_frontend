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
      :cartItems="cart"
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
      cart: [], // Stores items in the cart
      isCheckingOut: false, // Tracks whether the checkout page is visible
    };
  },
  methods: {
    addToCart(lesson) {
      this.cart.push(lesson);
    },
    removeFromCart(id) {
      this.cart = this.cart.filter(item => item.id !== id);
    },
    showCheckoutPage() {
      this.isCheckingOut = true;
    },
    completeOrder() {
      this.cart = []; // Clear the cart
      this.isCheckingOut = false; // Return to lesson list
    },
    cancelCheckout() {
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
