"use strict";var s=require("autoprefixer"),e=require("cssdb"),o=require("@csstools/postcss-progressive-custom-properties"),t=require("browserslist"),i=require("postcss-initial"),a=require("postcss-pseudo-class-any-link"),r=require("css-blank-pseudo"),c=require("postcss-page-break"),n=require("@csstools/postcss-cascade-layers"),p=require("postcss-attribute-case-insensitive"),l=require("postcss-clamp"),u=require("@csstools/postcss-color-function"),m=require("postcss-color-functional-notation"),d=require("postcss-custom-media"),g=require("postcss-custom-properties"),f=require("postcss-custom-selectors"),b=require("postcss-dir-pseudo-class"),h=require("@csstools/postcss-normalize-display-values"),N=require("postcss-double-position-gradients"),v=require("@csstools/postcss-logical-float-and-clear"),y=require("postcss-focus-visible"),k=require("postcss-focus-within"),w=require("@csstools/postcss-font-format-keywords"),q=require("postcss-font-variant"),F=require("postcss-gap-properties"),S=require("css-has-pseudo"),O=require("postcss-color-hex-alpha"),$=require("@csstools/postcss-hwb-function"),x=require("@csstools/postcss-ic-unit"),P=require("postcss-image-set-function"),C=require("@csstools/postcss-is-pseudo-class"),E=require("postcss-lab-function"),I=require("postcss-logical"),B=require("@csstools/postcss-logical-resize"),U=require("@csstools/postcss-logical-viewport-units"),_=require("@csstools/postcss-media-queries-aspect-ratio-number-values"),L=require("postcss-media-minmax"),A=require("@csstools/postcss-nested-calc"),R=require("postcss-nesting"),j=require("postcss-selector-not"),M=require("@csstools/postcss-oklab-function"),D=require("postcss-opacity-percentage"),V=require("postcss-overflow-shorthand"),W=require("postcss-replace-overflow-wrap"),z=require("postcss-place"),T=require("css-prefers-color-scheme"),H=require("postcss-color-rebeccapurple"),G=require("@csstools/postcss-scope-pseudo-class"),K=require("@csstools/postcss-stepped-value-functions"),Z=require("@csstools/postcss-text-decoration-shorthand"),Q=require("@csstools/postcss-trigonometric-functions"),J=require("@csstools/postcss-unset-value");const X={"blank-pseudo-class":"https://github.com/csstools/postcss-plugins/blob/main/plugins/css-blank-pseudo/README-BROWSER.md","focus-visible-pseudo-class":"https://github.com/WICG/focus-visible","focus-within-pseudo-class":"https://github.com/jsxtools/focus-within/blob/master/README-BROWSER.md","has-pseudo-class":"https://github.com/csstools/postcss-plugins/blob/main/plugins/css-has-pseudo/README-BROWSER.md","prefers-color-scheme-query":"https://github.com/csstools/postcss-plugins/blob/main/plugins/css-prefers-color-scheme/README-BROWSER.md"},Y=["blank-pseudo-class","focus-visible-pseudo-class","focus-within-pseudo-class","has-pseudo-class","prefers-color-scheme-query"];function logFeaturesList(s,e,o){if(e.debug){o.log("Enabling the following feature(s):");const t=[],i=[];!1!==e.autoprefixer&&i.push("  autoprefixer"),s.forEach((s=>{s.id.startsWith("before")||s.id.startsWith("after")?i.push(`  ${s.id} (injected via options)`):i.push(`  ${s.id}`),void 0!==X[s.id]&&t.push(s.id)})),i.sort(((s,e)=>s.localeCompare(e))),t.sort(((s,e)=>s.localeCompare(e))),i.forEach((s=>o.log(s))),t.length&&(o.log("These feature(s) need a browser library to work:"),t.forEach((s=>o.log(` ${s}: ${X[s]}`))))}}function initializeSharedOptions(s){if("preserve"in s){const e={};return e.preserve=s.preserve,e}return!1}function clamp(s,e,o){return Math.max(s,Math.min(e,o))}function stageFromOptions(s,e){let o=2;if(void 0===s.stage)return e.log(`Using features from Stage ${o} (default)`),o;if(!1===s.stage)o=5;else{let e=parseInt(s.stage,10);Number.isNaN(e)&&(e=0),o=clamp(0,e,5)}return 5===o?e.log('Stage has been disabled, features will be handled via the "features" option.'):e.log(`Using features from Stage ${o}`),o}const ss=Symbol("insertBefore"),es=Symbol("insertAfter"),os=Symbol("insertOrder"),ts=Symbol("plugin");function getTransformedInsertions(s,e,o){if("insertBefore"!==o&&"insertAfter"!==o)return[];const t="insertBefore"===o?ss:es,i=[];for(const o in e){if(!Object.hasOwnProperty.call(e,o))continue;if(!s.find((s=>s.id===o)))continue;let a=e[o];Array.isArray(a)||(a=[a]);for(let s=0;s<a.length;s++)i.push({id:o,[ts]:a[s],[os]:s,[t]:!0})}return i}var is=["custom-media-queries","custom-properties","environment-variables","image-set-function","media-query-ranges","media-queries-aspect-ratio-number-values","prefers-color-scheme-query","nesting-rules","custom-selectors","any-link-pseudo-class","case-insensitive-attributes","focus-visible-pseudo-class","focus-within-pseudo-class","not-pseudo-class","logical-properties-and-values","dir-pseudo-class","all-property","color-functional-notation","double-position-gradients","hexadecimal-alpha-notation","hwb-function","lab-function","rebeccapurple-color","blank-pseudo-class","break-properties","font-variant-property","is-pseudo-class","scope-pseudo-class","has-pseudo-class","gap-properties","overflow-property","overflow-wrap-property","place-properties","system-ui-font-family","stepped-value-functions","trigonometric-functions","cascade-layers"];function featureIsLess(s,e){return s.id===e.id?s[ss]&&e[ss]||s[es]&&e[es]?clamp(-1,s[os]-e[os],1):s[ss]||e[es]?-1:s[es]||e[ss]?1:0:clamp(-1,is.indexOf(s.id)-is.indexOf(e.id),1)}function postcssSystemUiFont(){return{postcssPlugin:"postcss-system-ui-font",Declaration(s){as.test(s.prop)&&(s.value.includes(cs.join(", "))||(s.value=s.value.replace(ns,ps)))}}}postcssSystemUiFont.postcss=!0;const as=/(?:^(?:-|\\002d){2})|(?:^font(?:-family)?$)/i,rs="[\\f\\n\\r\\x09\\x20]",cs=["system-ui","-apple-system","Segoe UI","Roboto","Ubuntu","Cantarell","Noto Sans","sans-serif"],ns=new RegExp(`(^|,|${rs}+)(?:system-ui${rs}*)(?:,${rs}*(?:${cs.join("|")})${rs}*)?(,|$)`,"i"),ps=`$1${cs.join(", ")}$2`,ls=new Map([["all-property",i],["any-link-pseudo-class",a],["blank-pseudo-class",r],["break-properties",c],["cascade-layers",n],["case-insensitive-attributes",p],["clamp",l],["color-function",u],["color-functional-notation",m],["custom-media-queries",d],["custom-properties",g],["custom-selectors",f],["dir-pseudo-class",b],["display-two-values",h],["double-position-gradients",N],["float-clear-logical-values",v],["focus-visible-pseudo-class",y],["focus-within-pseudo-class",k],["font-format-keywords",w],["font-variant-property",q],["gap-properties",F],["has-pseudo-class",S],["hexadecimal-alpha-notation",O],["hwb-function",$],["ic-unit",x],["image-set-function",P],["is-pseudo-class",C],["lab-function",E],["logical-properties-and-values",I],["logical-resize",B],["logical-viewport-units",U],["media-queries-aspect-ratio-number-values",_],["media-query-ranges",L],["nested-calc",A],["nesting-rules",R],["not-pseudo-class",j],["oklab-function",M],["opacity-percentage",D],["overflow-property",V],["overflow-wrap-property",W],["place-properties",z],["prefers-color-scheme-query",T],["rebeccapurple-color",H],["scope-pseudo-class",G],["stepped-value-functions",K],["system-ui-font-family",postcssSystemUiFont],["text-decoration-shorthand",Z],["trigonometric-functions",Q],["unset-value",J]]);function featureIsInsertedOrHasAPlugin(s){return!!s[ss]||(!!s[es]||!!ls.has(s.id))}function prepareFeaturesList(s,e,o){return s.concat(getTransformedInsertions(s,e,"insertBefore"),getTransformedInsertions(s,o,"insertAfter")).filter((s=>featureIsInsertedOrHasAPlugin(s))).sort(((s,e)=>featureIsLess(s,e)))}const us=["and_chr","and_ff","and_qq","and_uc","android","baidu","chrome","edge","firefox","ie","ie_mob","ios_saf","kaios","op_mini","op_mob","opera","safari","samsung"];function getUnsupportedBrowsersByFeature(s){if(!s)return[];if(!("browser_support"in s))return["> 0%"];const e=[];return us.forEach((o=>{if("op_mini"===o&&void 0===s.browser_support[o])return void e.push("op_mini all");const t=s.browser_support[o];"string"==typeof t&&/^[0-9|.]+$/.test(t)?e.push(`${o} < ${s.browser_support[o]}`):e.push(`${o} >= 1`)})),e}function getOptionsForBrowsersByFeature(s,e,o,i,a){const r=t(s,{ignoreUnknownVersions:!0});switch(e.id){case"is-pseudo-class":return{onComplexSelector:"warning"};case"nesting-rules":if(needsOptionFor(o.find((s=>"is-pseudo-class"===s.id)),r))return a.log('Disabling :is on "nesting-rules" due to lack of browser support.'),{noIsPseudoSelector:!0};return{};case"any-link-pseudo-class":if(r.find((s=>s.startsWith("ie ")||s.startsWith("edge "))))return a.log('Adding area[href] fallbacks for ":any-link" support in Edge and IE.'),{subFeatures:{areaHrefNeedsFixing:!0}};return{};case"logical-properties-and-values":case"float-clear-logical-values":case"logical-resize":case"logical-viewport-units":return"logical"in i?i.logical:{};default:return{}}}function needsOptionFor(s,e){const o=getUnsupportedBrowsersByFeature(s);return!!e.some((s=>t(o,{ignoreUnknownVersions:!0}).some((e=>e===s))))}function formatPolyfillableFeature(s){const e=getUnsupportedBrowsersByFeature(s);if(s[ss]||s[es]){let o=s.id;return o=s.insertBefore?`before-${o}`:`after-${o}`,{browsers:e,vendors_implementations:s.vendors_implementations,plugin:s[ts],id:o,stage:6}}return{browsers:e,vendors_implementations:s.vendors_implementations,plugin:ls.get(s.id),id:s.id,stage:s.stage}}function formatStagedFeature(s,e,o,t,i,a,r){let c,n;return c=getOptionsForBrowsersByFeature(e,t,s,a,r),!0===o[t.id]?i&&(c=Object.assign({},c,i)):c=i?Object.assign({},c,i,o[t.id]):Object.assign({},c,o[t.id]),c.enableProgressiveCustomProperties=!1,"all-property"===t.id&&"preserve"in c&&(c.replace=c.preserve),"overflow-wrap-property"===t.id&&"preserve"in c&&(c.method=c.preserve?"copy":"replace"),n=t.plugin.postcss&&"function"==typeof t.plugin?t.plugin(c):t.plugin&&t.plugin.default&&"function"==typeof t.plugin.default&&t.plugin.default.postcss?t.plugin.default(c):t.plugin,{browsers:t.browsers,vendors_implementations:t.vendors_implementations,plugin:n,pluginOptions:c,id:t.id}}function intOrZero(s){const e=parseInt(s,10);return Number.isNaN(e)?0:e}function listFeatures(s,e,o,i){const a=Object(e.features),r="enableClientSidePolyfills"in e&&e.enableClientSidePolyfills,c=Object(e.insertBefore),n=Object(e.insertAfter),p=e.browsers,l=clamp(0,intOrZero(e.minimumVendorImplementations),3);l>0&&i.log(`Using features with ${l} or more vendor implementations`);const u=stageFromOptions(e,i),m=prepareFeaturesList(s,c,n).map((s=>formatPolyfillableFeature(s))).filter((s=>0===l||(!(!s[ss]&&!s[es])||(l<=s.vendors_implementations||(a[s.id]?(i.log(`  ${s.id} does not meet the required vendor implementations but has been enabled by options`),!0):(i.log(`  ${s.id} with ${s.vendors_implementations} vendor implementations has been disabled`),!1)))))).filter((s=>{const e=s.stage>=u,o=r||!Y.includes(s.id),t=!1===a[s.id],c=a[s.id]?a[s.id]:e&&o;return t?i.log(`  ${s.id} has been disabled by options`):e?o||i.log(`  ${s.id} has been disabled by "enableClientSidePolyfills: false".`):c?i.log(`  ${s.id} does not meet the required stage but has been enabled by options`):i.log(`  ${s.id} with stage ${s.stage} has been disabled`),c})).map((t=>formatStagedFeature(s,p,a,t,o,e,i))),d=t(p,{ignoreUnknownVersions:!0});return m.filter((s=>{if(s.id in a)return a[s.id];const e=t(s.browsers,{ignoreUnknownVersions:!0}),o=d.some((s=>e.some((e=>e===s))));return o||i.log(`${s.id} disabled due to browser support`),o}))}class Logger{constructor(){this.logs=[]}log(s){this.logs.push(s)}resetLogger(){this.logs.length=0}dumpLogs(s){s&&this.logs.forEach((e=>s.warn(e))),this.resetLogger()}}var ms=[{packageName:"css-blank-pseudo",id:"blank-pseudo-class",importName:"postcssBlankPseudo"},{packageName:"css-has-pseudo",id:"has-pseudo-class",importName:"postcssHasPseudo"},{packageName:"css-prefers-color-scheme",id:"prefers-color-scheme-query",importName:"postcssPrefersColorScheme"},{packageName:"postcss-attribute-case-insensitive",id:"case-insensitive-attributes",importName:"postcssAttributeCaseInsensitive"},{packageName:"postcss-clamp",id:"clamp",importName:"postcssClamp"},{packageName:"@csstools/postcss-color-function",id:"color-function",importName:"postcssColorFunction"},{packageName:"postcss-color-functional-notation",id:"color-functional-notation",importName:"postcssColorFunctionalNotation"},{packageName:"postcss-color-hex-alpha",id:"hexadecimal-alpha-notation",importName:"postcssColorHexAlpha"},{packageName:"postcss-color-rebeccapurple",id:"rebeccapurple-color",importName:"postcssColorRebeccapurple"},{packageName:"postcss-custom-media",id:"custom-media-queries",importName:"postcssCustomMedia"},{packageName:"postcss-custom-properties",id:"custom-properties",importName:"postcssCustomProperties"},{packageName:"postcss-custom-selectors",id:"custom-selectors",importName:"postcssCustomSelectors"},{packageName:"postcss-dir-pseudo-class",id:"dir-pseudo-class",importName:"postcssDirPseudoClass"},{packageName:"postcss-double-position-gradients",id:"double-position-gradients",importName:"postcssDoublePositionGradients"},{packageName:"postcss-focus-visible",id:"focus-visible-pseudo-class",importName:"postcssFocusVisible"},{packageName:"postcss-focus-within",id:"focus-within-pseudo-class",importName:"postcssFocusWithin"},{packageName:"@csstools/postcss-font-format-keywords",id:"font-format-keywords",importName:"postcssFontFormatKeywords"},{packageName:"postcss-font-variant",id:"font-variant-property",importName:"postcssFontVariant"},{packageName:"postcss-gap-properties",id:"gap-properties",importName:"postcssGapProperties"},{packageName:"@csstools/postcss-hwb-function",id:"hwb-function",importName:"postcssHWBFunction"},{packageName:"@csstools/postcss-ic-unit",id:"ic-unit",importName:"postcssICUnit"},{packageName:"postcss-image-set-function",id:"image-set-function",importName:"postcssImageSetFunction"},{packageName:"postcss-initial",id:"all-property",importName:"postcssInitial"},{packageName:"@csstools/postcss-is-pseudo-class",id:"is-pseudo-class",importName:"postcssIsPseudoClass"},{packageName:"@csstools/postcss-scope-pseudo-class",id:"scope-pseudo-class",importName:"postcssScopePseudoClass"},{packageName:"postcss-lab-function",id:"lab-function",importName:"postcssLabFunction"},{packageName:"postcss-logical",id:"logical-properties-and-values",importName:"postcssLogical"},{packageName:"@csstools/postcss-logical-float-and-clear",id:"float-clear-logical-values",importName:"postcssLogicalFloatAndClear"},{packageName:"@csstools/postcss-logical-resize",id:"logical-resize",importName:"postcssLogicalResize"},{packageName:"@csstools/postcss-logical-viewport-units",id:"logical-viewport-units",importName:"postcssLogicalViewportUnits"},{packageName:"postcss-media-minmax",id:"media-query-ranges",importName:"postcssMediaMinmax"},{packageName:"@csstools/postcss-media-queries-aspect-ratio-number-values",id:"media-queries-aspect-ratio-number-values",importName:"postcssMediaQueriesAspectRatioNumberValues"},{packageName:"postcss-nesting",id:"nesting-rules",importName:"postcssNesting"},{packageName:"@csstools/postcss-normalize-display-values",id:"display-two-values",importName:"postcssNormalizeDisplayValues"},{packageName:"@csstools/postcss-oklab-function",id:"oklab-function",importName:"postcssOKLabFunction"},{packageName:"postcss-opacity-percentage",id:"opacity-percentage",importName:"postcssOpacityPercentage"},{packageName:"postcss-overflow-shorthand",id:"overflow-property",importName:"postcssOverflowShorthand"},{packageName:"postcss-page-break",id:"break-properties",importName:"postcssPageBreak"},{packageName:"postcss-place",id:"place-properties",importName:"postcssPlace"},{packageName:"postcss-pseudo-class-any-link",id:"any-link-pseudo-class",importName:"postcssPseudoClassAnyLink"},{packageName:"postcss-replace-overflow-wrap",id:"overflow-wrap-property",importName:"postcssReplaceOverflowWrap"},{packageName:"postcss-selector-not",id:"not-pseudo-class",importName:"postcssSelectorNot"},{packageName:"@csstools/postcss-stepped-value-functions",id:"stepped-value-functions",importName:"postcssSteppedValueFunctions"},{packageName:"postcss-system-ui-font-family",importedPackage:"../patch/postcss-system-ui-font-family.mjs",id:"system-ui-font-family",importName:"postcssFontFamilySystemUI"},{packageName:"@csstools/postcss-unset-value",id:"unset-value",importName:"postcssUnsetValue"},{packageName:"@csstools/postcss-cascade-layers",id:"cascade-layers",importName:"postcssCascadeLayers"},{packageName:"@csstools/postcss-trigonometric-functions",id:"trigonometric-functions",importName:"postcssTrigonometricFunctions"},{packageName:"@csstools/postcss-nested-calc",id:"nested-calc",importName:"postcssNestedCalc"},{packageName:"@csstools/postcss-text-decoration-shorthand",id:"text-decoration-shorthand",importName:"postcssTextDecorationShorthand"}];function getPackageNamesToIds(){const s={};return ms.forEach((e=>{s[e.packageName]=e.id})),s}function pluginIdHelp(s,e,o){const t=ms.map((s=>s.id)),i=ms.map((s=>s.packageName)),a=getPackageNamesToIds();s.forEach((s=>{if(t.includes(s))return;const r=mostSimilar(s,t),c=mostSimilar(s,i);Math.min(r.distance,c.distance)>10?e.warn(o`Unknown feature: "${s}", see the list of features https://github.com/csstools/postcss-plugins/blob/main/plugin-packs/postcss-preset-env/FEATURES.md`):r.distance<c.distance?e.warn(o,`Unknown feature: "${s}", did you mean: "${r.mostSimilar}"`):e.warn(o,`Unknown feature: "${s}", did you mean: "${a[c.mostSimilar]}"`)}))}function mostSimilar(s,e){let o="unknown",t=1/0;for(let i=0;i<e.length;i++){const a=levenshteinDistance(s,e[i]);a<t&&(t=a,o=e[i])}return{mostSimilar:o,distance:t}}function levenshteinDistance(s,e){if(!s.length)return e.length;if(!e.length)return s.length;const o=[];for(let t=0;t<=e.length;t++){o[t]=[t];for(let i=1;i<=s.length;i++)o[t][i]=0===t?i:Math.min(o[t-1][i]+1,o[t][i-1]+1,o[t-1][i-1]+(s[i-1]===e[t-1]?0:1))}return o[e.length][s.length]}const creator=t=>{const i=new Logger,a=Object(t),r=Object.keys(Object(a.features)),c=a.browsers,n=initializeSharedOptions(a),p=listFeatures(e,a,n,i),l=p.map((s=>s.plugin));!1!==a.autoprefixer&&l.push(s(Object.assign({overrideBrowserslist:c},a.autoprefixer))),l.push(o()),logFeaturesList(p,a,i);const internalPlugin=()=>({postcssPlugin:"postcss-preset-env",OnceExit:function(s,{result:e}){pluginIdHelp(r,s,e),a.debug&&i.dumpLogs(e),i.resetLogger()}});return internalPlugin.postcss=!0,{postcssPlugin:"postcss-preset-env",plugins:[...l,internalPlugin()]}};creator.postcss=!0,module.exports=creator;
