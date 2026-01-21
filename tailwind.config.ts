import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // eToro brand colors
        etoro: {
          green: '#00b066',
          'green-light': '#00d684',
          'green-dark': '#008a52',
          red: '#ff4444',
          'red-light': '#ff6b6b',
          'red-dark': '#cc0000',
          blue: '#0066cc',
          'blue-light': '#3385ff',
          'blue-dark': '#004499',
          gray: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
          },
          dark: {
            bg: '#0a0b0d',
            card: '#1a1b1e',
            border: '#2a2b2e',
            text: '#ffffff',
            'text-secondary': '#9ca3af',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['monospace'],
        display: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        home: ['var(--font-sofia-extra-condensed)', 'Sofia Sans Extra Condensed', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-green': 'pulseGreen 2s infinite',
        'pulse-red': 'pulseRed 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGreen: {
          '0%, 100%': { backgroundColor: 'rgba(0, 176, 102, 0.1)' },
          '50%': { backgroundColor: 'rgba(0, 176, 102, 0.3)' },
        },
        pulseRed: {
          '0%, 100%': { backgroundColor: 'rgba(255, 68, 68, 0.1)' },
          '50%': { backgroundColor: 'rgba(255, 68, 68, 0.3)' },
        },
      },
    },
  },
  plugins: [],
}

export default config