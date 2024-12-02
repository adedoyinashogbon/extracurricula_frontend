<template>
  <div class="shopping-cart">
    <h2>
      <i class="fas fa-shopping-cart"></i> Shopping Cart
    </h2>
    <ul>
      <li v-for="item in cartItems" :key="item.id">
        {{ item.title }} - ${{ item.price }}
        <button @click="removeFromCart(item.id)">Remove</button>
      </li>
    </ul>
    <button v-if="cartItems.length" @click="toggleCheckout">Proceed to Checkout</button>
    <CheckoutForm
      v-if="isCheckout"
      :cartItems="cartItems"
      @order-placed="completeOrder"
      @back-to-cart="isCheckout = false"
    />
  </div>
</template>


<script>
import CheckoutForm from './CheckoutForm.vue';

export default {
  components: { CheckoutForm },
  props: ['cartItems'],
  data() {
    return {
      isCheckout: false,
    };
  },
  methods: {
    removeFromCart(id) {
      console.log('ShoppingCart.vue: Emitting remove-from-cart event for id:', id);
      this.$emit('remove-from-cart', id);
    },
    toggleCheckout() {
      console.log('ShoppingCart.vue: Toggling checkout form');
      this.isCheckout = !this.isCheckout;
    },
    completeOrder() {
      console.log('ShoppingCart.vue: Clearing cart after order completion');
      this.isCheckout = false;
      this.$emit('clear-cart'); // Emit event to clear the cart in parent
    },
  },
};
</script>



<style scoped>
/* Shopping Cart Container */
.shopping-cart {
  border: 1px solid #ddd;
  padding: 20px; /* Increased padding for a cleaner look */
  margin: 15px 0;
  border-radius: 8px; /* Slightly rounded corners */
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

/* Cart List Styling */
.shopping-cart ul {
  list-style: none;
  padding: 0;
}

.shopping-cart li {
  margin: 10px 0; /* More spacing between items */
  display: flex; /* Align content horizontally */
  justify-content: space-between; /* Space out content */
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #ffffff;
}

/* Buttons */
.shopping-cart button {
  margin-left: 10px;
  padding: 8px 12px; /* Larger padding for better usability */
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease; /* Smooth hover effects */
}

.shopping-cart button:hover {
  background-color: #0056b3;
  transform: scale(1.05); /* Slightly larger on hover */
}

.shopping-cart button:active {
  transform: scale(0.98); /* Slightly smaller on click */
}

.shopping-cart button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Empty Cart Message */
.empty-cart-message {
  text-align: center;
  color: #666;
  font-style: italic;
  margin: 20px 0;
}
</style>
