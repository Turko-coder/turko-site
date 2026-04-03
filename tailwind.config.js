/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#177AE5',
          700: '#0056cc',
          800: '#004299',
          900: '#002e66',
        },
      },
      borderRadius: {
        'sm': '0.15rem',
        'DEFAULT': '0.3rem',
        'md': '0.45rem',
        'lg': '0.6rem',
        'xl': '0.9rem',
        '2xl': '1.2rem',
        '3xl': '1.8rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
    },
  },
  plugins: [],
}
