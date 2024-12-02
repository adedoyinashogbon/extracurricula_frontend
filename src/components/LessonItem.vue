<template>
  <div class="lesson-item">
    <img :src="`/${lesson.icon}`" alt="Lesson Icon" />
    <h3>{{ lesson.title }}</h3>
    <p>Location: {{ lesson.location }}</p>
    <p>Price: ${{ lesson.price }}</p>
    <p>Spaces: {{ lesson.spaces }}</p>
    <button @click="addToCart" :disabled="lesson.spaces === 0">Add to Cart</button>
  </div>
</template>

<script>
export default {
  props: ['lesson'],
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.lesson);
    },
  },
};
</script>


<style scoped>
.lesson-item {
  border: 1px solid #ddd;
  padding: 15px; /* Increased padding for better spacing */
  margin: 15px 0; /* Adjusted margin for consistent spacing */
  border-radius: 8px; /* Slightly larger border radius for softer edges */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  transition: transform 0.2s ease, box-shadow 0.2s ease; /* Smooth hover effect */
}

.lesson-item:hover {
  transform: translateY(-5px); /* Slight lift on hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Stronger shadow on hover */
}

.lesson-item h3 {
  font-size: 1.2rem; /* Adjust font size for title */
  color: #007bff; /* Add colour for emphasis */
  margin-bottom: 8px; /* Add spacing below the title */
}

.lesson-item p {
  margin: 5px 0; /* Consistent spacing between paragraphs */
  font-size: 0.9rem; /* Slightly smaller text for details */
  color: #555; /* Muted colour for text */
}

.lesson-item button {
  background-color: #28a745; /* Green background for Add to Cart button */
  color: white;
  padding: 8px 12px; /* Adjust padding for button */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s ease; /* Smooth button hover effect */
}

.lesson-item button:disabled {
  background-color: #ccc; /* Greyed-out background for disabled state */
  cursor: not-allowed; /* Not-allowed cursor for disabled button */
}

.lesson-item button:hover:not(:disabled) {
  background-color: #218838; /* Darker green on hover */
}
</style>
