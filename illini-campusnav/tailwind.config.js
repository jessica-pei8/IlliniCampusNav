/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'jura': ['Jura', 'sans-serif'], // Add Jura to the font family
        'julius': ['Julius Sans One', 'sans-serif'],
      },
      fontWeight: {
        // If you want to add custom names for weight
        'thin': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      spacing: {
        '64': '16rem',  // 256px if your base font-size is 16px
        '128': '32rem', // 512px if your base font-size is 16px
      },
    },
  },
  plugins: [],
}

