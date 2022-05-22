/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  roots: ["src", "test"],
  bail: 1,
  collectCoverageFrom: ["src/**/*.ts"],
  moduleNameMapper: {
    "^@src/(.*)\\.js$": "<rootDir>/src/$1",
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};
