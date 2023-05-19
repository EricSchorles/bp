/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/contexts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[class="dark"]'],
  theme: {
    extend: {
      fontFamily:{
        'poppins':['Poppins', 'sans-serif']
      },
      gridTemplateRows: {
        'navigation-context': 'repeat(30, minmax(0, 1fr))'
      },
      gridTemplateColumns: {
        'navigation-context': 'repeat(60, minmax(0, 1fr))'
      },
      gridRow: {
        'span-navigation-menu': 'span 31 / span 31',
        'span-children': 'span 26 / span 26',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridAutoRows:{
        'max-content': 'max-content'
      },
      colors: {
        'primary': '#5570F1',
        'secondary': '#FFCC91',
        'gray-children': '#faf0ff',
        'black': '#1C1D22',
        'black-50': '#53545C',
        'black-30': '#8B8D97',
        'black-20': '#A6A8B1',
        'black-10': '#BEC0CA',
        'success': '#519C66',
        'failure': '#CC5F5F',
      },
    },
  },
  plugins: [],
}
