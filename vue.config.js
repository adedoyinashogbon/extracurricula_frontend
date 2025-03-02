const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/extracurricula_frontend/'  // ✅ Ensure correct GitHub Pages path
    : '/',
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true, // ✅ Ensure Options API works
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false, // ✅ Fix hydration mismatch error
        'process.env.VITE_BACKEND_URL': JSON.stringify(process.env.VITE_BACKEND_URL) // ✅ Ensure VITE_BACKEND_URL is injected
      })
    ]
  }
});
