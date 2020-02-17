module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setupJest.ts'],
  testURL: 'http://localhost',
  moduleNameMapper: {
    '@shared/(.*)': '<rootDir>/src/app/shared/$1',
    '@services/(.*)': '<rootDir>/src/app/core/services/$1',
    '@pages/(.*)': '<rootDir>/src/app/pages/$1'
  },
  globals: {
    'ts-jest': {
      stringifyContentPathRegex: '\\.html$',
      astTransformers: [require.resolve('jest-preset-angular/build/InlineFilesTransformer')]
    }
  },
  transformIgnorePatterns: ['node_modules/(?!@ngrx|ngx-bootstrap)'],
  reporters: ['default', 'jest-junit'],
  testMatch: ['<rootDir>/**/*.spec.ts'],
  collectCoverage: true,
  coverageReporters: ['clover']
};
