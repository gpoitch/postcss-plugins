import { postcssTape, ruleClonerPlugin } from '../../packages/postcss-tape/dist/index.mjs';
import plugin from 'postcss-color-rebeccapurple';

postcssTape(plugin)({
	basic: {
		message: "supports basic usage",
	},
	'basic:preserve-true': {
		message: "supports basic usage with { preserve: true }",
		options: {
			preserve: true
		}
	},
	'basic:with-cloned-rules': {
		message: 'doesn\'t cause duplicate CSS',
		plugins: [
			ruleClonerPlugin,
			plugin({
				preserve: true
			})
		]
	},
	'generated-value-cases': {
		message: "supports generated test cases",
	},
	'examples/example': {
		message: 'minimal example',
	},
	'examples/example:preserve-true': {
		message: 'minimal example',
		options: {
			preserve: true
		}
	},
});
