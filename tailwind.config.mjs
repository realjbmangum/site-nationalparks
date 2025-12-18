/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Primary - NPS Green
        primary: {
          DEFAULT: '#1E4D2B',
          light: '#2D6A3E',
          dark: '#15361D',
        },
        // Secondary - Golden Hour
        secondary: {
          DEFAULT: '#F4A300',
          light: '#FFB627',
        },
        // Accent - Earth Brown
        accent: '#5B3A29',
        // Difficulty badges
        easy: '#059669',
        moderate: '#D97706',
        challenging: '#EA580C',
        expert: '#DC2626',
        family: '#2563EB',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        base: '18px',
      },
      lineHeight: {
        relaxed: '1.7',
      },
    },
  },
  plugins: [],
};
