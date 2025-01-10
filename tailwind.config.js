/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        Rubik: ["Rubik-Regular", 'sans-serif'],
        "RubikMedium": ["Rubik-Medium", 'sans-serif'],
        "RubikSemiBold": ["Rubik-SemiBold", 'sans-serif'],
        "RubikBold": ["Rubik-Bold", 'sans-serif'],
        "RubikLight": ["Rubik-Light", 'sans-serif'],
        "RubikExtraBold": ["Rubik-ExtraBold", 'sans-serif'],
      },
      colors: {
        "primary": {
          100: '#0061ff0A',
          200: '#0061ff1A',
          300: '#0061ff',
        },
        accent: {
          100: '#FBFBFD',
        },
        black: {
          DEFAULT: '#000000',
          100: '#8C8E98',
          200: '#666876',
          300: '#191d31',
        },
        danger: '#F75555'
      }
    },
  },
  plugins: [],
}