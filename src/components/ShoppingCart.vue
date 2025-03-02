<template>
  <div class="shopping-cart">
    <h2>
      <i class="fas fa-shopping-cart"></i> Shopping Cart
    </h2>

    <ul v-if="cart.length">
      <li v-for="item in cart" :key="item._id">
        {{ item.title }} - ${{ item.price }} (x{{ item.quantity }})
        <button @click="removeFromCart(item)">Remove</button>
      </li>
    </ul>

    <p v-else class="empty-cart-message">Your cart is empty.</p>

    <button :disabled="!cart.length" @click="toggleCheckout">Proceed to Checkout</button>

    <CheckoutForm
      v-if="isCheckout"
      :cartItems="cart"
      :backendUrl="backendUrl"
      @order-placed="completeOrder"
      @back-to-cart="isCheckout = false"
    />
  </div>
</template>

<script>
import CheckoutForm from './CheckoutForm.vue';

export default {
  components: { CheckoutForm },
  props: ['cartItems', 'backendUrl'],
  data() {
    return {
      cart: [...this.cartItems], // ✅ Copy cartItems to local state
      isCheckout: false,
    };
  },
  watch: {
    // ✅ Keep cart in sync with parent component (App.vue)
    cartItems: {
      handler(newCart) {
        this.cart = [...newCart];
      },
      deep: true,
    },
  },
  methods: {
    async removeFromCart(item) {
      console.log("🔍 Removing item:", item);

      if (!item._id) {
        console.error("❌ Error: Item has no valid _id");
        return;
      }

      try {
        // ✅ Restore original spaces
        const updatedSpaces = item.spaces + item.quantity;

        const response = await fetch(`${this.backendUrl}/lessons/${item._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ spaces: updatedSpaces }),
        });

        if (response.ok) {
          // ✅ Update cart state properly
          this.cart = this.cart.filter(cartItem => cartItem._id !== item._id);
          
          // ✅ Emit updated cart to parent component (App.vue)
          this.$emit('remove-from-cart', this.cart);
        } else {
          console.error('❌ Failed to remove item from cart (Backend Error)');
        }
      } catch (error) {
        console.error('❌ Error removing item from cart:', error);
      }
    },
    toggleCheckout() {
      this.isCheckout = !this.isCheckout;
    },
    completeOrder() {
      this.isCheckout = false;
      this.cart = [];
      this.$emit('clear-cart'); // ✅ Reset cart after checkout
    },
  },
};
</script>

<style scoped>
/* Shopping Cart Container */
.shopping-cart {
  border: 1px solid #ddd;
  padding: 20px;
  margin: 15px 0;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Cart List Styling */
.shopping-cart ul {
  list-style: none;
  padding: 0;
}

.shopping-cart li {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #ffffff;
}

/* Buttons */
.shopping-cart button {
  margin-left: 10px;
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.shopping-cart button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.shopping-cart button:active {
  transform: scale(0.98);
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
