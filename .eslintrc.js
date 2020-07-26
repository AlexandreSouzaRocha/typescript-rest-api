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
		'import/extensions': ['.js', '.ts'],
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		'@typescript-eslint/no-unused-vars': 0,
		'no-unused-vars': 0,
		'no-useless-constructor': 'off',
		'@typescript-eslint/no-useless-constructor': ['off'],
		'no-explicit-any': 'off',
		'@typescript-eslint/no-explicit-any': ['off'],
		'import/extensions': 'off',
		'no-empty-function': 0,
		'@typescript-eslint/no-empty-function': 0,
		'consistent-return': 0,
		'no-param-reassign': ['error', { props: false }],
		'class-methods-use-this': 0,
		'import/prefer-default-export': ['off'],
		'@typescript-eslint/import/prefer-default-export': ['off'],
		'@typescript-eslint/explicit-module-boundary-types': 'off',
	},
};
