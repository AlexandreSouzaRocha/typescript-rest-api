module.exports = {
	root: true,
	env: {
		es2020: true,
		node: true,
	},
	extends: ['airbnb', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		parserOptions: 'tsconfig.json',
	},
	settings: {
		'import/extensions': ['.ts', '.js'],
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts'],
		},
		'import/resolver': {
			node: {
				extensions: ['.js', '.ts'],
			},
			typescript: {
				project: './tsconfig.json',
			},
		},
		ignorePackages: true,
	},
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		'import/extensions': ['error', 'ignorePackages', { js: 'never', ts: 'never' }],
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/explicit-module-boundary-types': ['error', { allowArgumentsExplicitlyTypedAsAny: true }],
	},
};
