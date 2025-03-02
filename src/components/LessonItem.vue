<template>
  <div class="lesson-item">
    <!-- ✅ Fix: Ensure the image path is correct -->
    <img 
      :src="computedImageUrl" 
      :alt="lesson.title" 
      class="lesson-icon"
    />

    <h3>{{ lesson.title }}</h3>
    <p>Location: {{ lesson.location }}</p>
    <p>Price: ${{ lesson.price }}</p>
    <p>Spaces: {{ lesson.spaces }}</p>

    <button @click="addToCart" :disabled="lesson.spaces === 0">
      {{ lesson.spaces === 0 ? "Sold Out" : "Add to Cart" }}
    </button>
  </div>
</template>

<script>
export default {
  props: ["lesson"],
  computed: {
    /**
     * ✅ Fix: Compute the correct image path
     * - Removes duplicate `/icons/icons/`
     * - Uses a fallback if the image is missing
     */
    computedImageUrl() {
      if (!this.lesson.icon) return "/icons/default-icon.png"; // ✅ Default image fallback

      return this.lesson.icon.startsWith("/icons/") 
        ? this.lesson.icon 
        : `/icons/${this.lesson.icon.replace(/^\/+/, "")}`;
    }
  },
  methods: {
    /**
     * ✅ Handles adding an item to the cart
     */
    addToCart() {
      if (this.lesson.spaces > 0) {
        this.$emit("add-to-cart", this.lesson);
      }
    }
  }
};
</script>

<style scoped>
.lesson-item {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 15px 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  background: white;
}

/* ✅ Style for images */
.lesson-icon {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 10px;
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
</style>
