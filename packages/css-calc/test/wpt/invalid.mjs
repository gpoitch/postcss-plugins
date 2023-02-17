import { calc } from '@csstools/css-calc';
import assert from 'assert';

const testCases = [
	'asin()',
	'asin( )',
	'asin(,)',
	'asin(1dag)',
	'asin(1deg, )',
	'asin(, 1deg)',
	'asin(1deg + )',
	'asin(1deg - )',
	'asin(1deg * )',
	'asin(1deg / )',
	'asin(1deg 2deg)',
	'asin(1deg, , 2deg)',
	'acos()',
	'acos( )',
	'acos(,)',
	'acos(1dag)',
	'acos(1deg, )',
	'acos(, 1deg)',
	'acos(1deg + )',
	'acos(1deg - )',
	'acos(1deg * )',
	'acos(1deg / )',
	'acos(1deg 2deg)',
	'acos(1deg, , 2deg)',
	'atan()',
	'atan( )',
	'atan(,)',
	'atan(1dag)',
	'atan(1deg, )',
	'atan(, 1deg)',
	'atan(1deg + )',
	'atan(1deg - )',
	'atan(1deg * )',
	'atan(1deg / )',
	'atan(1deg 2deg)',
	'atan(1deg, , 2deg)',
	'asin(90px)',
	'asin(30deg + 1.0471967rad, 0)',
	'acos( 0 ,)',
	'acos( () 30deg - 0.523599rad )',
	'atan(45deg )',
	'atan(30deg, + 0.261799rad)',
	'atan2()',
	'atan2( )',
	'atan2(,)',
	'atan2(1dag)',
	'atan2(1deg, )',
	'atan2(, 1deg)',
	'atan2(1deg + )',
	'atan2(1deg - )',
	'atan2(1deg * )',
	'atan2(1deg / )',
	'atan2(1deg 2deg)',
	'atan2(1deg, , 2deg)',
	'atan2(90px)',
	'atan2(90px, 100%)',
	'atan2(30deg + 1.0471967rad, 0)',
	'atan2( 0 ,)',
	'atan2( () 30deg - 0.523599rad )',
	'atan2(45deg )',
	'atan2(30deg, + 0.261799rad)',
	'clamp()',
	'clamp( )',
	'clamp(,)',
	'clamp(1px, )',
	'clamp(, 1px)',
	'clamp(1px, 1px)',
	'clamp(1px, , 1px)',
	'clamp(, 1px, 1px)',
	'clamp(1px, 1px, )',
	'clamp(1px, 1px, 1px, )',
	'clamp(1px 1px 1px)',
	'clamp(0, 10rem, 100%)',
	'exp()',
	'exp( )',
	'exp(,)',
	'exp(1, )',
	'exp(, 1)',
	'exp(1 + )',
	'exp(1 - )',
	'exp(1 * )',
	'exp(1 / )',
	'exp(1 2)',
	'exp(1, , 2)',
	'log()',
	'log( )',
	'log(,)',
	'log(1, )',
	'log(, 1)',
	'log(1 + )',
	'log(1 - )',
	'log(1 * )',
	'log(1 / )',
	'log(1 2)',
	'log(1, , 2)',
	'exp(0px)',
	'exp(0s)',
	'exp(0deg)',
	'exp(0Hz)',
	'exp(0dpi)',
	'exp(0fr)',
	'exp(1, 1%)',
	'exp(1, 0px)',
	'exp(1, 0s)',
	'exp(1, 0deg)',
	'exp(1, 0Hz)',
	'exp(1, 0dpi)',
	'exp(1, 0fr)',
	'log(0px)',
	'log(0s)',
	'log(0deg)',
	'log(0Hz)',
	'log(0dpi)',
	'log(0fr)',
	'log(1, 1%)',
	'log(1, 0px)',
	'log(1, 0s)',
	'log(1, 0deg)',
	'log(1, 0Hz)',
	'log(1, 0dpi)',
	'log(1, 0fr)',
	'hypot()',
	'hypot( )',
	'hypot(,)',
	'hypot(1, )',
	'hypot(, 1)',
	'hypot(1 + )',
	'hypot(1 - )',
	'hypot(1 * )',
	'hypot(1 / )',
	'hypot(1 2)',
	'hypot(1, , 2)',
	'sqrt()',
	'sqrt( )',
	'sqrt(,)',
	'sqrt(1, )',
	'sqrt(, 1)',
	'sqrt(1 + )',
	'sqrt(1 - )',
	'sqrt(1 * )',
	'sqrt(1 / )',
	'sqrt(1 2)',
	'sqrt(1, , 2)',
	'sqrt(1, 2)',
	'pow( )',
	'pow(,)',
	'pow(1, )',
	'pow(, 1)',
	'pow(1 + )',
	'pow(1 - )',
	'pow(1 * )',
	'pow(1 / )',
	'pow(1 2)',
	'pow(1, , 2)',
	'calc(1px * pow(1))',
	'calc(1px * pow(2px, 3px))',
	'calc(sqrt(100px)',
	'hypot(2px, 40%)',
	'hypot(2px, 3)',
	'hypot(3, ,4)',
	'calc(1px * pow(2 3))',
	'hypot()',
	'calc(pow(2))',
	'pow())',
	'calc(sqrt())',
	'calc(sqrt(100, 200))',
	'min()',
	'min( )',
	'min(,)',
	'min(1deg, )',
	'min(, 1deg)',
	'min(1deg + )',
	'min(1deg - )',
	'min(1deg * )',
	'min(1deg / )',
	'min(1deg 2deg)',
	'min(1deg, , 2deg)',
	'max()',
	'max( )',
	'max(,)',
	'max(1deg, )',
	'max(, 1deg)',
	'max(1deg + )',
	'max(1deg - )',
	'max(1deg * )',
	'max(1deg / )',
	'max(1deg 2deg)',
	'max(1deg, , 2deg)',
	'min(1deg, 0)',
	'min(1deg, 0%)',
	'min(1deg, 0px)',
	'min(1deg, 0s)',
	'min(1deg, 0Hz)',
	'min(1deg, 0dpi)',
	'min(1deg, 0fr)',
	'max(1deg, 0)',
	'max(1deg, 0%)',
	'max(1deg, 0px)',
	'max(1deg, 0s)',
	'max(1deg, 0Hz)',
	'max(1deg, 0dpi)',
	'max(1deg, 0fr)',
	'min(1px, 0)',
	'min(1px, 0s)',
	'min(1px, 0Hz)',
	'min(1px, 0dpi)',
	'min(1px, 0fr)',
	'min(1%, 0)',
	'min(1%, 0s)',
	'min(1%, 0Hz)',
	'min(1%, 0dpi)',
	'min(1%, 0fr)',
	'max(1px, 0)',
	'max(1px, 0s)',
	'max(1px, 0Hz)',
	'max(1px, 0dpi)',
	'max(1px, 0fr)',
	'max(1%, 0)',
	'max(1%, 0s)',
	'max(1%, 0Hz)',
	'max(1%, 0dpi)',
	'max(1%, 0fr)',
	'round()',
	'round( )',
	'round(,)',
	'round(1, )',
	'round(, 1)',
	'round(1 + )',
	'round(1 - )',
	'round(1 * )',
	'round(1 / )',
	'round(1 2)',
	'round(nearest, 1 2)',
	'round(1, nearest, 12)',
	'round(1, nearest)',
	'round(nearest, 1, nearest)',
	'round(nearest, 1)',
	'round(1, , 2)',
	'mod()',
	'mod( )',
	'mod(,)',
	'mod(1, )',
	'mod(, 1)',
	'mod(1 + )',
	'mod(1 - )',
	'mod(1 * )',
	'mod(1 / )',
	'mod(1 2)',
	'mod(1, , 2)',
	'rem()',
	'rem( )',
	'rem(,)',
	'rem(1, )',
	'rem(, 1)',
	'rem(1 + )',
	'rem(1 - )',
	'rem(1 * )',
	'rem(1 / )',
	'rem(1 2)',
	'rem(1, , 2)',
	'round(0px)',
	'round(0s)',
	'round(0deg)',
	'round(0Hz)',
	'round(0dpi)',
	'round(0fr)',
	'round(1, 1%)',
	'round(1, 0px)',
	'round(1, 0s)',
	'round(1, 0deg)',
	'round(1, 0Hz)',
	'round(1, 0dpi)',
	'round(1, 0fr)',
	'mod(0px)',
	'mod(0s)',
	'mod(0deg)',
	'mod(0Hz)',
	'mod(0dpi)',
	'mod(0fr)',
	'mod(1, 1%)',
	'mod(1, 0px)',
	'mod(1, 0s)',
	'mod(1, 0deg)',
	'mod(1, 0Hz)',
	'mod(1, 0dpi)',
	'mod(1, 0fr)',
	'rem(0px)',
	'rem(0s)',
	'rem(0deg)',
	'rem(0Hz)',
	'rem(0dpi)',
	'rem(0fr)',
	'rem(1, 1%)',
	'rem(1, 0px)',
	'rem(1, 0s)',
	'rem(1, 0deg)',
	'rem(1, 0Hz)',
	'rem(1, 0dpi)',
	'rem(1, 0fr)',
	'abs()',
	'abs( )',
	'abs(,)',
	'abs(1, )',
	'abs(, 1)',
	'abs(1 + )',
	'abs(1 - )',
	'abs(1 * )',
	'abs(1 / )',
	'abs(1 2)',
	'abs(1, , 2)',
	'abs(1, 2)',
	'sign()',
	'sign( )',
	'sign(,)',
	'sign(1, )',
	'sign(, 1)',
	'sign(1 + )',
	'sign(1 - )',
	'sign(1 * )',
	'sign(1 / )',
	'sign(1 2)',
	'sign(1, , 2)',
	'sign(1, 2)',
	'abs(1, 1%)',
	'abs(1, 0px)',
	'abs(1, 0s)',
	'abs(1, 0deg)',
	'abs(1, 0Hz)',
	'abs(1, 0dpi)',
	'abs(1, 0fr)',
	'sign(1, 1%)',
	'sign(1, 0px)',
	'sign(1, 0s)',
	'sign(1, 0deg)',
	'sign(1, 0Hz)',
	'sign(1, 0dpi)',
	'sign(1, 0fr)',
	'sin()',
	'sin( )',
	'sin(,)',
	'sin(1dag)',
	'sin(1deg, )',
	'sin(, 1deg)',
	'sin(1deg + )',
	'sin(1deg - )',
	'sin(1deg * )',
	'sin(1deg / )',
	'sin(1deg 2deg)',
	'sin(1deg, , 2deg)',
	'cos()',
	'cos( )',
	'cos(,)',
	'cos(1dag)',
	'cos(1deg, )',
	'cos(, 1deg)',
	'cos(1deg + )',
	'cos(1deg - )',
	'cos(1deg * )',
	'cos(1deg / )',
	'cos(1deg 2deg)',
	'cos(1deg, , 2deg)',
	'tan()',
	'tan( )',
	'tan(,)',
	'tan(1dag)',
	'tan(1deg, )',
	'tan(, 1deg)',
	'tan(1deg + )',
	'tan(1deg - )',
	'tan(1deg * )',
	'tan(1deg / )',
	'tan(1deg 2deg)',
	'tan(1deg, , 2deg)',
	'sin(90px)',
	'sin(30deg + 1.0471967rad, 0)',
	'cos( 0 ,)',
	'cos( () 30deg - 0.523599rad )',
	'tan(30deg, + 0.261799rad)',
];

for (const testCase of testCases) {
	assert.strictEqual(
		calc(testCase),
		testCase,
	);
}
