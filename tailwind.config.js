module.exports = {
  theme: {},
  variants: {
    margin: ["responsive", "last"],
    boxShadow: ["responsive", "hover", "focus", "active", "group-hover"],
  },
  plugins: [],

  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
}
