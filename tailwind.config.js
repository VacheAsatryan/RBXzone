/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      screens: {
        mobileS: "320px",
        mobileM: "375px",
        tabletS: "475px",
        tabletM: "576px",
        tablet: "665px",
        tabletW: "876px",
        tabletL: "992px",
        md: "900px",
        desktop: "1024px",
        wideS: "1096px",
        lg: "1120px",
        wide: "1256px",
        wideM: "1366px",
        wideL: "1440px",
        desktopM: "1500px",
        desktopL: "1600px",
        desktopXL: "1700px",
        desktopXXL: "1800px",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        scrollLeft: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        scrollRight: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        scrollLeft: "scrollLeft 0.5s ease-in-out",
        scrollRight: "scrollRight 0.5s ease-in-out",
      },
      colors: {
        gradientStart: "#72FFF7",
        gradientMid1: "#3F86C8",
        gradientMid2: "#57A1B5",
        gradientMid3: "#365986",
        gradientEnd: "#79EAE3",
      },
    },
  },
  plugins: [], 
};
