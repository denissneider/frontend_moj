module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Use Babel for JS/JSX files
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios)/" // Ensure axios is transformed by Babel
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS files
  },
  testEnvironment: "jsdom", // Browser-like environment for React tests
};
