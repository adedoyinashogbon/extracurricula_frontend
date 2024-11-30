<template>
  <div>
    <h2>Available Lessons</h2>

    <!-- Sorting Dropdown -->
    <div>
      <label for="sort">Sort By:</label>
      <select id="sort" v-model="sortBy" @change="sortLessons">
        <option value="title">Title</option>
        <option value="price">Price</option>
        <option value="spaces">Spaces</option>
      </select>
    </div>

    <!-- Search Bar -->
    <div>
      <label for="search">Search Lessons:</label>
      <input
        id="search"
        type="text"
        v-model="searchQuery"
        placeholder="Search by title or location"
        @input="filterLessons"
      />
    </div>

    <!-- Lesson Items -->
    <div v-for="lesson in filteredLessons" :key="lesson.id">
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
      ],
      filteredLessons: [], // Filtered lessons to display
      sortBy: 'title', // Default sort option
      searchQuery: '' // Search query input
    };
  },
  created() {
    this.filteredLessons = this.lessons; // Initialize filtered list
  },
  methods: {
    sortLessons() {
      this.filteredLessons.sort((a, b) => {
        if (this.sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        if (this.sortBy === 'price') {
          return a.price - b.price;
        }
        if (this.sortBy === 'spaces') {
          return a.spaces - b.spaces;
        }
      });
    },
    filterLessons() {
      const query = this.searchQuery.toLowerCase();
      this.filteredLessons = this.lessons.filter((lesson) => {
        return (
          lesson.title.toLowerCase().includes(query) ||
          lesson.location.toLowerCase().includes(query)
        );
      });
      this.sortLessons(); // Sort the filtered list after filtering
    },
    addToCart(lesson) {
      console.log('LessonList.vue: Emitting add-to-cart event:', lesson);
      this.$emit('add-to-cart', lesson);
    }
  }
};
</script>

<style scoped>

</style>
