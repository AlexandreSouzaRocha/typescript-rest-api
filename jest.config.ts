import { resolve } from 'path';

const rootDir = resolve(__dirname);

export default {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	coverageThreshold: {
		global: { branches: 100, functions: 100, lines: 100, statements: 100 },
	},
	errorOnDeprecated: true,
	moduleFileExtensions: ['js', 'mjs', 'ts', 'json', 'node'],
	moduleNameMapper: {
		'@/(.*)': '<rootDir>/src/main/$1',
		'@tests/(.*)': '<rootDir>/tests/$1',
	},

	preset: 'ts-jest',
	restoreMocks: true,
	rootDir,
	testMatch: ['<rootDir>/src/**/*.test.ts', '<rootDir>/tests/**/*.test.ts'],
	projects: ['./src/main'],
};
