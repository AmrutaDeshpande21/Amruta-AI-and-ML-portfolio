/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#070815',
        ink: '#eef0ff',
        muted: '#9aa0c8',
        violet: '#8b6cff',
        cyan: '#3de0ff',
        pink: '#ff7ad9',
      },
      fontFamily: {
        heading: ['Sora', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: { glass: '22px' },
      backgroundImage: {
        'grad-brand': 'linear-gradient(90deg,#8b6cff,#3de0ff,#ff7ad9)',
      },
    },
  },
  plugins: [],
}
