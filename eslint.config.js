import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
    js.configs.recommended,
    {
        files: ['src/**/*.{js,jsx}'],
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooks,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        },
        settings: {
            react: { version: 'detect' },
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            'react/react-in-jsx-scope': 'off',       // React 19 — no import needed
            'react/prop-types': 'off',               // No PropTypes in this project
            'no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
            'react-hooks/purity': 'off',             // Too strict — blocks valid useMemo patterns with Math.random
            'react-hooks/set-state-in-effect': 'off', // Too strict — blocks valid hash-based tab switching
        },
    },
];
