const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js",
    "<rootDir>/__tests__/setup.ts",
  ],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testMatch: [
    "**/__tests__/**/*.test.[jt]s?(x)",
    "**/__tests__/**/*.spec.[jt]s?(x)",
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/__tests__/",
    "/playwright/",
    "/coverage/",
  ],
  collectCoverageFrom: [
    // main code
    "components/**/*.{js,jsx,ts,tsx}",
    "data/**/*.{js,jsx,ts,tsx}",
    "app/**/*.{js,jsx,ts,tsx}",

    // always exclude types and deps
    "!**/*.d.ts",
    "!**/node_modules/**",

    // don't count tests in coverage
    "!**/__tests__/**",

    // Next.js App Router wrappers you usually don't unit test
    "!app/layout.{js,jsx,ts,tsx}",
    "!app/page.{js,jsx,ts,tsx}",

    // optional: exclude framework boundary files
    "!app/**/loading.{js,jsx,ts,tsx}",
    "!app/**/error.{js,jsx,ts,tsx}",
    "!app/**/not-found.{js,jsx,ts,tsx}",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
