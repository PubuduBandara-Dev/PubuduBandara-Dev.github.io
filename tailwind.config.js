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
        background: {
          DEFAULT: '#0B0F19',
          light: '#F8FAFC',
          card: '#111827',
          'card-light': '#FFFFFF',
          elevated: '#1E293B',
          'elevated-light': '#F1F5F9',
        },
        primary: {
          DEFAULT: '#0ea5e9', // Sky/Cyan enterprise blue
          50: '#f0f9ff',
          100: '#e0f2fe',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        accent: {
          DEFAULT: '#10b981', // Subtle emerald for live/status indicators
          500: '#10b981',
          teal: '#14b8a6',
          indigo: '#6366f1',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          'subtle-light': 'rgba(0, 0, 0, 0.08)',
          glow: 'rgba(14, 165, 233, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
