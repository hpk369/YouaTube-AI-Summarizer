const { plugins } = require("./webpack-config");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx"],
  theme: {
    extend: {}
  },
  plugins: []
};