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
        shogun: {
          bg: '#050806',
          surface: '#0d1310',
          card: '#121a16',
          border: 'rgba(255, 255, 255, 0.08)',
          accent: '#6EE89A',
          gold: '#E5C07B',
          crimson: '#FF4D4D',
          muted: '#8A9991',
          ink: '#E8F5EE'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        jp: ['Noto Sans JP', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif']
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
