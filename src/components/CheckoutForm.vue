<template>
  <div class="checkout-form">
    <h2>Checkout</h2>
    <form @submit.prevent="submitOrder">
      <div class="form-group">
        <label for="name">Name:</label>
        <input v-model="name" id="name" type="text" placeholder="Enter your name" />
      </div>
      <div class="form-group">
        <label for="phone">Phone:</label>
        <input v-model="phone" id="phone" type="text" placeholder="Enter your phone number" />
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
      name: '',
      phone: '',
    };
  },
  computed: {
    isFormValid() {
      return /^[a-zA-Z\s]+$/.test(this.name) && /^[0-9]+$/.test(this.phone);
    },
  },
  methods: {
    async submitOrder() {
      try {
        const response = await fetch('http://localhost:4000/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: this.name,
            phone: this.phone,
            lessonIds: this.cartItems.map((item) => item.id),
          }),
        });
        if (response.ok) {
          alert('Order placed successfully!');
          window.location.reload(); // Reload the page to reset everything
        } else {
          console.error('Order failed');
          alert('Order failed. Try again.');
        }
      } catch (error) {
        console.error(error);
        alert('Error occurred.');
      }
    },
  },
};
</script>

<style scoped>
/* Checkout Form Container */
.checkout-form {
  border: 1px solid #ddd;
  padding: 25px; /* Slightly increased padding for a balanced layout */
  margin: 20px 0;
  border-radius: 8px; /* More rounded corners for a modern look */
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

/* Form Labels */
.checkout-form label {
  display: block;
  margin-bottom: 8px; /* Increased spacing for readability */
  font-weight: bold;
  color: #333; /* Darker text color for better contrast */
}

/* Input Fields */
.checkout-form input {
  width: 100%;
  padding: 10px; /* Increased padding for usability */
  margin-bottom: 15px; /* More spacing between fields */
  border: 1px solid #ccc;
  border-radius: 5px; /* Match the form container style */
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); /* Subtle inner shadow for depth */
  font-size: 1rem; /* Slightly larger text for better legibility */
}

/* Input Focus State */
.checkout-form input:focus {
  border-color: #28a745;
  outline: none; /* Remove default outline */
  box-shadow: 0 0 5px rgba(40, 167, 69, 0.5); /* Green glow to match theme */
}

/* Buttons */
.checkout-form button {
  padding: 12px 20px; /* Larger padding for a more modern feel */
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px; /* Match the form container style */
  cursor: pointer;
  font-size: 1rem; /* Consistent font size */
  transition: background-color 0.2s ease, transform 0.2s ease; /* Smooth hover effects */
}

.checkout-form button:hover {
  background-color: #218838; /* Slightly darker green on hover */
  transform: scale(1.05); /* Slight enlargement on hover */
}

.checkout-form button:active {
  transform: scale(0.98); /* Slight shrink on click */
}

.checkout-form button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Success Message */
.success-message {
  color: #28a745;
  font-weight: bold;
  margin-top: 15px;
  text-align: center;
  font-size: 1.1rem; /* Slightly larger font for emphasis */
}

/* Additional Enhancements */
.checkout-form .form-group {
  margin-bottom: 15px; /* Group input elements for better spacing */
}
</style>
