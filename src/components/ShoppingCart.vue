<template>
  <div class="shopping-cart">
    <h2>Shopping Cart</h2>

    <ul v-if="cartItems.length">
      <li v-for="item in cartItems" :key="item._id">
        {{ item.title }} - ${{ item.price }} (x{{ item.quantity }})
        <button @click="removeFromCart(item._id)">Remove</button>
      </li>
    </ul>

    <p v-else>Your cart is empty.</p>
    <button @click="$emit('proceed-checkout')" :disabled="!cartItems.length">Proceed to Checkout</button>
  </div>
</template>

<script>
export default {
  props: ["cartItems", "backendUrl"],
  methods: {
    removeFromCart(_id) {
      this.$emit("remove-from-cart", _id);
    },
  },
};
</script>
