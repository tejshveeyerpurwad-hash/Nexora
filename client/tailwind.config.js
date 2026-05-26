/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#030303',
          card: '#0a0a0a',
          border: '#1e1e1e',
          text: '#f5f5f5',
          muted: '#8e8e93',
        },
        brand: {
          primary: '#0070f3',
          secondary: '#7928ca',
          accent: '#ff0080',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
