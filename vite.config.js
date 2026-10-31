// vite.config.js
import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  return {
    // If we are running 'npm run dev' or 'npm run preview', use root '/'
    // If we are building for production deployment, use your repository subfolder name
    //base: command === "serve" ? "/" : "/weather-api/",
    base: "./",
  };
});
