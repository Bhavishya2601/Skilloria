/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        dmSerif: ['DM Serif Text', 'serif'],
      },
      animation: {
        'slide-up': 'slide-up 2s ease-in-out',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      screens: {
        'xs': '550px',
        'sm': '640px',
        'md': '768px',
        'mdd': "850px",
        'lg': '1024px',
        'xl': '1280px',
      }
    },
  },
  plugins: [],
}