<template>
  <div class="lesson-item">
    <!-- ✅ Fix: Correct the image URL -->
    <img 
      :src="getImageUrl(lesson.icon)" 
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
  methods: {
    /**
     * ✅ Fix: Ensure the correct image URL
     * This function ensures no duplicate `/icons/` in the path.
     */
    getImageUrl(icon) {
      if (!icon) return "/icons/default-icon.png"; // ✅ Fallback for missing images

      // ✅ Ensure correct path format (fixes duplicate `/icons/icons/` issue)
      return icon.startsWith("/icons/") ? icon : `/icons/${icon.replace(/^\/+/, "")}`;
    },

    /**
     * ✅ Handles adding item to cart
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
