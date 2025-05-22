export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
};
