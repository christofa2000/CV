/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\.(css|less|scss|sass)$' : 'identity-obj-proxy',
    '\.(gif|ttf|eot|svg|png)$' : '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\.tsx?$': [
      'ts-jest',
      {
        // Apunta a la configuración de TypeScript específica para Jest
        tsconfig: 'tsconfig.jest.json',
      },
    ],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!your-es-module-to-transform)/',
  ],
};