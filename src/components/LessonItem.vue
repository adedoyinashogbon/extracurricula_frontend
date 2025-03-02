<template>
  <div class="lesson-item">
    <img :src="lesson.icon || 'default-icon.png'" alt="Lesson Icon" />
    <h3>{{ lesson.title }}</h3> <!-- ✅ Uses title instead of topic -->
    <p>Location: {{ lesson.location }}</p>
    <p>Price: ${{ lesson.price }}</p>
    <p>Spaces: {{ lesson.spaces }}</p> <!-- ✅ Uses spaces instead of space -->
    <button @click="addToCart" :disabled="lesson.spaces === 0">Add to Cart</button> <!-- ✅ Uses spaces -->
  </div>
</template>

<script>
export default {
  props: ['lesson'],
  methods: {
    async addToCart() {
      if (this.lesson.spaces > 0) {
        try {
          // ✅ Make API call to update backend (decrease spaces)
          const response = await fetch(`https://extracurricula-backend.onrender.com/lessons/${this.lesson._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ spaces: this.lesson.spaces - 1 }),
          });

          if (response.ok) {
            this.$emit('add-to-cart', this.lesson._id);
          } else {
            console.error('Failed to add to cart');
          }
        } catch (error) {
          console.error('Error adding to cart:', error);
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
