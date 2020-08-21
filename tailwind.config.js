module.exports = {
  purge: ["./src/**/*.tsx"],
  theme: {},
  variants: {
    pointerEvents: ["responsive", "hover", "focus", "disabled"],
    opacity: ["responsive", "hover", "focus", "disabled"],
  },
  plugins: [require("@tailwindcss/ui")],
}
