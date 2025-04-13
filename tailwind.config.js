/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#e8f0fa', // light blue
          DEFAULT: '#011F5B', // Wharton dark blue
          dark: '#001233', // darker blue
        },
        secondary: {
          light: '#fdf0f0', // very light red
          DEFAULT: '#990000', // Wharton dark red
          dark: '#800000', // darker red
        },
        neutral: {
          light: '#6c757d', // medium gray
          DEFAULT: '#343a40', // dark gray
          dark: '#212529', // almost black
        },
        dark: {
          DEFAULT: '#121212',
          lighter: '#1e1e1e',
          card: '#242424',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      backgroundColor: {
        dark: {
          DEFAULT: '#121212',
          lighter: '#1e1e1e',
          card: '#242424',
        },
      },
      textColor: {
        dark: {
          DEFAULT: '#ffffff',
          muted: '#a0a0a0',
        },
      },
      borderColor: {
        dark: {
          DEFAULT: '#2a2a2a',
          lighter: '#363636',
        },
      },
    },
  },
  plugins: [],
};