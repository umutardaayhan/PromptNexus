/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Space Theme
        deepSpace: {
          bg: '#0B0C10',        // Ana arka plan
          card: '#1F2833',      // Kart arka planı
          border: '#45A29E',    // Kenarlık rengi
        },
        neon: {
          cyan: '#66FCF1',      // Camgöbeği neon vurgu
          teal: '#45A29E',      // Koyu camgöbeği
        },
        text: {
          primary: '#C5C6C7',   // Ana metin rengi
          secondary: '#8E8E8E', // İkincil metin
          muted: '#6B6B6B',     // Soluk metin
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #66FCF1, 0 0 10px #66FCF1' },
          '100%': { boxShadow: '0 0 20px #66FCF1, 0 0 30px #66FCF1' },
        },
      },
    },
  },
  plugins: [],
}