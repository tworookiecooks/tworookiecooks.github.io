import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

// const defaultTheme = require('tailwindcss/resolveConfig')(
//   require('tailwindcss/defaultConfig'),
// ).theme;

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/navbar.js"
  ],
  theme: {
    extend: {
      // animation: {
      //   'scroll-left': 'scroll 20s linear infinite',
      // },
      // keyframes: {
      //   scroll: {
      //     '0%': { transform: 'translateX(0)' },
      //     '100%': { transform: 'translateX(-100%)' },
      //   },
      // },
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        background: '#FFF8F0',
        navbar: '#FFF1DF',
        text: '#523D26'
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      // lineHeight: {
      //   tight: 1.2,
      // },
      listStyleType: {
        'disc': 'disc', // Redefine disc style to ensure consistency
        'circle': 'circle', 
        'square': 'square', 
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
      // fontFamily: {
      //   mono: ['var(--font-noto-sans-mono)', ...defaultTheme.fontFamily.sans],
      // },
      aspectRatio: {
        '4/3': '4 / 3',
        '130/63': '130 / 63',
      },
      width: {
        '168': '42rem'
      },
    },
  },
  plugins: [nextui()],
} satisfies Config;
