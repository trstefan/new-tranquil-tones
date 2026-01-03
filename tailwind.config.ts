import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
      },
      colors: {
        stone: {
          950: '#111313', // Slightly deeper
        },
        moss: {
          50: '#f2f4f2',
          100: '#e1e7e1',
          200: '#c5d0c5',
          300: '#9db19d',
          400: '#7a927a',
          500: '#5e775e', // Sage
        }
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' }
        },
        'mist-drift': {
          '0%': { transform: 'translateX(-10%) translateY(-10%) scale(1)' },
          '50%': { transform: 'translateX(10%) translateY(5%) scale(1.15)' },
          '100%': { transform: 'translateX(-10%) translateY(-10%) scale(1)' }
        },
        'spin-slow': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'mist-drift': 'mist-drift 25s ease-in-out infinite',
        'fade-in': 'fade-in 1.5s ease-out forwards',
        'slide-up': 'slide-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'spin-slow': 'spin-slow 12s linear infinite',
      }
    }
  },
  plugins: [],
};
export default config;
