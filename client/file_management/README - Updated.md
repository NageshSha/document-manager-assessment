# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

i.	Checkout complete application from - https://github.com/NageshSha/document-manager-assessment
11. Deploy React app locally -
	Copy file_management folder from git structure </document-manager-assessment/tree/main/client/file_management>
	go to file_management folder and install dependencies - 
	npm install
	npm install react-router-dom axios formik yup
	npm i react-router-dom
	npm i @mui/material @emotion/react @emotion/styled @mui/icons-material
	npm install @mui/x-data-grid
	
	type npm run dev (application can be access at - http://localhost:5173/login)


// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
