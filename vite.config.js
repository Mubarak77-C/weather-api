// vite.config.js
import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  return {
    // Use root '/' when running locally (command === 'serve'),
    // and use your repo name when building for production (command === 'build')
    base: command === "serve" ? "/" : "/weather-api/",
  };
});
