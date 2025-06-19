# ExtraCurricula Frontend

A Vue.js frontend application for ExtraCurricula - an educational lesson booking platform that allows users to browse, search, and book extracurricular lessons.

## Features

- Browse and search available lessons
- Sort lessons by title, location, price, or availability
- Add lessons to shopping cart
- Checkout process with form validation
- Responsive design for mobile and desktop

## Tech Stack

- Vue.js
- Vue CLI
- Environment variables for backend API configuration
- Deployed on GitHub Pages

## Project Setup

### Installation

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

## Project Structure

```
extracurricula_frontend/
├── public/
│   └── icons/           # Lesson icons and images
├── src/
│   ├── assets/          # Static assets
│   ├── components/
│   │   ├── CheckoutForm.vue    # Order checkout form
│   │   ├── LessonItem.vue      # Individual lesson display
│   │   ├── LessonList.vue      # List of available lessons
│   │   └── ShoppingCart.vue    # Shopping cart component
│   ├── App.vue          # Main application component
│   └── main.js          # Application entry point
├── .env                 # Environment variables
└── vue.config.js        # Vue configuration
```

## Integration with Backend

This frontend application connects to the [ExtraCurricula Backend](https://github.com/adedoyinashogbon/extracurricula_backend) API. The connection URL is configured via the `VUE_APP_BACKEND_URL` environment variable in the `.env` file.

## Environment Configuration

Create a `.env` file in the root directory with:

```
VUE_APP_BACKEND_URL=https://extracurricula-backend.onrender.com
```

For local development, you can use:

```
VUE_APP_BACKEND_URL=http://localhost:4000
```

## Deployment

The application is deployed on GitHub Pages at:
https://adedoyinashogbon.github.io/extracurricula_frontend/

## License

This project is licensed under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) license.
