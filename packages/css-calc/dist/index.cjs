"use strict";var e=require("@csstools/css-tokenizer"),n=require("@csstools/css-parser-algorithms");function isCalculation(e){return"inputs"in e&&Array.isArray(e.inputs)&&"operation"in e}function solve(e){if(-1===e)return-1;const o=[];for(let t=0;t<e.inputs.length;t++){const i=e.inputs[t];if(n.isTokenNode(i)){o.push(i);continue}const u=solve(i);if(-1===u)return-1;o.push(u)}return e.operation(o)}function unary(n){if(1!==n.length)return-1;const o=n[0].value;return o[0]===e.TokenType.Number||o[0]===e.TokenType.Dimension||o[0]===e.TokenType.Percentage?n[0]:-1}function multiplication(o){if(2!==o.length)return-1;const t=o[0].value,i=o[1].value;if(t[0]===e.TokenType.Number&&i[0]===e.TokenType.Number){const o=t[4].value*i[4].value;return new n.TokenNode([e.TokenType.Number,o.toString(),t[2],i[3],{value:o,type:t[4].type===e.NumberType.Integer&&i[4].type===e.NumberType.Integer?e.NumberType.Integer:e.NumberType.Number}])}if(t[0]===e.TokenType.Percentage&&i[0]===e.TokenType.Number){const o=t[4].value*i[4].value;return new n.TokenNode([e.TokenType.Percentage,o.toString()+"%",t[2],i[3],{value:o}])}if(t[0]===e.TokenType.Number&&i[0]===e.TokenType.Percentage){const o=t[4].value*i[4].value;return new n.TokenNode([e.TokenType.Percentage,o.toString()+"%",t[2],i[3],{value:o}])}if(t[0]===e.TokenType.Dimension&&i[0]===e.TokenType.Number){const o=t[4].value*i[4].value;return new n.TokenNode([e.TokenType.Dimension,o.toString()+t[4].unit,t[2],i[3],{value:o,type:t[4].type===e.NumberType.Integer&&i[4].type===e.NumberType.Integer?e.NumberType.Integer:e.NumberType.Number,unit:t[4].unit}])}if(t[0]===e.TokenType.Number&&i[0]===e.TokenType.Dimension){const o=t[4].value*i[4].value;return new n.TokenNode([e.TokenType.Dimension,o.toString()+i[4].unit,t[2],i[3],{value:o,type:t[4].type===e.NumberType.Integer&&i[4].type===e.NumberType.Integer?e.NumberType.Integer:e.NumberType.Number,unit:i[4].unit}])}return-1}function division(o){if(2!==o.length)return-1;const t=o[0].value,i=o[1].value;if(t[0]===e.TokenType.Number&&i[0]===e.TokenType.Number){const o=t[4].value/i[4].value;return new n.TokenNode([e.TokenType.Number,o.toString(),t[2],i[3],{value:o,type:Number.isInteger(o)?e.NumberType.Integer:e.NumberType.Number}])}if(t[0]===e.TokenType.Percentage&&i[0]===e.TokenType.Number){const o=t[4].value/i[4].value;return new n.TokenNode([e.TokenType.Percentage,o.toString()+"%",t[2],i[3],{value:o}])}if(t[0]===e.TokenType.Dimension&&i[0]===e.TokenType.Number){const o=t[4].value/i[4].value;return new n.TokenNode([e.TokenType.Dimension,o.toString()+t[4].unit,t[2],i[3],{value:o,type:Number.isInteger(o)?e.NumberType.Integer:e.NumberType.Number,unit:t[4].unit}])}return-1}const o=new Map([["cm",e=>e],["mm",e=>10*e],["q",e=>40*e],["in",e=>e/2.54],["pc",e=>e/2.54*6],["pt",e=>e/2.54*72],["px",e=>e/2.54*96]]),t=new Map([["deg",e=>e],["grad",e=>e/.9],["rad",e=>e/180*Math.PI],["turn",e=>e/360]]),i=new Map([["deg",e=>.9*e],["grad",e=>e],["rad",e=>.9*e/180*Math.PI],["turn",e=>.9*e/360]]),u=new Map([["hz",e=>e],["khz",e=>e/1e3]]),r=new Map([["cm",e=>2.54*e],["mm",e=>25.4*e],["q",e=>25.4*e*4],["in",e=>e],["pc",e=>6*e],["pt",e=>72*e],["px",e=>96*e]]),a=new Map([["hz",e=>1e3*e],["khz",e=>e]]),T=new Map([["cm",e=>e/10],["mm",e=>e],["q",e=>4*e],["in",e=>e/25.4],["pc",e=>e/25.4*6],["pt",e=>e/25.4*72],["px",e=>e/25.4*96]]),s=new Map([["ms",e=>e],["s",e=>e/1e3]]),l=new Map([["cm",e=>e/6*2.54],["mm",e=>e/6*25.4],["q",e=>e/6*25.4*4],["in",e=>e/6],["pc",e=>e],["pt",e=>e/6*72],["px",e=>e/6*96]]),p=new Map([["cm",e=>e/72*2.54],["mm",e=>e/72*25.4],["q",e=>e/72*25.4*4],["in",e=>e/72],["pc",e=>e/72*6],["pt",e=>e],["px",e=>e/72*96]]),c=new Map([["cm",e=>e/96*2.54],["mm",e=>e/96*25.4],["q",e=>e/96*25.4*4],["in",e=>e/96],["pc",e=>e/96*6],["pt",e=>e/96*72],["px",e=>e]]),N=new Map([["cm",e=>e/4/10],["mm",e=>e/4],["q",e=>e],["in",e=>e/4/25.4],["pc",e=>e/4/25.4*6],["pt",e=>e/4/25.4*72],["px",e=>e/4/25.4*96]]),y=new Map([["deg",e=>180*e/Math.PI],["grad",e=>180*e/Math.PI/.9],["rad",e=>e],["turn",e=>180*e/Math.PI/360]]),m=new Map([["ms",e=>1e3*e],["s",e=>e]]),k=new Map([["deg",e=>360*e],["grad",e=>360*e/.9],["rad",e=>360*e/180*Math.PI],["turn",e=>e]]),v=new Map([["cm",o],["mm",T],["q",N],["in",r],["pc",l],["pt",p],["px",c],["ms",s],["s",m],["deg",t],["grad",i],["rad",y],["turn",k],["hz",u],["khz",a]]);function convertUnit(n,o){if(n[0]!==e.TokenType.Dimension)return o;if(o[0]!==e.TokenType.Dimension)return o;const t=n[4].unit.toLowerCase(),i=o[4].unit.toLowerCase();if(t===i)return o;const u=v.get(i);if(!u)return o;const r=u.get(t);if(!r)return o;const a=r(o[4].value);return[e.TokenType.Dimension,a.toString()+n[4].unit,o[2],o[3],{value:a,unit:n[4].unit,type:Number.isInteger(a)?e.NumberType.Integer:e.NumberType.Number}]}function addition(o){if(2!==o.length)return-1;const t=o[0].value;let i=o[1].value;if(t[0]===e.TokenType.Number&&i[0]===e.TokenType.Number){const o=t[4].value+i[4].value;return new n.TokenNode([e.TokenType.Number,o.toString(),t[2],i[3],{value:o,type:t[4].type===e.NumberType.Integer&&i[4].type===e.NumberType.Integer?e.NumberType.Integer:e.NumberType.Number}])}if(t[0]===e.TokenType.Percentage&&i[0]===e.TokenType.Percentage){const o=t[4].value+i[4].value;return new n.TokenNode([e.TokenType.Percentage,o.toString()+"%",t[2],i[3],{value:o}])}if(t[0]===e.TokenType.Dimension&&i[0]===e.TokenType.Dimension&&(i=convertUnit(t,i),t[4].unit.toLowerCase()===i[4].unit.toLowerCase())){const o=t[4].value+i[4].value;return new n.TokenNode([e.TokenType.Dimension,o.toString()+t[4].unit,t[2],i[3],{value:o,type:t[4].type===e.NumberType.Integer&&i[4].type===e.NumberType.Integer?e.NumberType.Integer:e.NumberType.Number,unit:t[4].unit}])}return-1}function subtraction(o){if(2!==o.length)return-1;const t=o[0].value;let i=o[1].value;if(t[0]===e.TokenType.Number&&i[0]===e.TokenType.Number){const o=t[4].value-i[4].value;return new n.TokenNode([e.TokenType.Number,o.toString(),t[2],i[3],{value:o,type:t[4].type===e.NumberType.Integer&&i[4].type===e.NumberType.Integer?e.NumberType.Integer:e.NumberType.Number}])}if(t[0]===e.TokenType.Percentage&&i[0]===e.TokenType.Percentage){const o=t[4].value-i[4].value;return new n.TokenNode([e.TokenType.Percentage,o.toString()+"%",t[2],i[3],{value:o}])}if(t[0]===e.TokenType.Dimension&&i[0]===e.TokenType.Dimension&&(i=convertUnit(t,i),t[4].unit.toLowerCase()===i[4].unit.toLowerCase())){const o=t[4].value-i[4].value;return new n.TokenNode([e.TokenType.Dimension,o.toString()+t[4].unit,t[2],i[3],{value:o,type:t[4].type===e.NumberType.Integer&&i[4].type===e.NumberType.Integer?e.NumberType.Integer:e.NumberType.Number,unit:t[4].unit}])}return-1}function solveMin(o,t){const i=t[0];if(!i||!n.isTokenNode(i))return-1;if(1!==new Set(t.map((e=>e.type))).size)return-1;const u=t[0].value;if(u[0]!==e.TokenType.Dimension&&u[0]!==e.TokenType.Number&&u[0]!==e.TokenType.Percentage)return-1;if(1!==new Set(t.map((e=>e.value[0]))).size)return-1;const r=t.map((e=>convertUnit(u,e.value)));if(1!==new Set(r.map((e=>(e[4].unit??"").toLowerCase()))).size)return-1;const a=r.map((e=>e[4].value)),T=Math.min(...a),s=o.tokens();return u[0]===e.TokenType.Dimension?{inputs:[new n.TokenNode([e.TokenType.Dimension,T.toString()+u[4].unit,s[0][2],s[s.length-1][3],{value:T,type:Number.isInteger(T)?e.NumberType.Integer:e.NumberType.Number,unit:u[4].unit}])],operation:unary}:u[0]===e.TokenType.Percentage?{inputs:[new n.TokenNode([e.TokenType.Percentage,T.toString()+"%",s[0][2],s[s.length-1][3],{value:T}])],operation:unary}:{inputs:[new n.TokenNode([e.TokenType.Number,T.toString(),s[0][2],s[s.length-1][3],{value:T,type:Number.isInteger(T)?e.NumberType.Integer:e.NumberType.Number}])],operation:unary}}function solveMax(o,t){const i=t[0];if(!i||!n.isTokenNode(i))return-1;if(1!==new Set(t.map((e=>e.type))).size)return-1;const u=t[0].value;if(u[0]!==e.TokenType.Dimension&&u[0]!==e.TokenType.Number&&u[0]!==e.TokenType.Percentage)return-1;if(1!==new Set(t.map((e=>e.value[0]))).size)return-1;const r=t.map((e=>convertUnit(u,e.value)));if(1!==new Set(r.map((e=>(e[4].unit??"").toLowerCase()))).size)return-1;const a=r.map((e=>e[4].value)),T=Math.max(...a),s=o.tokens();return u[0]===e.TokenType.Dimension?{inputs:[new n.TokenNode([e.TokenType.Dimension,T.toString()+u[4].unit,s[0][2],s[s.length-1][3],{value:T,type:Number.isInteger(T)?e.NumberType.Integer:e.NumberType.Number,unit:u[4].unit}])],operation:unary}:u[0]===e.TokenType.Percentage?{inputs:[new n.TokenNode([e.TokenType.Percentage,T.toString()+"%",s[0][2],s[s.length-1][3],{value:T}])],operation:unary}:{inputs:[new n.TokenNode([e.TokenType.Number,T.toString(),s[0][2],s[s.length-1][3],{value:T,type:Number.isInteger(T)?e.NumberType.Integer:e.NumberType.Number}])],operation:unary}}function solveClamp(o,t,i,u){if(!n.isTokenNode(t)||!n.isTokenNode(i)||!n.isTokenNode(u))return-1;const r=t.value,a=convertUnit(r,i.value),T=convertUnit(r,u.value);if(r[0]!==e.TokenType.Dimension&&r[0]!==e.TokenType.Number&&r[0]!==e.TokenType.Percentage)return-1;if(r[0]!==a[0])return-1;if(r[0]!==T[0])return-1;if(r[0]===e.TokenType.Dimension){if(r[4].unit.toLowerCase()!==a[4].unit.toLowerCase())return-1;if(r[4].unit.toLowerCase()!==T[4].unit.toLowerCase())return-1}const s=Math.max(r[4].value,Math.min(a[4].value,T[4].value)),l=o.tokens();return r[0]===e.TokenType.Dimension?{inputs:[new n.TokenNode([e.TokenType.Dimension,s.toString()+r[4].unit,l[0][2],l[l.length-1][3],{value:s,type:Number.isInteger(s)?e.NumberType.Integer:e.NumberType.Number,unit:r[4].unit}])],operation:unary}:r[0]===e.TokenType.Percentage?{inputs:[new n.TokenNode([e.TokenType.Percentage,s.toString()+"%",l[0][2],l[l.length-1][3],{value:s}])],operation:unary}:{inputs:[new n.TokenNode([e.TokenType.Number,s.toString(),l[0][2],l[l.length-1][3],{value:s,type:Number.isInteger(s)?e.NumberType.Integer:e.NumberType.Number}])],operation:unary}}function resolveGlobalsAndConstants(o,t){for(let i=0;i<o.length;i++){const u=o[i];if(!n.isTokenNode(u))continue;const r=u.value;if(r[0]!==e.TokenType.Ident)continue;const a=r[4].value.toLowerCase();switch(a){case"e":o.splice(i,1,new n.TokenNode([e.TokenType.Number,Math.E.toString(),r[2],r[3],{value:Math.E,type:e.NumberType.Number}]));break;case"pi":o.splice(i,1,new n.TokenNode([e.TokenType.Number,Math.PI.toString(),r[2],r[3],{value:Math.PI,type:e.NumberType.Number}]));break;case"infinity":o.splice(i,1,new n.TokenNode([e.TokenType.Number,"infinity",r[2],r[3],{value:1/0,type:e.NumberType.Number}]));break;case"-infinity":o.splice(i,1,new n.TokenNode([e.TokenType.Number,"-infinity",r[2],r[3],{value:-1/0,type:e.NumberType.Number}]));break;case"nan":o.splice(i,1,new n.TokenNode([e.TokenType.Number,"NaN",r[2],r[3],{value:Number.NaN,type:e.NumberType.Number}]));break;default:if(t.has(a)){const e=t.get(a);o.splice(i,1,new n.TokenNode(e))}}}return o}function solveRound(o,t,i,u){const r=i.value;if(r[0]!==e.TokenType.Dimension&&r[0]!==e.TokenType.Number&&r[0]!==e.TokenType.Percentage)return-1;const a=convertUnit(r,u.value);if(r[0]!==a[0])return-1;if(r[0]===e.TokenType.Dimension&&r[4].unit!==a[4].unit)return-1;let T;if(0===a[4].value)T=Number.NaN;else if(Number.isFinite(r[4].value)||Number.isFinite(a[4].value))if(!Number.isFinite(r[4].value)&&Number.isFinite(a[4].value))T=r[4].value;else if(Number.isFinite(r[4].value)&&!Number.isFinite(a[4].value))switch(t){case"down":T=r[4].value<0?-1/0:Object.is(-0,0*r[4].value)?-0:0;break;case"up":T=r[4].value>0?1/0:Object.is(0,0*r[4].value)?0:-0;break;default:T=Object.is(0,0*r[4].value)?0:-0}else if(Number.isFinite(a[4].value))switch(t){case"down":T=Math.floor(r[4].value/a[4].value)*a[4].value;break;case"up":T=Math.ceil(r[4].value/a[4].value)*a[4].value;break;case"to-zero":T=Math.trunc(r[4].value/a[4].value)*a[4].value;break;default:{let e=Math.floor(r[4].value/a[4].value)*a[4].value,n=Math.ceil(r[4].value/a[4].value)*a[4].value;if(e>n){const o=e;e=n,n=o}const o=Math.abs(r[4].value-e),t=Math.abs(r[4].value-n);o===t&&(T=n),T=o<t?e:n;break}}else T=r[4].value;else T=Number.NaN;const s=o.tokens();return r[0]===e.TokenType.Dimension?{inputs:[new n.TokenNode([e.TokenType.Dimension,T.toString()+r[4].unit,s[0][2],s[s.length-1][3],{value:T,type:Number.isInteger(T)?e.NumberType.Integer:e.NumberType.Number,unit:r[4].unit}])],operation:unary}:r[0]===e.TokenType.Percentage?{inputs:[new n.TokenNode([e.TokenType.Percentage,T.toString()+"%",s[0][2],s[s.length-1][3],{value:T}])],operation:unary}:{inputs:[new n.TokenNode([e.TokenType.Number,T.toString(),s[0][2],s[s.length-1][3],{value:T,type:Number.isInteger(T)?e.NumberType.Integer:e.NumberType.Number}])],operation:unary}}function solveMod(o,t,i){const u=t.value;if(u[0]!==e.TokenType.Dimension&&u[0]!==e.TokenType.Number&&u[0]!==e.TokenType.Percentage)return-1;const r=convertUnit(u,i.value);if(u[0]!==r[0])return-1;if(u[0]===e.TokenType.Dimension&&u[4].unit!==r[4].unit)return-1;let a;a=0===r[4].value?Number.NaN:Number.isFinite(u[4].value)&&(Number.isFinite(r[4].value)||(r[4].value!==Number.POSITIVE_INFINITY||u[4].value!==Number.NEGATIVE_INFINITY&&!Object.is(0*u[4].value,-0))&&(r[4].value!==Number.NEGATIVE_INFINITY||u[4].value!==Number.POSITIVE_INFINITY&&!Object.is(0*u[4].value,0)))?Number.isFinite(r[4].value)?(u[4].value%r[4].value+r[4].value)%r[4].value:u[4].value:Number.NaN;const T=o.tokens();return u[0]===e.TokenType.Dimension?{inputs:[new n.TokenNode([e.TokenType.Dimension,a.toString()+u[4].unit,T[0][2],T[T.length-1][3],{value:a,type:Number.isInteger(a)?e.NumberType.Integer:e.NumberType.Number,unit:u[4].unit}])],operation:unary}:u[0]===e.TokenType.Percentage?{inputs:[new n.TokenNode([e.TokenType.Percentage,a.toString()+"%",T[0][2],T[T.length-1][3],{value:a}])],operation:unary}:{inputs:[new n.TokenNode([e.TokenType.Number,a.toString(),T[0][2],T[T.length-1][3],{value:a,type:Number.isInteger(a)?e.NumberType.Integer:e.NumberType.Number}])],operation:unary}}function solveRem(o,t,i){const u=t.value;if(u[0]!==e.TokenType.Dimension&&u[0]!==e.TokenType.Number&&u[0]!==e.TokenType.Percentage)return-1;const r=convertUnit(u,i.value);if(u[0]!==r[0])return-1;if(u[0]===e.TokenType.Dimension&&u[4].unit!==r[4].unit)return-1;let a;a=0===r[4].value?Number.NaN:Number.isFinite(u[4].value)?Number.isFinite(r[4].value)?u[4].value%r[4].value:u[4].value:Number.NaN;const T=o.tokens();return u[0]===e.TokenType.Dimension?{inputs:[new n.TokenNode([e.TokenType.Dimension,a.toString()+u[4].unit,T[0][2],T[T.length-1][3],{value:a,type:Number.isInteger(a)?e.NumberType.Integer:e.NumberType.Number,unit:u[4].unit}])],operation:unary}:u[0]===e.TokenType.Percentage?{inputs:[new n.TokenNode([e.TokenType.Percentage,a.toString()+"%",T[0][2],T[T.length-1][3],{value:a}])],operation:unary}:{inputs:[new n.TokenNode([e.TokenType.Number,a.toString(),T[0][2],T[T.length-1][3],{value:a,type:Number.isInteger(a)?e.NumberType.Integer:e.NumberType.Number}])],operation:unary}}function solveAbs(o,t){const i=t.value;if(i[0]!==e.TokenType.Dimension&&i[0]!==e.TokenType.Number&&i[0]!==e.TokenType.Percentage)return-1;const u=Math.abs(i[4].value),r=o.tokens();return i[0]===e.TokenType.Dimension?{inputs:[new n.TokenNode([e.TokenType.Dimension,u.toString()+i[4].unit,r[0][2],r[r.length-1][3],{value:u,type:Number.isInteger(u)?e.NumberType.Integer:e.NumberType.Number,unit:i[4].unit}])],operation:unary}:i[0]===e.TokenType.Percentage?{inputs:[new n.TokenNode([e.TokenType.Percentage,u.toString()+"%",r[0][2],r[r.length-1][3],{value:u}])],operation:unary}:{inputs:[new n.TokenNode([e.TokenType.Number,u.toString(),r[0][2],r[r.length-1][3],{value:u,type:Number.isInteger(u)?e.NumberType.Integer:e.NumberType.Number}])],operation:unary}}function solveSign(o,t){const i=t.value;if(i[0]!==e.TokenType.Dimension&&i[0]!==e.TokenType.Number&&i[0]!==e.TokenType.Percentage)return-1;const u=Math.sign(i[4].value),r=o.tokens();return{inputs:[new n.TokenNode([e.TokenType.Number,u.toString(),r[0][2],r[r.length-1][3],{value:u,type:Number.isInteger(u)?e.NumberType.Integer:e.NumberType.Number}])],operation:unary}}const b=new Map([["abs",abs],["calc",calc],["clamp",clamp],["max",max],["min",min],["mod",mod],["rem",rem],["round",round],["sign",sign]]);function calc(o,t){const i=resolveGlobalsAndConstants([...o.value.filter((e=>!n.isCommentNode(e)&&!n.isWhitespaceNode(e)))],t);if(1===i.length&&n.isTokenNode(i[0]))return{inputs:[i[0]],operation:unary};let u=0;for(;u<i.length;){const o=i[u];if(n.isSimpleBlockNode(o)&&o.startToken[0]===e.TokenType.OpenParen){const e=calc(o,t);if(-1===e)return-1;i.splice(u,1,e)}else if(n.isFunctionNode(o)){const e=b.get(o.getName().toLowerCase());if(!e)return-1;{const n=e(o,t);if(-1===n)return-1;i.splice(u,1,n)}}else u++}if(u=0,1===i.length&&isCalculation(i[0]))return i[0];for(;u<i.length;){const o=i[u];if(!o||!n.isTokenNode(o)&&!isCalculation(o)){u++;continue}const t=i[u+1];if(!t||!n.isTokenNode(t)){u++;continue}const r=t.value;if(r[0]!==e.TokenType.Delim||"*"!==r[4].value&&"/"!==r[4].value){u++;continue}const a=i[u+2];if(!a||!n.isTokenNode(a)&&!isCalculation(a))return-1;"*"!==r[4].value?"/"!==r[4].value?u++:i.splice(u,3,{inputs:[o,a],operation:division}):i.splice(u,3,{inputs:[o,a],operation:multiplication})}if(u=0,1===i.length&&isCalculation(i[0]))return i[0];for(;u<i.length;){const o=i[u];if(!o||!n.isTokenNode(o)&&!isCalculation(o)){u++;continue}const t=i[u+1];if(!t||!n.isTokenNode(t)){u++;continue}const r=t.value;if(r[0]!==e.TokenType.Delim||"+"!==r[4].value&&"-"!==r[4].value){u++;continue}const a=i[u+2];if(!a||!n.isTokenNode(a)&&!isCalculation(a))return-1;"+"!==r[4].value?"-"!==r[4].value?u++:i.splice(u,3,{inputs:[o,a],operation:subtraction}):i.splice(u,3,{inputs:[o,a],operation:addition})}return 1===i.length&&isCalculation(i[0])?i[0]:-1}function clamp(o,t){const i=resolveGlobalsAndConstants([...o.value.filter((e=>!n.isCommentNode(e)&&!n.isWhitespaceNode(e)))],t),u=[],r=[],a=[];{let o=u;for(let t=0;t<i.length;t++){const T=i[t];if(n.isTokenNode(T)&&T.value[0]===e.TokenType.Comma){if(o===a)return-1;if(o===r){o=a;continue}if(o===u){o=r;continue}return-1}o.push(T)}}const T=solve(calc(new n.FunctionNode([e.TokenType.Function,"calc(",-1,-1,{value:"calc"}],[e.TokenType.CloseParen,")",-1,-1,void 0],u),t));if(-1===T)return-1;const s=solve(calc(new n.FunctionNode([e.TokenType.Function,"calc(",-1,-1,{value:"calc"}],[e.TokenType.CloseParen,")",-1,-1,void 0],r),t));if(-1===s)return-1;const l=solve(calc(new n.FunctionNode([e.TokenType.Function,"calc(",-1,-1,{value:"calc"}],[e.TokenType.CloseParen,")",-1,-1,void 0],a),t));return-1===l?-1:solveClamp(o,T,s,l)}function max(o,t){const i=resolveGlobalsAndConstants([...o.value.filter((e=>!n.isCommentNode(e)&&!n.isWhitespaceNode(e)))],t),u=[];{const o=[];let r=[];for(let t=0;t<i.length;t++){const u=i[t];n.isTokenNode(u)&&u.value[0]===e.TokenType.Comma?(o.push(r),r=[]):r.push(u)}o.push(r);for(let i=0;i<o.length;i++){if(0===o[i].length)return-1;const r=solve(calc(new n.FunctionNode([e.TokenType.Function,"calc(",-1,-1,{value:"calc"}],[e.TokenType.CloseParen,")",-1,-1,void 0],o[i]),t));if(-1===r)return-1;u.push(r)}}return solveMax(o,u)}function min(o,t){const i=resolveGlobalsAndConstants([...o.value.filter((e=>!n.isCommentNode(e)&&!n.isWhitespaceNode(e)))],t),u=[];{const o=[];let r=[];for(let t=0;t<i.length;t++){const u=i[t];n.isTokenNode(u)&&u.value[0]===e.TokenType.Comma?(o.push(r),r=[]):r.push(u)}o.push(r);for(let i=0;i<o.length;i++){if(0===o[i].length)return-1;const r=solve(calc(new n.FunctionNode([e.TokenType.Function,"calc(",-1,-1,{value:"calc"}],[e.TokenType.CloseParen,")",-1,-1,void 0],o[i]),t));if(-1===r)return-1;u.push(r)}}return solveMin(o,u)}const d=new Set(["nearest","up","down","to-zero"]);function round(o,t){const i=resolveGlobalsAndConstants([...o.value.filter((e=>!n.isCommentNode(e)&&!n.isWhitespaceNode(e)))],t);let u="";const r=[],a=[];{let o=r;for(let t=0;t<i.length;t++){const T=i[t];if(!u&&0===r.length&&0===a.length&&n.isTokenNode(T)&&T.value[0]===e.TokenType.Ident){const e=T.value;if(d.has(e[4].value.toLowerCase())){u=e[4].value.toLowerCase();continue}}if(n.isTokenNode(T)&&T.value[0]===e.TokenType.Comma){if(o===a)return-1;if(o===r&&u&&0===r.length)continue;if(o===r){o=a;continue}return-1}o.push(T)}}const T=solve(calc(new n.FunctionNode([e.TokenType.Function,"calc(",-1,-1,{value:"calc"}],[e.TokenType.CloseParen,")",-1,-1,void 0],r),t));if(-1===T)return-1;const s=solve(calc(new n.FunctionNode([e.TokenType.Function,"calc(",-1,-1,{value:"calc"}],[e.TokenType.CloseParen,")",-1,-1,void 0],a),t));return-1===s?-1:(u||(u="nearest"),solveRound(o,u,T,s))}function mod(o,t){const i=resolveGlobalsAndConstants([...o.value.filter((e=>!n.isCommentNode(e)&&!n.isWhitespaceNode(e)))],t),u=[],r=[];{let o=u;for(let t=0;t<i.length;t++){const a=i[t];if(n.isTokenNode(a)&&a.value[0]===e.TokenType.Comma){if(o===r)return-1;if(o===u){o=r;continue}return-1}o.push(a)}}const a=solve(calc(new n.FunctionNode([e.TokenType.Function,"calc(",-1,-1,{value:"calc"}],[e.TokenType.CloseParen,")",-1,-1,void 0],u),t));if(-1===a)return-1;const T=solve(calc(new n.FunctionNode([e.TokenType.Function,"calc(",-1,-1,{value:"calc"}],[e.TokenType.CloseParen,")",-1,-1,void 0],r),t));return-1===T?-1:solveMod(o,a,T)}function rem(o,t){const i=resolveGlobalsAndConstants([...o.value.filter((e=>!n.isCommentNode(e)&&!n.isWhitespaceNode(e)))],t),u=[],r=[];{let o=u;for(let t=0;t<i.length;t++){const a=i[t];if(n.isTokenNode(a)&&a.value[0]===e.TokenType.Comma){if(o===r)return-1;if(o===u){o=r;continue}return-1}o.push(a)}}const a=solve(calc(new n.FunctionNode([e.TokenType.Function,"calc(",-1,-1,{value:"calc"}],[e.TokenType.CloseParen,")",-1,-1,void 0],u),t));if(-1===a)return-1;const T=solve(calc(new n.FunctionNode([e.TokenType.Function,"calc(",-1,-1,{value:"calc"}],[e.TokenType.CloseParen,")",-1,-1,void 0],r),t));return-1===T?-1:solveRem(o,a,T)}function abs(o,t){const i=resolveGlobalsAndConstants([...o.value.filter((e=>!n.isCommentNode(e)&&!n.isWhitespaceNode(e)))],t),u=solve(calc(new n.FunctionNode([e.TokenType.Function,"calc(",-1,-1,{value:"calc"}],[e.TokenType.CloseParen,")",-1,-1,void 0],i),t));return-1===u?-1:solveAbs(o,u)}function sign(o,t){const i=resolveGlobalsAndConstants([...o.value.filter((e=>!n.isCommentNode(e)&&!n.isWhitespaceNode(e)))],t),u=solve(calc(new n.FunctionNode([e.TokenType.Function,"calc(",-1,-1,{value:"calc"}],[e.TokenType.CloseParen,")",-1,-1,void 0],i),t));return-1===u?-1:solveSign(o,u)}function tokenizeGlobals(n){const o=new Map;if(!n)return o;for(const[t,i]of n)if(e.isToken(i))o.set(t,i);else if("string"!=typeof i);else{const n=e.tokenizer({css:i}),u=n.nextToken();if(n.nextToken(),!n.endOfFile())continue;if(u[0]!==e.TokenType.Number&&u[0]!==e.TokenType.Dimension&&u[0]!==e.TokenType.Percentage)continue;o.set(t,u)}return o}function patchNaN(o){if(-1===o)return-1;if(n.isFunctionNode(o))return o;const t=o.value;return t[0]!==e.TokenType.Number&&t[0]!==e.TokenType.Percentage&&t[0]!==e.TokenType.Dimension?o:Number.isNaN(t[4].value)?t[0]===e.TokenType.Number?new n.FunctionNode([e.TokenType.Function,"calc(",t[2],t[3],{value:"calc"}],[e.TokenType.CloseParen,")",t[2],t[3],void 0],[new n.TokenNode([e.TokenType.Ident,"NaN",t[2],t[3],{value:"NaN"}])]):t[0]===e.TokenType.Dimension?new n.FunctionNode([e.TokenType.Function,"calc(",t[2],t[3],{value:"calc"}],[e.TokenType.CloseParen,")",t[2],t[3],void 0],[new n.TokenNode([e.TokenType.Ident,"NaN",t[2],t[3],{value:"NaN"}]),new n.WhitespaceNode([[e.TokenType.Whitespace," ",t[2],t[3],void 0]]),new n.TokenNode([e.TokenType.Delim,"*",t[2],t[3],{value:"*"}]),new n.WhitespaceNode([[e.TokenType.Whitespace," ",t[2],t[3],void 0]]),new n.TokenNode([e.TokenType.Dimension,"1"+t[4].unit,t[2],t[3],{value:1,type:e.NumberType.Integer,unit:t[4].unit}])]):t[0]===e.TokenType.Percentage?new n.FunctionNode([e.TokenType.Function,"calc(",t[2],t[3],{value:"calc"}],[e.TokenType.CloseParen,")",t[2],t[3],void 0],[new n.TokenNode([e.TokenType.Ident,"NaN",t[2],t[3],{value:"NaN"}]),new n.WhitespaceNode([[e.TokenType.Whitespace," ",t[2],t[3],void 0]]),new n.TokenNode([e.TokenType.Delim,"*",t[2],t[3],{value:"*"}]),new n.WhitespaceNode([[e.TokenType.Whitespace," ",t[2],t[3],void 0]]),new n.TokenNode([e.TokenType.Percentage,"1%",t[2],t[3],{value:1}])]):-1:o}function patchInfinity(o){if(-1===o)return-1;if(n.isFunctionNode(o))return o;const t=o.value;if(t[0]!==e.TokenType.Number&&t[0]!==e.TokenType.Percentage&&t[0]!==e.TokenType.Dimension)return o;if(Number.isFinite(t[4].value))return o;let i="";return Number.NEGATIVE_INFINITY===t[4].value&&(i="-"),t[0]===e.TokenType.Number?new n.FunctionNode([e.TokenType.Function,"calc(",t[2],t[3],{value:"calc"}],[e.TokenType.CloseParen,")",t[2],t[3],void 0],[new n.TokenNode([e.TokenType.Ident,i+"infinity",t[2],t[3],{value:i+"infinity"}])]):t[0]===e.TokenType.Dimension?new n.FunctionNode([e.TokenType.Function,"calc(",t[2],t[3],{value:"calc"}],[e.TokenType.CloseParen,")",t[2],t[3],void 0],[new n.TokenNode([e.TokenType.Ident,i+"infinity",t[2],t[3],{value:i+"infinity"}]),new n.WhitespaceNode([[e.TokenType.Whitespace," ",t[2],t[3],void 0]]),new n.TokenNode([e.TokenType.Delim,"*",t[2],t[3],{value:"*"}]),new n.WhitespaceNode([[e.TokenType.Whitespace," ",t[2],t[3],void 0]]),new n.TokenNode([e.TokenType.Dimension,"1"+t[4].unit,t[2],t[3],{value:1,type:e.NumberType.Integer,unit:t[4].unit}])]):t[0]===e.TokenType.Percentage?new n.FunctionNode([e.TokenType.Function,"calc(",t[2],t[3],{value:"calc"}],[e.TokenType.CloseParen,")",t[2],t[3],void 0],[new n.TokenNode([e.TokenType.Ident,i+"infinity",t[2],t[3],{value:i+"infinity"}]),new n.WhitespaceNode([[e.TokenType.Whitespace," ",t[2],t[3],void 0]]),new n.TokenNode([e.TokenType.Delim,"*",t[2],t[3],{value:"*"}]),new n.WhitespaceNode([[e.TokenType.Whitespace," ",t[2],t[3],void 0]]),new n.TokenNode([e.TokenType.Percentage,"1%",t[2],t[3],{value:1}])]):-1}function patchMinusZero(o){if(-1===o)return-1;if(n.isFunctionNode(o))return o;const t=o.value;return t[0]!==e.TokenType.Number&&t[0]!==e.TokenType.Percentage&&t[0]!==e.TokenType.Dimension?o:Object.is(-0,t[4].value)?("-0"===t[1]||(t[1]="-0"),o):o}function patchCalcResult(e){return patchMinusZero(patchInfinity(patchNaN(e)))}const g=new Map([["abs",abs],["calc",calc],["clamp",clamp],["max",max],["min",min],["mod",mod],["rem",rem],["round",round],["sign",sign]]);exports.convert=function convert(o,t){const i=tokenizeGlobals(t),u=e.tokenizer({css:o}),r=[];for(;!u.endOfFile();)r.push(u.nextToken());r.push(u.nextToken());const a=n.parseCommaSeparatedListOfComponentValues(r,{});for(let e=0;e<a.length;e++){const o=a[e];for(let e=0;e<o.length;e++){const t=o[e];if(n.isFunctionNode(t)){const n=g.get(t.getName().toLowerCase());if(n){const u=patchCalcResult(solve(n(t,i)));if(-1!==u){o.splice(e,1,u);continue}}}(n.isSimpleBlockNode(t)||n.isFunctionNode(t))&&t.walk(((e,o)=>{if("number"!=typeof o)return;const t=e.node;if(n.isFunctionNode(t)){const n=g.get(t.getName().toLowerCase());if(!n)return;const u=patchCalcResult(solve(n(t,i)));if(-1!==u)return void e.parent.value.splice(o,1,u)}}))}}return a.map((n=>n.map((n=>e.stringify(...n.tokens()))).join(""))).join(",")};
