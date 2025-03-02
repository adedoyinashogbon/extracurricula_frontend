<template>
  <div class="lesson-item">
    <img :src="lesson.icon || 'default-icon.png'" alt="Lesson Icon" />
    <h3>{{ lesson.title }}</h3> 
    <p>Location: {{ lesson.location }}</p>
    <p>Price: ${{ lesson.price }}</p>
    <p>Spaces: {{ currentSpaces }}</p> <!-- ✅ Tracks spaces dynamically -->
    <button @click="addToCart" :disabled="currentSpaces === 0">Add to Cart</button>
  </div>
</template>

<script>
export default {
  props: ['lesson'],
  data() {
    return {
      backendUrl: process.env.VUE_APP_BACKEND_URL || "https://extracurricula-backend.onrender.com", // ✅ Uses Vue CLI `.env`
      currentSpaces: this.lesson.spaces, // ✅ Avoids direct prop mutation
    };
  },
  methods: {
    async addToCart() {
      if (this.currentSpaces > 0) {
        try {
          const response = await fetch(`${this.backendUrl}/lessons/${this.lesson._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ spaces: this.currentSpaces - 1 }),
          });

          if (response.ok) {
            this.currentSpaces--; // ✅ Instantly update UI
            this.$emit('add-to-cart', { ...this.lesson, spaces: this.currentSpaces }); // ✅ Pass updated lesson data
          } else {
            console.error('❌ Failed to add to cart');
          }
        } catch (error) {
          console.error('❌ Error adding to cart:', error);
        }
      }
    },
  },
};
</script>

<style scoped>
.lesson-item {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 15px 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.lesson-item h3 {
  font-size: 1.2rem;
  color: #007bff;
}

.lesson-item button {
  background-color: #28a745;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.lesson-item button:hover {
  background-color: #218838;
}

.lesson-item button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.lesson-item img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-bottom: 10px;
}
</style>
