/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/*.{js,vue,ts}",
    "./pages/**/*.vue",
    "./app.vue",
    "./error.vue"
  ],
  prefix: "tw-",
  theme: {
    extend: {},
  },
  
}

