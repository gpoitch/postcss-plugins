import { postcssTape } from '../../packages/postcss-tape/dist/index.mjs';
import plugin from 'postcss-overflow-shorthand';

postcssTape(plugin)({
	'basic': {
		message: 'supports basic usage'
	},
	'basic:preserve-false': {
		message: 'supports { preserve: false } usage',
		options: {
			preserve: false
		}
	},
	'generated-declaration-cases': {
		message: 'correctly handles generated cases',
		options: {
			preserve: false
		}
	},
	'generated-declaration-cases:preserve': {
		message: 'correctly handles generated cases',
		options: {
			preserve: true
		}
	},
	'examples/example': {
		message: 'minimal example',
	},
	'examples/example:preserve-false': {
		message: 'minimal example',
		options: {
			preserve: false
		}
	},
});
