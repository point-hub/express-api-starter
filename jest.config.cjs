module.exports = {
  testEnvironment: "node",
  roots: ["src", "test"],
  bail: 1,
  collectCoverageFrom: ["src/**/*.ts"],
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^@src/(.*)\\.js$": "<rootDir>/src/$1",
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
