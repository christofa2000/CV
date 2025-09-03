/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  // preset: 'ts-jest', // Remove this line
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\.(css|less|scss|sass)$' : 'identity-obj-proxy',
    '\.(gif|ttf|eot|svg|png)$' : '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\.(ts|tsx)$': 'babel-jest', // Use babel-jest for ts and tsx files
  },
  transformIgnorePatterns: [
    '/node_modules/(?!your-es-module-to-transform)/',
  ],
};