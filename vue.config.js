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
        __VUE_OPTIONS_API__: true, 
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false, 

        // ✅ Correct Environment Variable for Vue CLI (VITE_ is for Vite, not Vue CLI)
        'process.env.VUE_APP_BACKEND_URL': JSON.stringify(process.env.VUE_APP_BACKEND_URL)
      })
    ]
  }
});
