module.exports = {
    transform: {
        "^.+\\.(js|jsx)?$": "babel-jest"
    },
    testEnvironment: "jsdom",
    moduleNameMapper: {
        '\\.(css|less|scss|sss|styl)$': '<rootDir>/fileMock.js',
    },
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  };