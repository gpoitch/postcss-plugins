/**
 * Convert an array of prophoto-rgb values where in-gamut Colors are in the
 * range [0.0 - 1.0] to linear light (un-companded) form. Transfer curve is
 * gamma 1.8 with a small linear portion. Extended transfer function
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 */
export function lin_ProPhoto(RGB: Color): Color {
	const Et2 = 16 / 512;
	return RGB.map(function (val) {
		const sign = val < 0 ? -1 : 1;
		const abs = Math.abs(val);

		if (abs <= Et2) {
			return val / 16;
		}

		return sign * Math.pow(abs, 1.8);
	}) as Color;
}
