export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#16a34a', // Green - agriculture theme
          dark: '#15803d',
        },
        secondary: '#0284c7', // Blue - water/sky
        danger: '#dc2626', // Red - alerts
        warning: '#f59e0b', // Amber - warnings
        success: '#10b981', // Green - positive
      }
    },
  },
  plugins: [],
}

