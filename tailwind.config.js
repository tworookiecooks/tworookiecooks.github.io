/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/resolveConfig')(
  require('tailwindcss/defaultConfig'),
).theme;


module.exports = {
  content: ['./components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        sm: '0 5px 10px rgba(0, 0, 0, 0.12)',
        md: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      fontFamily: {
        mono: ['var(--font-noto-sans-mono)', ...defaultTheme.fontFamily.sans],
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '130/63': '130 / 63',
      },
      width: {
        '168': '42rem'
      }
    },
  },
  plugins: [],
}
