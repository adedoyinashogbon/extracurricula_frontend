<template>
  <div>
    <h2>Available Lessons</h2>

    <!-- Sorting and Filtering Options -->
    <div class="sort-filter-container">
      <!-- Sorting Dropdown -->
      <div>
        <label for="sort">Sort By:</label>
        <select id="sort" v-model="sortBy" @change="sortLessons">
          <option value="title">Title</option>
          <option value="price">Price</option>
          <option value="spaces">Spaces</option>
        </select>
      </div>

      <!-- Toggle Sort Order -->
      <div>
        <button @click="toggleSortOrder">
  <i :class="isAscending ? 'fas fa-sort-amount-up' : 'fas fa-sort-amount-down'"></i>
  {{ isAscending ? 'Ascending' : 'Descending' }}
</button>

      </div>

      <!-- Search Bar -->
      <div>
        <label for="search">Search:</label>
        <input
          id="search"
          type="text"
          v-model="searchQuery"
          placeholder="Search lessons..."
          @input="filterLessons"
        />
      </div>
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
      isAscending: true, // Sort order toggle
      searchQuery: '' // Search query input
    };
  },
  created() {
    this.filteredLessons = this.lessons; // Initialize filtered list
  },
  methods: {
    sortLessons() {
      this.filteredLessons.sort((a, b) => {
        let comparison = 0;
        if (this.sortBy === 'title') {
          comparison = a.title.localeCompare(b.title);
        } else if (this.sortBy === 'price') {
          comparison = a.price - b.price;
        } else if (this.sortBy === 'spaces') {
          comparison = a.spaces - b.spaces;
        }

        // Adjust for ascending/descending
        return this.isAscending ? comparison : -comparison;
      });
    },
    toggleSortOrder() {
      this.isAscending = !this.isAscending; // Toggle sort order
      this.sortLessons(); // Re-sort lessons
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
  if (lesson.spaces > 0) {
    console.log('LessonList.vue: Emitting add-to-cart event:', lesson);
    lesson.spaces -= 1; // Decrement the available spaces
    this.$emit('add-to-cart', lesson);
  } else {
    console.log('LessonList.vue: No spaces available for:', lesson.title);
  }
}

  }
};
</script>

<style scoped>
/* Styling the sorting and filtering options */
.sort-filter-container {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 15px;
}

.sort-filter-container label {
  font-weight: bold;
  margin-right: 10px;
}

.sort-filter-container select,
.sort-filter-container input {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.sort-filter-container button {
  padding: 5px 10px;
  border: 1px solid #007bff;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sort-filter-container button:hover {
  background-color: #0056b3;
}

.sort-filter-container button:focus {
  outline: none;
  box-shadow: 0 0 4px #007bff;
}

</style>
