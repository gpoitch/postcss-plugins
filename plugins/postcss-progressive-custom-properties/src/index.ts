import type { AtRule, PluginCreator, Rule } from 'postcss';
import { supportConditionsFromValue } from './support-conditions-from-values';

const creator: PluginCreator<null> = () => {
	return {
		postcssPlugin: 'postcss-progressive-custom-properties',
		RuleExit: (rule, { postcss }) => {
			const atSupportsRules: Array<AtRule> = [];
			const parentRuleClones: Map<AtRule, Rule> = new Map();
			const variableNames = new Set<string>();

			rule.each((decl) => {
				if (decl.type !== 'decl') {
					return;
				}

				if (!decl.variable) {
					return;
				}

				if (decl.value.trim().toLowerCase() === 'initial') {
					// https://www.w3.org/TR/css-variables-1/#guaranteed-invalid
					return;
				}

				if (decl.value.trim() === '') { // empty string value
					// https://www.w3.org/TR/css-variables-1/#guaranteed-invalid
					return;
				}

				// The first encountered property is the fallback for the oldest targets.
				if (!variableNames.has(decl.prop.toString().toLowerCase())) {
					variableNames.add(decl.prop.toString().toLowerCase());
					return;
				}

				const supportConditions = supportConditionsFromValue(decl.value);
				if (!supportConditions.length) {
					return;
				}

				const params = supportConditions.join(' and ');

				if (atSupportsRules.length && atSupportsRules[atSupportsRules.length - 1].params === params) {
					const atSupports = atSupportsRules[atSupportsRules.length - 1];
					const parentClone = parentRuleClones.get(atSupports);

					if (parentClone) {
						parentClone.append(decl.clone());
						decl.remove();
						return;
					}
				}

				// Any subsequent properties are progressive enhancements.
				const atSupports = postcss.atRule({
					name: 'supports',
					params: params,
					source: rule.source,
					raws: {
						before: '\n\n',
						after: '\n',
					},
				});

				const parentClone = rule.clone();
				parentClone.removeAll();

				parentClone.raws.before = '\n';

				parentClone.append(decl.clone());
				decl.remove();

				parentRuleClones.set(atSupports, parentClone);
				atSupports.append(parentClone);
				atSupportsRules.push(atSupports);
			});

			if (atSupportsRules.length === 0) {
				return;
			}

			// rule.after reverses the at rule order.
			// reversing the call order gives in the correct order overall.
			atSupportsRules.reverse().forEach((atSupports) => {
				rule.after(atSupports);
			});
		},
	};
};

creator.postcss = true;

export default creator;

