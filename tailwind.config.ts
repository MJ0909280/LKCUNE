import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          black: '#000000',
          teal: '#071A1F',
          cyan: '#00FFFF',
          blue: '#00CFFF',
          red: '#FF2D2D'
        }
      },
      boxShadow: {
        neon: '0 0 15px rgba(0,255,255,0.5), 0 0 30px rgba(0,207,255,0.35)',
      }
    }
  },
  plugins: [],
} satisfies Config;
