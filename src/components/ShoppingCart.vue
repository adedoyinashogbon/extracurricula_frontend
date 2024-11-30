<template>
  <div class="shopping-cart">
    <h2>Shopping Cart</h2>
    <ul>
      <li v-for="item in cartItems" :key="item.id">
        {{ item.title }} - ${{ item.price }}
        <button @click="removeFromCart(item.id)">Remove</button>
      </li>
    </ul>
    <button v-if="cartItems.length" @click="toggleCheckout">Proceed to Checkout</button>

    <!-- Checkout Form -->
    <CheckoutForm v-if="isCheckout" @order-placed="completeOrder" />
  </div>
</template>

<script>
import CheckoutForm from './CheckoutForm.vue';

export default {
  components: { CheckoutForm },
  props: ['cartItems'], // Receives the cart items from App.vue
  data() {
    return {
      isCheckout: false // Controls visibility of the checkout form
    };
  },
  methods: {
    removeFromCart(id) {
      console.log('ShoppingCart.vue: Removing item with id:', id);
      this.$emit('remove-from-cart', id); // Notify parent to remove item
    },
    toggleCheckout() {
      console.log('ShoppingCart.vue: Toggling checkout form');
      this.isCheckout = !this.isCheckout;
    },
    completeOrder(orderDetails) {
      console.log('ShoppingCart.vue: Order completed:', orderDetails);
      this.isCheckout = false; // Hide checkout form
      this.$emit('order-completed', orderDetails); // Notify parent
    }
  }
};
</script>

<style scoped>
.shopping-cart {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 15px 0;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.shopping-cart ul {
  list-style: none;
  padding: 0;
}

.shopping-cart li {
  margin: 5px 0;
}

.shopping-cart button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.shopping-cart button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
