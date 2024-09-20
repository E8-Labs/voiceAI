/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        '2xl': '1280px', // Custom 2xl breakpoint at 1400px
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "purple": '#620FEB',
        // "blue1": '#1480FF'
      },
      colors: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "purple": '#620FEB',
        "purple2": '#620FEB80',
        "light-blue": '#1480FF',
        "placeholderColor": '#620FEB50',
        "lightWhite": '#050A0860',
        "grayBg": "#EDEDED",
        "red": "#FF0100"
      },
    },
  },
  plugins: [],
};
