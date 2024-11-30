<template>
    <div>
      <h2>Available Lessons</h2>
      <div v-for="lesson in lessons" :key="lesson.id">
        <LessonItem :lesson="lesson" @add-to-cart="addToCart" />
      </div>
    </div>
  </template>
  

<script>
import LessonItem from './LessonItem.vue';

export default {
  components: { LessonItem },
  data() {
    return {
      lessons: [
        { id: 1, title: 'Mathematics', location: 'Online', price: 20, spaces: 5, icon: '/icons/math-icon.png' },
        { id: 2, title: 'Intro Tech', location: 'On-site', price: 25, spaces: 5, icon: '/icons/intro-tech-icon.png' },
        { id: 3, title: 'Civic Education and African History', location: 'Online', price: 15, spaces: 5, icon: '/icons/Civics-icon.png' },
        { id: 4, title: 'Art and Craft', location: 'On-site', price: 30, spaces: 5, icon: '/icons/art-craft-icon.png' },
        { id: 5, title: 'English Language', location: 'Online', price: 40, spaces: 5, icon: '/icons/english-icon.png' },
        { id: 6, title: 'Introduction to Music Theory', location: 'On-site', price: 18, spaces: 5, icon: '/icons/music-icon.png' },
        { id: 7, title: 'Programming Basics', location: 'Online', price: 50, spaces: 5, icon: '/icons/prog-icon.png' },
        { id: 8, title: 'Home Economics', location: 'On-site', price: 60, spaces: 5, icon: '/icons/home-eco-icon.png' },
        { id: 9, title: 'Financial Foundations', location: 'Online', price: 22, spaces: 5, icon: '/icons/fin-icon.png' },
        { id: 10, title: 'Science Lab', location: 'On-site', price: 35, spaces: 5, icon: '/icons/lab-icon.png' }
      ]
    };
  },
  methods: {
  addToCart(lesson) {
    console.log('LessonList.vue: Emitting add-to-cart event:', lesson);
    this.$emit('add-to-cart', lesson);
  }
}

};
</script>
