/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: "#2D6A6A",
          dark: "#1A3A3A",
        },
        muted: "#5C7171",
        mint: "#E6F4F1",
        sage: "#D9E8E5",
        accent: "#B8E3DB",
        coral: "#FF5C5C",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        pill: "100px",
        section: "40px",
      },
    },
  },
  plugins: [],
}
