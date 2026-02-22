/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0c0e13',
        bg2: '#11141b',
        card: '#161b25',
        border: '#222840',
        accent: '#38bdf8',
        text: '#f0f2f8',
        text2: '#8b95b0',
        text3: '#4a5270'
      }
    }
  },
  plugins: []
};