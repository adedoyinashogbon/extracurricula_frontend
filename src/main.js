import { createApp } from 'vue';
import App from './App.vue';
import '@fortawesome/fontawesome-free/css/all.css'; // Font Awesome styles

const backendUrl = process.env.VUE_APP_BACKEND_URL || "https://extracurricula-backend.onrender.com"; // ✅ Uses Vue CLI .env or fallback

const app = createApp(App);

// ✅ Make backendUrl globally accessible in all components
app.config.globalProperties.$backendUrl = backendUrl;

console.log("✅ Backend URL:", backendUrl); // ✅ Debugging: Ensure backend URL is set

app.mount('#app');
