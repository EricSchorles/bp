/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[class="dark"]'],
  theme: {
    extend: {
      gridTemplateRows: {
        'navigation-context': 'repeat(30, minmax(0, 1fr))'
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
      colors: {
        'primary': '#5570F1',
        'secondary': '#5570F1',
        'black': '#1C1D22',
        'success': '#519C66',
        'failure': '#CC5F5F',
      },
    },
  },
  plugins: [],
}
