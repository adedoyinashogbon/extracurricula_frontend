import { createApp } from 'vue';
import App from './App.vue';
import '@fortawesome/fontawesome-free/css/all.css'; // Font Awesome styles

const backendUrl = "https://extracurricula-backend.onrender.com"; // ✅ Hardcoded Backend URL

const app = createApp(App);

// ✅ Make backendUrl globally accessible in all components
app.config.globalProperties.$backendUrl = backendUrl;

app.mount('#app');
