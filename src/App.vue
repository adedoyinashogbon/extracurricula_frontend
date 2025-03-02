<template>
  <div id="app">
    <header class="app-header">
      <h1 class="app-title">
        <span class="extra">Extra</span>
        <span class="curricula">Curricula</span>
      </h1>
    </header>

    <div v-if="!isCheckingOut">
      <LessonList :backendUrl="backendUrl" @add-to-cart="addToCart" />
      <ShoppingCart
        :cartItems="cart"
        :backendUrl="backendUrl"
        @remove-from-cart="removeFromCart"
        @proceed-checkout="showCheckoutPage"
      />
    </div>

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
import LessonList from "./components/LessonList.vue";
import ShoppingCart from "./components/ShoppingCart.vue";
import CheckoutForm from "./components/CheckoutForm.vue";

export default {
  components: { LessonList, ShoppingCart, CheckoutForm },
  data() {
    return {
      cart: [],
      isCheckingOut: false,
      backendUrl: process.env.VUE_APP_BACKEND_URL || "https://extracurricula-backend.onrender.com",
    };
  },
  methods: {
    async addToCart(lesson) {
      if (lesson.spaces <= 0) return;

      let cartItem = this.cart.find((item) => item._id === lesson._id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        this.cart.push({ ...lesson, quantity: 1 });
      }

      try {
        await fetch(`${this.backendUrl}/lessons/${lesson._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ spaces: lesson.spaces - 1 }),
        });

        lesson.spaces--;
      } catch (error) {
        console.error("❌ Error updating backend spaces:", error);
      }
    },

    async removeFromCart(_id) {
      const itemIndex = this.cart.findIndex((item) => item._id === _id);
      if (itemIndex === -1) return;

      const item = this.cart[itemIndex];

      try {
        await fetch(`${this.backendUrl}/lessons/${_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ spaces: Math.min(5, item.spaces + item.quantity) }),
        });

        this.cart.splice(itemIndex, 1);
      } catch (error) {
        console.error("❌ Error restoring spaces:", error);
      }
    },

    showCheckoutPage() {
      this.isCheckingOut = true;
    },

    completeOrder() {
      this.cart = [];
      this.isCheckingOut = false;
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
