<template>
  <div class="checkout-form">
    <h2>Checkout</h2>
    <form @submit.prevent="submitOrder">
      <div class="form-group">
        <label for="name">Name:</label>
        <input v-model="name" id="name" type="text" placeholder="Enter your name" required />
      </div>
      <div class="form-group">
        <label for="phone">Phone:</label>
        <input v-model="phone" id="phone" type="text" placeholder="Enter your phone number" required />
      </div>
      <button :disabled="!isFormValid">Place Order</button>
    </form>
    <button @click="$emit('back-to-cart')" class="back-button">Back to Cart</button>
  </div>
</template>

<script>
export default {
  props: ['cartItems'],
  data() {
    return {
      backendUrl: process.env.VUE_APP_BACKEND_URL || "https://extracurricula-backend.onrender.com", // ✅ Vue CLI `.env`
      name: '',
      phone: '',
    };
  },
  computed: {
    isFormValid() {
      return /^[a-zA-Z\s]+$/.test(this.name) && /^[0-9]{10,15}$/.test(this.phone); // ✅ Improved validation
    },
  },
  methods: {
    async submitOrder() {
      try {
        const response = await fetch(`${this.backendUrl}/orders`, { // ✅ Uses Render Backend
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: this.name,
            phone: this.phone,
            lessonIds: this.cartItems.map((item) => item._id), // ✅ Uses `_id`
          }),
        });

        if (response.ok) {
          alert('✅ Order placed successfully!');
          this.$emit('order-placed'); // ✅ Emit event
        } else {
          console.error('❌ Order failed');
          alert('⚠️ Order failed. Try again.');
        }
      } catch (error) {
        console.error('❌ Error submitting order:', error);
        alert('⚠️ An error occurred.');
      }
    },
  },
};
</script>

<style scoped>
/* Checkout Form Container */
.checkout-form {
  border: 1px solid #ddd;
  padding: 25px;
  margin: 20px 0;
  border-radius: 8px;
  background-color: #f9f9f9;
}

/* Form Labels */
.checkout-form label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

/* Input Fields */
.checkout-form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Buttons */
.checkout-form button {
  padding: 12px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.checkout-form button:disabled {
  background-color: #ccc;
}

/* Back Button */
.back-button {
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #c82333;
}
</style>
