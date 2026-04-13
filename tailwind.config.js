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
        // Road-sign inspired, brighter mids: Valvetöötaja — green; Turvatöötaja — amber (#FFB81C); Turvajuht — blue
        'course-guard': {
          50: '#f0fcf7',
          100: '#d4f7ea',
          200: '#a8eed4',
          300: '#74e0b9',
          400: '#44cf9a',
          500: '#2fbf86',
          600: '#24ae78',
          700: '#1f9668',
          800: '#1b7d56',
          900: '#176648',
        },
        'course-security': {
          50: '#fffdf5',
          100: '#fff8e0',
          200: '#ffefa8',
          300: '#ffe370',
          400: '#ffd547',
          500: '#FFB81C',
          600: '#f5ae00',
          700: '#e09d00',
          800: '#c18800',
          900: '#9a6a00',
        },
        'course-lead': {
          50: '#eef5ff',
          100: '#dbe8ff',
          200: '#b8d4ff',
          300: '#8ab8ff',
          400: '#5c97f0',
          500: '#3d7fd9',
          600: '#2f6bc4',
          700: '#285bab',
          800: '#234a8f',
          900: '#1d3d75',
        },
        accent: {
          bg: '#E7F1FF',
          text: '#2F6BDE',
        },
      },
      borderRadius: {
        'sm': '0.15rem',
        'DEFAULT': '0.3rem',
        'md': '0.45rem',
        'lg': '0.6rem',
        'xl': '0.9rem',
        '2xl': '1.2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
