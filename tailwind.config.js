export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#16a249',
          dark: '#15803d',
        },
        secondary: '#0284c7',
        danger: '#dc2626',
        warning: '#f59e0b',
        success: '#10b981',
        "background-light": "#f6f8f7",
        "background-dark": "#0f172a", // Softer navy-slate instead of dark green
        "surface-dark": "#1e293b", // Card background in dark mode
        "surface-dark-elevated": "#334155", // Elevated surfaces
        "border-dark": "#334155", // Softer borders
        "text-dark-primary": "#f1f5f9", // Primary text in dark mode
        "text-dark-secondary": "#94a3b8", // Secondary text in dark mode
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
}

