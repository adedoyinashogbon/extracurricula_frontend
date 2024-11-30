<template>
    <div class="checkout-form">
      <h2>Checkout</h2>
      <form @submit.prevent="submitOrder">
        <div>
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            v-model="name"
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label for="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            v-model="phone"
            placeholder="Enter your phone number"
            required
          />
        </div>
        <button type="submit" :disabled="!isFormValid">Place Order</button>
      </form>
      <p v-if="orderSuccess" class="success-message">
        Order successfully placed!
      </p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        phone: '',
        orderSuccess: false
      };
    },
    computed: {
      isFormValid() {
        const nameValid = /^[a-zA-Z\s]+$/.test(this.name); // Validate name
        const phoneValid = /^[0-9]+$/.test(this.phone); // Validate phone
        return nameValid && phoneValid;
      }
    },
    methods: {
      submitOrder() {
        if (this.isFormValid) {
          console.log('Order successfully submitted');
          this.orderSuccess = true; // Display success message
          console.log('Order success state:', this.orderSuccess);
          this.$emit('order-placed', { name: this.name, phone: this.phone }); // Notify parent
          this.name = ''; // Reset name field
          this.phone = ''; // Reset phone field
        } else {
          console.log('Form validation failed.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .checkout-form {
    border: 1px solid #ddd;
    padding: 20px;
    margin: 15px 0;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  .checkout-form label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .checkout-form input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  
  .checkout-form button {
    padding: 10px 15px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  .checkout-form button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .success-message {
    display: block;
    color: #28a745;
    font-weight: bold;
    margin-top: 10px;
  }
  </style>
  