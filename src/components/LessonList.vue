<template>
  <div>
    <h2>Available Lessons</h2>

    <!-- Sorting Options -->
    <div class="lesson-controls">
      <label for="sort">Sort By:</label>
      <select id="sort" v-model="sortBy" @change="sortLessons">
        <option value="title">Title</option> <!-- ✅ Uses title as in MongoDB -->
        <option value="price">Price</option>
        <option value="spaces">Available Spaces</option> <!-- ✅ Uses spaces as in MongoDB -->
      </select>
      <button @click="toggleSortOrder">
        <i :class="isAscending ? 'fas fa-sort-amount-up' : 'fas fa-sort-amount-down'"></i>
        {{ isAscending ? 'Ascending' : 'Descending' }}
      </button>
    </div>

    <!-- Search Bar -->
    <div class="lesson-controls">
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
    <div v-for="lesson in filteredLessons" :key="lesson._id">
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
      lessons: [],
      filteredLessons: [],
      sortBy: 'title', // ✅ Uses title as in MongoDB
      isAscending: true,
      searchQuery: '',
    };
  },
  created() {
    this.fetchLessons();
  },
  methods: {
    async fetchLessons() {
      try {
        const response = await fetch(`https://extracurricula-backend.onrender.com/lessons`); // ✅ Uses Render backend URL
        const data = await response.json();
        this.lessons = data; // ✅ No need to modify icons
        this.filteredLessons = [...this.lessons];
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    },
    sortLessons() {
      const multiplier = this.isAscending ? 1 : -1;
      this.filteredLessons.sort((a, b) => {
        if (this.sortBy === 'title') return multiplier * a.title.localeCompare(b.title);
        return multiplier * ((a[this.sortBy] || 0) - (b[this.sortBy] || 0)); 
      });
    },
    toggleSortOrder() {
      this.isAscending = !this.isAscending;
      this.sortLessons();
    },
    filterLessons() {
      const query = this.searchQuery.toLowerCase();
      this.filteredLessons = this.lessons.filter((lesson) =>
        lesson.title.toLowerCase().includes(query) || lesson.location.toLowerCase().includes(query)
      );
      this.sortLessons();
    },
    addToCart(lesson) {
      if (lesson.spaces > 0) { // ✅ Uses spaces as in MongoDB
        lesson.spaces -= 1;
        this.$emit('add-to-cart', lesson._id);
      }
    },
  },
};
</script>

<style scoped>
.lesson-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.lesson-controls label {
  font-weight: bold;
}

.lesson-controls input,
.lesson-controls select {
  padding: 8px;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  margin: 5px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
