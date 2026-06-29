import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          50:  '#FFF9EB',
          100: '#FEF0C7',
          200: '#FDE28A',
          300: '#FCD24D',
          400: '#FABC24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
          950: '#451A03',
        },
        charcoal: {
          50:  '#F5F4F2',
          100: '#E8E6E2',
          200: '#D2CEC6',
          300: '#B5B0A6',
          400: '#928C80',
          500: '#787066',
          600: '#605951',
          700: '#4E4840',
          800: '#2A2520',
          900: '#1A1714',
          950: '#0F0E0C',
        },
        cream: {
          50:  '#FDFBF7',
          100: '#FAF7F2',
          200: '#F5EFE7',
          300: '#EDE4D6',
          400: '#E2D5C0',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-syne)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hex-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zm0-2l26-15V18L28 2 2 18v31l26 15z' fill='%23D97706' fill-opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'glow-amber': '0 0 20px rgba(217, 119, 6, 0.3)',
        'glow-amber-lg': '0 0 40px rgba(217, 119, 6, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.08)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
