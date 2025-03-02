<template>
  <div class="lesson-item">
    <img :src="lesson.icon || 'default-icon.png'" alt="Lesson Icon" />
    <h3>{{ lesson.title }}</h3> <!-- ✅ Changed from topic to title -->
    <p>Location: {{ lesson.location }}</p>
    <p>Price: ${{ lesson.price }}</p>
    <p>Spaces: {{ lesson.spaces }}</p> <!-- ✅ Changed from space to spaces -->
    <button @click="addToCart" :disabled="lesson.spaces === 0">Add to Cart</button> <!-- ✅ Changed from space -->
  </div>
</template>

<script>
export default {
  props: ['lesson'],
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.lesson._id); 
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
}

.lesson-item img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-bottom: 10px;
}
</style>
