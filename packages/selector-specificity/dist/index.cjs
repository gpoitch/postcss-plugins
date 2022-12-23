"use strict";var e=require("postcss-selector-parser");function selectorSpecificity(s){if(!s)return{a:0,b:0,c:0};let c=0,t=0,i=0;if("universal"==s.type)return{a:0,b:0,c:0};if("id"===s.type)c+=1;else if("tag"===s.type)i+=1;else if("class"===s.type)t+=1;else if("attribute"===s.type)t+=1;else if(isPseudoElement(s))i+=1;else if(e.isPseudoClass(s))switch(s.value.toLowerCase()){case":-moz-any":case":-webkit-any":case":any":case":has":case":is":case":matches":case":not":if(s.nodes&&s.nodes.length>0){const e=specificityOfMostSpecificListItem(s.nodes);c+=e.a,t+=e.b,i+=e.c}break;case":where":break;case":nth-child":case":nth-last-child":if(t+=1,s.nodes&&s.nodes.length>0){const o=s.nodes[0].nodes.findIndex((e=>"tag"===e.type&&"of"===e.value.toLowerCase()));if(o>-1){const a=[e.selector({nodes:s.nodes[0].nodes.slice(o+1),value:""})];s.nodes.length>1&&a.push(...s.nodes.slice(1));const n=specificityOfMostSpecificListItem(a);c+=n.a,t+=n.b,i+=n.c}}break;case":local":case":global":s.nodes&&s.nodes.length>0&&s.nodes.forEach((e=>{const s=selectorSpecificity(e);c+=s.a,t+=s.b,i+=s.c}));break;default:t+=1}else e.isContainer(s)&&s.nodes.length>0&&s.nodes.forEach((e=>{const s=selectorSpecificity(e);c+=s.a,t+=s.b,i+=s.c}));return{a:c,b:t,c:i}}function specificityOfMostSpecificListItem(e){let s={a:0,b:0,c:0};return e.forEach((e=>{const c=selectorSpecificity(e);c.a>s.a?s=c:c.a<s.a||(c.b>s.b?s=c:c.b<s.b||c.c>s.c&&(s=c))})),s}function isPseudoElement(s){return e.isPseudoElement(s)}exports.compare=function compare(e,s){return e.a===s.a?e.b===s.b?e.c-s.c:e.b-s.b:e.a-s.a},exports.selectorSpecificity=selectorSpecificity;
"use strict";function e(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var s=e(require("postcss-selector-parser"));function t(e){if(!e)return{a:0,b:0,c:0};let n=0,o=0,c=0;if("universal"==e.type)return{a:0,b:0,c:0};if("id"===e.type)n+=1;else if("tag"===e.type)c+=1;else if("class"===e.type)o+=1;else if("attribute"===e.type)o+=1;else if(function(e){return s.default.isPseudoElement(e)}(e))if("::slotted"===e.value.toLowerCase()){if(c+=1,e.nodes&&e.nodes.length>0){const s=a(e.nodes);n+=s.a,o+=s.b,c+=s.c}}else c+=1;else if(s.default.isPseudoClass(e))switch(e.value.toLowerCase()){case":-moz-any":case":-webkit-any":case":any":case":has":case":is":case":matches":case":not":if(e.nodes&&e.nodes.length>0){const s=a(e.nodes);n+=s.a,o+=s.b,c+=s.c}break;case":where":break;case":nth-child":case":nth-last-child":if(o+=1,e.nodes&&e.nodes.length>0){const t=e.nodes[0].nodes.findIndex((e=>"tag"===e.type&&"of"===e.value.toLowerCase()));if(t>-1){const l=[s.default.selector({nodes:e.nodes[0].nodes.slice(t+1),value:""})];e.nodes.length>1&&l.push(...e.nodes.slice(1));const r=a(l);n+=r.a,o+=r.b,c+=r.c}}break;case":local":case":global":e.nodes&&e.nodes.length>0&&e.nodes.forEach((e=>{const s=t(e);n+=s.a,o+=s.b,c+=s.c}));break;case":host":case":host-context":if(o+=1,e.nodes&&e.nodes.length>0){const s=a(e.nodes);n+=s.a,o+=s.b,c+=s.c}break;default:o+=1}else s.default.isContainer(e)&&e.nodes.length>0&&e.nodes.forEach((e=>{const s=t(e);n+=s.a,o+=s.b,c+=s.c}));return{a:n,b:o,c:c}}function a(e){let s={a:0,b:0,c:0};return e.forEach((e=>{const a=t(e);a.a>s.a?s=a:a.a<s.a||(a.b>s.b?s=a:a.b<s.b||a.c>s.c&&(s=a))})),s}exports.compare=function(e,s){return e.a===s.a?e.b===s.b?e.c-s.c:e.b-s.b:e.a-s.a},exports.selectorSpecificity=t;
