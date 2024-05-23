import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#053CEE',
          secondary: '#8b5cf6',
          accent: '#67e8f9',
          neutral: '#171717',
          'base-100': '#03091b',
          info: '#00beff',
          success: '#56ff50',
          warning: '#fba94c',
          error: '#fc4737',
        },
      },
    ],
  },
  plugins: [daisyui],
};
export default config;
