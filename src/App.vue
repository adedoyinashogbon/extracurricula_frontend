<template>
  <div id="app">
    <LessonList @add-to-cart="addToCart" />
    <ShoppingCart 
      :cartItems="cart" 
      @remove-from-cart="removeFromCart" 
      @proceed-checkout="handleCheckout" 
    />
  </div>
</template>

<script>
import LessonList from './components/LessonList.vue';
import ShoppingCart from './components/ShoppingCart.vue';

export default {
  components: { LessonList, ShoppingCart },
  data() {
    return {
      cart: [] // Stores the items added to the cart
    };
  },
  methods: {
  addToCart(lesson) {
    console.log('App.vue: Adding to cart:', lesson);
    this.cart.push(lesson); // Add the lesson to the cart
  },
  removeFromCart(id) {
    console.log('App.vue: Removing from cart item with id:', id);
    this.cart = this.cart.filter(item => item.id !== id); // Remove the item
  },
  handleCheckout() {
    console.log('App.vue: Proceeding to checkout with items:', this.cart);
  },
  checkoutComplete(orderDetails) {
    console.log('App.vue: Checkout completed with details:', orderDetails);
    this.cart = []; // Clear the cart
  } 
}

};
</script>
