module.exports = {
  setupFiles: ["<rootDir>/jest/set-env-vars.js"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$":
      "<rootDir>/jest/transform-stub.js",
  },
}
