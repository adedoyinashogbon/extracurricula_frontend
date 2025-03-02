<template>
  <div>
    <h2>Available Lessons</h2>

    <!-- 🔍 Search Bar -->
    <div class="lesson-controls">
      <label for="search">Search Lessons:</label>
      <input
        id="search"
        type="text"
        v-model="searchQuery"
        placeholder="Search by title, location, price, or availability"
        @input="filterLessons"
      />
    </div>

    <!-- 🔽 Sorting Options -->
    <div class="lesson-controls">
      <label for="sort">Sort By:</label>
      <select id="sort" v-model="sortBy" @change="sortLessons">
        <option value="title">Title</option>
        <option value="location">Location</option>
        <option value="price">Price</option>
        <option value="spaces">Available Spaces</option>
      </select>
      <button @click="toggleSortOrder">
        <i :class="isAscending ? 'fas fa-sort-amount-up' : 'fas fa-sort-amount-down'"></i>
        {{ isAscending ? "Ascending" : "Descending" }}
      </button>
    </div>

    <!-- 📝 Filtered & Sorted Lesson Items -->
    <div v-for="lesson in sortedLessons" :key="lesson._id">
      <LessonItem :lesson="lesson" @add-to-cart="addToCart" />
    </div>
  </div>
</template>

<script>
import LessonItem from "./LessonItem.vue";

export default {
  components: { LessonItem },
  data() {
    return {
      lessons: [],
      filteredLessons: [],
      sortBy: "title",
      isAscending: true,
      searchQuery: "",
      backendUrl: process.env.VUE_APP_BACKEND_URL || "https://extracurricula-backend.onrender.com",
    };
  },
  created() {
    this.fetchLessons();
  },
  computed: {
    sortedLessons() {
      return [...this.filteredLessons].sort((a, b) => {
        const multiplier = this.isAscending ? 1 : -1;

        if (this.sortBy === "title" || this.sortBy === "location") {
          return multiplier * a[this.sortBy].localeCompare(b[this.sortBy]); // Sort alphabetically
        }
        return multiplier * (a[this.sortBy] - b[this.sortBy]); // Sort numerically
      });
    },
  },
  methods: {
    async fetchLessons() {
      try {
        const response = await fetch(`${this.backendUrl}/lessons`);
        const data = await response.json();
        this.lessons = data;
        this.filteredLessons = data; // Initialize filtered list
      } catch (error) {
        console.error("❌ Error fetching lessons:", error);
      }
    },
    filterLessons() {
      const query = this.searchQuery.toLowerCase();

      this.filteredLessons = this.lessons.filter((lesson) =>
        lesson.title.toLowerCase().includes(query) ||
        lesson.location.toLowerCase().includes(query) ||
        String(lesson.price).includes(query) ||
        String(lesson.spaces).includes(query)
      );
    },
    sortLessons() {
      this.isAscending = true; // Reset sorting to ascending when changing criteria
    },
    toggleSortOrder() {
      this.isAscending = !this.isAscending; // Properly toggles sorting order
    },
    addToCart(lesson) {
      if (lesson.spaces > 0) {
        this.$emit("add-to-cart", lesson);
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
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
