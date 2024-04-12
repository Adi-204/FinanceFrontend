/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'growth-sans': ['GrowwSans', 'system-ui'],
        'noto-sans': ['NotoSans', 'system-ui'],
      },
    },
  },
  plugins: [],
});

