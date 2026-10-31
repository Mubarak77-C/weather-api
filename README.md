# 🌤️ Weather App | The Odin Project

A modular, professional-grade weather forecasting application built with **Vanilla JavaScript (ES6 Modules)** and **Vite**, featuring real-time meteorological data, imperial/metric unit toggling, and a modern glassmorphism UI.

![Weather App Preview](https://img.shields.io/badge/Status-Live%20&%20Operational-success?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=for-the-badge&logo=vite)

---

## 🚀 Live Demo
Check out the live application hosted on GitHub Pages:  
👉 **[View Live Application](https://mubarak77-c.github.io/weather-api/)

---

## ✨ Features

- **Real-Time Weather Data:** Fetches live metrics (temperature, feels-like, wind speed, humidity, and weather descriptions) using the OpenWeatherMap API.
- **Two-Stage Async Fetching:** Resolves raw city names into validated geographical coordinates (`lat`/`lon`) before requesting meteorological data to ensure high accuracy.
- **Dynamic Unit Toggling:** Instantly converts between Metric (°C, m/s) and Imperial (°F) units on the fly without making redundant API requests.
- **Modern Glassmorphism UI:** Features a sleek, responsive frosted-glass interface designed with CSS gradients, custom shadows, and dynamic weather condition icons.
- **Robust Error Handling:** Gracefully handles invalid city inputs, network errors, and asynchronous loading states.

---

## 🛠️ Built With

- **HTML5 & CSS3:** Semantic markup with modern CSS styling, flexbox layout, and backdrop filters.
- **JavaScript (ES6 Modules):** Clean separation of concerns with modular file architecture (`api.js`, `ui.js`, `script.
