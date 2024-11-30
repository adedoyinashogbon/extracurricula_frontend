<template>
    <div class="lesson-item">
      <img :src="lesson.icon" alt="Lesson Icon" />
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
    }
  }
};
</script>


<style scoped>
.lesson-item {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.lesson-item img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
}

.lesson-item h3 {
  margin: 0;
  font-size: 1.2rem;
}
</style>

  









