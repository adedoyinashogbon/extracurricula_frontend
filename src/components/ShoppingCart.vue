<template>
  <div class="shopping-cart">
    <h2>Shopping Cart</h2>
    <ul>
      <li v-for="item in cartItems" :key="item.id">
        {{ item.title }} - ${{ item.price }}
        <button @click="removeFromCart(item.id)">Remove</button>
      </li>
    </ul>
    <button v-if="cartItems.length" @click="proceedToCheckout">Proceed to Checkout</button>
  </div>
</template>

<script>
export default {
  props: ['cartItems'],
  methods: {
    removeFromCart(id) {
      console.log('ShoppingCart.vue: Emitting remove-from-cart event for id:', id);
      this.$emit('remove-from-cart', id);
    },
    proceedToCheckout() {
      console.log('ShoppingCart.vue: Emitting proceed-checkout event');
      this.$emit('proceed-checkout'); // Notify parent to show checkout
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
