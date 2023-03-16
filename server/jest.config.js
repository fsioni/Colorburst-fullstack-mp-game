module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/", "/tests/"],
  coverageReporters: ["json", "text", "lcov", "clover"],
  moduleFileExtensions: ["js", "ts", "tsx"],
  coverageProvider: "v8",
};
