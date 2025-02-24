import { hasSupportsAtRuleAncestor } from './has-supports-at-rule-ancestor';
import valueParser from 'postcss-value-parser';
import type { ParsedValue, FunctionNode } from 'postcss-value-parser';
import type { AtRule, Container, Declaration, Node, Postcss, Result } from 'postcss';
import { onCSSFunctionSRgb } from './on-css-function';

import type { PluginCreator } from 'postcss';
import { hasFallback } from './has-fallback-decl';

const atSupportsHwbParams = '(color: hwb(0% 0 0))';

/** postcss-hwb-function plugin options */
export type pluginOptions = {
	/** Preserve the original notation. default: false */
	preserve?: boolean,
};

/** Transform hwb() functions in CSS. */
const postcssPlugin: PluginCreator<pluginOptions> = (opts?: pluginOptions) => {
	const preserve = 'preserve' in Object(opts) ? Boolean(opts.preserve) : false;

	return {
		postcssPlugin: 'postcss-hwb-function',
		Declaration: (decl: Declaration, { result, postcss }: { result: Result, postcss: Postcss }) => {
			const originalValue = decl.value;
			if (!originalValue.toLowerCase().includes('hwb(')) {
				return;
			}

			if (preserve && hasSupportsAtRuleAncestor(decl)) {
				return;
			}

			if (hasFallback(decl)) {
				return;
			}

			const modified = modifiedValues(originalValue, decl, result);
			if (typeof modified === 'undefined') {
				return;
			}

			if (decl.variable && preserve) {
				const parent = decl.parent;
				const atSupports = postcss.atRule({ name: 'supports', params: atSupportsHwbParams, source: decl.source });

				const parentClone = parent.clone();
				parentClone.removeAll();

				parentClone.append(decl.clone());
				atSupports.append(parentClone);

				insertAtSupportsAfterCorrectRule(atSupports, parent, atSupportsHwbParams);

				decl.replaceWith(decl.clone({ value: modified }));
			} else if (preserve) {
				decl.cloneBefore({ value: modified });

			} else {
				decl.replaceWith(decl.clone({ value: modified }));
			}
		},
	};
};

postcssPlugin.postcss = true;

export default postcssPlugin;

function modifiedValues(originalValue: string, decl: Declaration, result: Result): string | undefined {
	let valueASTSRgb: ParsedValue | undefined;

	try {
		valueASTSRgb = valueParser(originalValue);
	} catch (error) {
		decl.warn(
			result,
			`Failed to parse value '${originalValue}' as a hwb function. Leaving the original value intact.`,
		);
	}

	if (typeof valueASTSRgb === 'undefined') {
		return;
	}

	valueASTSRgb.walk((node) => {
		if (!node.type || node.type !== 'function') {
			return;
		}

		if (node.value.toLowerCase() !== 'hwb') {
			return;
		}

		onCSSFunctionSRgb(node as FunctionNode);
	});
	const modifiedValueSRgb = String(valueASTSRgb);

	if (modifiedValueSRgb === originalValue) {
		return;
	}

	return modifiedValueSRgb;
}

function insertAtSupportsAfterCorrectRule(atSupports: AtRule, parent: Container<Node>, params: string) {
	// Ensure correct order of @supports rules
	// Find the last one created by us or the current parent and insert after.
	let insertAfter = parent;
	let nextInsertAfter = parent.next();
	while (
		insertAfter &&
		nextInsertAfter &&
		nextInsertAfter.type === 'atrule' &&
		nextInsertAfter.name.toLowerCase() === 'supports' &&
		nextInsertAfter.params === params
	) {
		insertAfter = nextInsertAfter;
		nextInsertAfter = nextInsertAfter.next();
	}

	insertAfter.after(atSupports);
}
