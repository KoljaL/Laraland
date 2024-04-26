// const { addDynamicIconSelectors } = require('@iconify/tailwind');
// const { iconsPlugin, getIconCollections } = require('@egoist/tailwindcss-icons');
const {
	iconsPlugin,
	dynamicIconsPlugin,
	getIconCollections
} = require('@egoist/tailwindcss-icons');
/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		screens: {
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px'
		},
		// colors: {
		// red: 'rgb(249 50 44)'
		// blue: '#1fb6ff',
		// purple: '#7e5bef',
		// pink: '#ff49db',
		// orange: '#ff7849',
		// green: '#13ce66',
		// yellow: '#ffc82c',
		// 'gray-dark': '#273444',
		// gray: '#8492a6',
		// 'gray-light': '#d3dce6'
		// },
		fontFamily: {
			sans: ['Graphik', 'sans-serif'],
			serif: ['Merriweather', 'serif']
		},
		extend: {
			colors: {
				light: {
					// Define your light mode colors here
					primary: 'rgb(249 50 44)',
					secondary: '#000'
					// Add more colors as needed
				},
				dark: {
					// Define your dark mode colors here
					primary: 'rgb(249 50 44)',
					secondary: '#ccc'
					// Add more colors as needed
				}
			}
		}
	},

	plugins: [
		iconsPlugin(),
		dynamicIconsPlugin()
		// iconsPlugin({
		// 	// Select the icon collections you want to use
		// 	// You can also ignore this option to automatically discover all individual icon packages you have installed
		// 	// If you install @iconify/json, you should explicitly specify the collections you want to use, like this:
		// 	collections: getIconCollections(['mdi', 'ph'])
		// 	// If you want to use all icons from @iconify/json, you can do this:
		// 	// collections: getIconCollections("all"),
		// 	// and the more recommended way is to use `dynamicIconsPlugin`, see below.
		// })
	]
};

module.exports = config;
