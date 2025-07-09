/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        beige: {
          50: '#fefdfb',
          100: '#faf8f3',
          200: '#f5f0e6',
          300: '#ede4d3',
          400: '#e0d2b7',
          500: '#d4c4a8',
          600: '#c4a484',
          700: '#a18268',
          800: '#826454',
          900: '#6b5345',
        },
        cream: {
          50: '#fffef7',
          100: '#fffceb',
          200: '#fff8d1',
          300: '#fff2a8',
          400: '#ffe97a',
          500: '#ffdc4e',
          600: '#f5c842',
          700: '#dca73a',
          800: '#b5842c',
          900: '#926424',
        },
        gold: {
          50: '#fffdf2',
          100: '#fffbe5',
          200: '#fff5cc',
          300: '#ffeb99',
          400: '#ffdc66',
          500: '#ffd700',
          600: '#e6c200',
          700: '#cca300',
          800: '#998500',
          900: '#665600',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};