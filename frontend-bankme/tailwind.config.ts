/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				"base-green": "rgb(160, 201, 14)",
				"base-blue": "rgb(0, 95, 254)",
				"light-blue": "rgb(125, 246, 255)",
				"medium-blue": "rgb(63, 241, 254)",
			},
		},
	},
	plugins: [],
};