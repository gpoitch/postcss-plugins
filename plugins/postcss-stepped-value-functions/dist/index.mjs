import{convert as e}from"@csstools/css-calc";const creator=s=>{const o=Object.assign({preserve:!1,onInvalid:""},s);return{postcssPlugin:"postcss-stepped-value-functions",Declaration(s){const r=["mod(","rem(","round("],t=r.some((e=>s.value.toLowerCase().includes(e)));if(!s||!t)return;const n=e(s.value);if(n===s.value)return;r.some((e=>n.toLowerCase().includes(e)))||(s.cloneBefore({value:n}),o.preserve||s.remove())}}};creator.postcss=!0;export{creator as default};
