var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function o(e){e.forEach(t)}function r(e){return"function"==typeof e}function i(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}let s,a,C;function c(e,t){return s||(s=document.createElement("a")),s.href=t,e===s.href}function l(e,t,n,o){return e[1]&&o?function(e,t){for(const n in t)e[n]=t[n];return e}(n.ctx.slice(),e[1](o(t))):n.ctx}function d(e,t){e.appendChild(t)}function u(e,t,n){e.insertBefore(t,n||null)}function p(e){e.parentNode.removeChild(e)}function m(e){return document.createElement(e)}function h(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function f(e){return document.createTextNode(e)}function g(){return f(" ")}function v(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function k(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function w(e,t,n,o){null===n?e.style.removeProperty(t):e.style.setProperty(t,n,o?"important":"")}function b(){if(void 0===a){a=!1;try{"undefined"!=typeof window&&window.parent&&window.parent.document}catch(e){a=!0}}return a}function $(e){C=e}function j(e){(function(){if(!C)throw new Error("Function called outside component initialization");return C})().$$.on_mount.push(e)}const x=[],L=[],y=[],M=[],H=Promise.resolve();let _=!1;function Z(e){y.push(e)}const z=new Set;let E=0;function B(){const e=C;do{for(;E<x.length;){const e=x[E];E++,$(e),F(e.$$)}for($(null),x.length=0,E=0;L.length;)L.pop()();for(let e=0;e<y.length;e+=1){const t=y[e];z.has(t)||(z.add(t),t())}y.length=0}while(x.length);for(;M.length;)M.pop()();_=!1,z.clear(),$(e)}function F(e){if(null!==e.fragment){e.update(),o(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(Z)}}const A=new Set;function D(e,t){e&&e.i&&(A.delete(e),e.i(t))}function N(e,t,n,o){if(e&&e.o){if(A.has(e))return;A.add(e),undefined.c.push((()=>{A.delete(e),o&&(n&&e.d(1),o())})),e.o(t)}}const I="undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;function V(e){e&&e.c()}function W(e,n,i,s){const{fragment:a,on_mount:C,on_destroy:c,after_update:l}=e.$$;a&&a.m(n,i),s||Z((()=>{const n=C.map(t).filter(r);c?c.push(...n):o(n),e.$$.on_mount=[]})),l.forEach(Z)}function T(e,t){const n=e.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function S(e,t){-1===e.$$.dirty[0]&&(x.push(e),_||(_=!0,H.then(B)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function P(t,r,i,s,a,c,l,d=[-1]){const u=C;$(t);const m=t.$$={fragment:null,ctx:null,props:c,update:e,not_equal:a,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(u?u.$$.context:[])),callbacks:n(),dirty:d,skip_bound:!1,root:r.target||u.$$.root};l&&l(m.root);let h=!1;if(m.ctx=i?i(t,r.props||{},((e,n,...o)=>{const r=o.length?o[0]:n;return m.ctx&&a(m.ctx[e],m.ctx[e]=r)&&(!m.skip_bound&&m.bound[e]&&m.bound[e](r),h&&S(t,e)),n})):[],m.update(),h=!0,o(m.before_update),m.fragment=!!s&&s(m.ctx),r.target){if(r.hydrate){const e=function(e){return Array.from(e.childNodes)}(r.target);m.fragment&&m.fragment.l(e),e.forEach(p)}else m.fragment&&m.fragment.c();r.intro&&D(t.$$.fragment),W(t,r.target,r.anchor,r.customElement),B()}$(u)}class K{$destroy(){T(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function O(e){let t,n,o,r,i;const s=e[4].default,a=function(e,t,n,o){if(e){const r=l(e,t,n,o);return e[0](r)}}(s,e,e[3],null);return{c(){t=m("main"),n=m("p"),a&&a.c(),k(n,"class","svelte-10vp2ph"),w(t,"margin",e[0]?"0 auto 0 auto":"0 auto 0 0"),k(t,"class","svelte-10vp2ph")},m(s,C){u(s,t,C),d(t,n),a&&a.m(n,null),o=!0,r||(i=v(t,"click",e[1]),r=!0)},p(e,[n]){a&&a.p&&(!o||8&n)&&function(e,t,n,o,r,i){if(r){const s=l(t,n,o,i);e.p(s,r)}}(a,s,e,e[3],o?function(e,t,n,o){if(e[2]&&o){const r=e[2](o(n));if(void 0===t.dirty)return r;if("object"==typeof r){const e=[],n=Math.max(t.dirty.length,r.length);for(let o=0;o<n;o+=1)e[o]=t.dirty[o]|r[o];return e}return t.dirty|r}return t.dirty}(s,e[3],n,null):function(e){if(e.ctx.length>32){const t=[],n=e.ctx.length/32;for(let e=0;e<n;e++)t[e]=-1;return t}return-1}(e[3]),null),(!o||1&n)&&w(t,"margin",e[0]?"0 auto 0 auto":"0 auto 0 0")},i(e){o||(D(a,e),o=!0)},o(e){N(a,e),o=!1},d(e){e&&p(t),a&&a.d(e),r=!1,i()}}}function q(e,t,n){let{$$slots:o={},$$scope:r}=t,{click:i}=t,{center:s=!1}=t;return e.$$set=e=>{"click"in e&&n(2,i=e.click),"center"in e&&n(0,s=e.center),"$$scope"in e&&n(3,r=e.$$scope)},[s,function(){if("string"==typeof i){const e=i;window.open(e)}else{i()}},i,r,o]}class R extends K{constructor(e){super(),P(this,e,q,O,i,{click:2,center:0})}}function J(e){let t,n;return{c(){t=m("p"),n=f(e[0]),k(t,"class","subtitle svelte-125pj58"),w(t,"font-size",e[1]/15+"px"),w(t,"transform","translate(0,-"+e[1]/30+"px)")},m(e,o){u(e,t,o),d(t,n)},p(e,o){1&o&&function(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}(n,e[0]),2&o&&w(t,"font-size",e[1]/15+"px"),2&o&&w(t,"transform","translate(0,-"+e[1]/30+"px)")},d(e){e&&p(t)}}}function G(t){let n,o,r,i,s,a,C,c,l,f,w,$,j=null!=t[0]&&J(t);return{c(){n=m("main"),o=h("svg"),r=h("path"),i=h("path"),s=h("path"),a=h("path"),C=h("circle"),c=h("path"),l=h("path"),w=g(),j&&j.c(),k(r,"class","corner svelte-125pj58"),k(r,"d","M29 179V29H179"),k(r,"stroke","#FFE4E1"),k(r,"stroke-width","58"),k(i,"class","corner svelte-125pj58"),k(i,"d","M2276 179V29H2126"),k(i,"stroke","#FFE4E1"),k(i,"stroke-width","58"),k(s,"class","corner svelte-125pj58"),k(s,"d","M29 419V569H179"),k(s,"stroke","#FFE4E1"),k(s,"stroke-width","58"),k(a,"class","corner svelte-125pj58"),k(a,"d","M2276 419V569H2126"),k(a,"stroke","#FFE4E1"),k(a,"stroke-width","58"),k(C,"cx","2143.5"),k(C,"cy","434.5"),k(C,"r","42.5"),k(C,"fill","#FD4242"),k(C,"class","svelte-125pj58"),k(c,"class","shadow svelte-125pj58"),k(c,"d","M298.051 494.041C285.438 494.041 274.401 491.361 264.941 486C255.796 480.955 251.224 471.968 251.224 459.039C251.224 450.84 253.274 441.696 257.373 431.605C263.049 437.912 268.252 442.326 272.982 444.849C278.027 447.372 283.388 448.633 289.064 448.633C304.831 448.633 316.498 439.804 324.066 422.145C331.949 404.486 335.891 384.936 335.891 363.493C335.891 323.446 320.913 303.422 290.956 303.422C282.442 303.422 275.189 303.895 269.198 304.841L230.412 486H162.3L226.628 185.172L296.632 175.712L274.401 280.718H277.239C289.222 280.718 300.416 276.934 310.822 269.366C321.228 261.483 329.584 251.707 335.891 240.04C342.198 228.057 345.351 216.075 345.351 204.092C345.351 189.587 340.148 177.446 329.742 167.671C319.651 157.896 304.042 153.008 282.915 153.008C263.68 153.008 244.917 157.423 226.628 166.252C208.339 174.766 193.36 187.695 181.693 205.038C170.341 222.381 164.665 243.351 164.665 267.947C164.665 279.614 165.769 287.813 167.976 292.543C170.183 296.958 171.287 299.48 171.287 300.111C154.574 300.111 141.961 296.8 133.447 290.178C124.933 283.241 120.676 272.046 120.676 256.595C120.676 235.152 128.717 214.813 144.799 195.578C160.881 176.343 182.166 160.891 208.654 149.224C235.142 137.241 263.049 131.25 292.375 131.25C314.448 131.25 333.053 134.719 348.189 141.656C363.325 148.593 374.519 157.738 381.772 169.09C389.34 180.442 393.124 192.898 393.124 206.457C393.124 220.962 389.025 234.995 380.826 248.554C372.627 262.113 360.96 273.15 345.824 281.664C364.744 285.133 378.776 293.962 387.921 308.152C397.066 322.027 401.638 338.582 401.638 357.817C401.638 375.791 398.169 395.342 391.232 416.469C384.61 437.596 373.416 455.886 357.649 471.337C342.198 486.473 322.332 494.041 298.051 494.041ZM474.776 488.838C456.802 488.838 441.823 482.689 429.841 470.391C417.858 458.093 411.867 438.858 411.867 412.685C411.867 389.35 416.439 364.912 425.584 339.37C435.044 313.513 448.918 291.755 467.208 274.096C485.812 256.122 507.886 247.135 533.428 247.135C546.356 247.135 555.974 249.342 562.281 253.757C568.587 258.172 571.741 264.005 571.741 271.258V274.569L576.944 249.5H645.056L611 410.32C609.738 415.05 609.108 420.095 609.108 425.456C609.108 439.015 615.572 445.795 628.501 445.795C637.33 445.795 644.898 441.696 651.205 433.497C657.827 425.298 663.03 414.577 666.814 401.333H686.68C675.012 435.389 660.507 458.566 643.164 470.864C626.136 482.847 608.95 488.838 591.607 488.838C578.363 488.838 567.641 485.212 559.443 477.959C551.559 470.391 546.829 459.512 545.253 445.322C536.108 458.251 525.86 468.814 514.508 477.013C503.471 484.896 490.227 488.838 474.776 488.838ZM505.521 442.957C513.404 442.957 521.13 439.331 528.698 432.078C536.581 424.51 541.942 414.262 544.78 401.333L567.484 294.435C567.484 290.336 565.907 286.394 562.754 282.61C559.6 278.511 554.713 276.461 548.091 276.461C535.477 276.461 524.125 283.871 514.035 298.692C503.944 313.197 496.061 330.856 490.385 351.668C484.709 372.165 481.871 390.296 481.871 406.063C481.871 421.83 484.078 431.92 488.493 436.335C493.223 440.75 498.899 442.957 505.521 442.957ZM720.909 488.838C705.773 488.838 693.002 486 682.596 480.324C672.19 474.333 664.465 466.765 659.419 457.62C654.374 448.16 651.851 438.385 651.851 428.294C651.851 417.888 654.374 408.901 659.419 401.333C664.149 393.45 669.983 387.774 676.92 384.305C689.218 362.232 699.94 340.001 709.084 317.612C718.229 294.908 726.901 270.47 735.099 244.297L805.103 234.837C806.68 275.2 809.36 318.873 813.144 365.858C814.721 384.778 815.509 398.495 815.509 407.009C815.509 426.244 810.622 442.011 800.846 454.309C791.071 466.607 778.931 475.436 764.425 480.797C750.235 486.158 735.73 488.838 720.909 488.838ZM705.773 451.471C717.441 451.471 727.216 448.002 735.099 441.065C742.983 434.128 746.924 422.933 746.924 407.482C746.924 398.022 745.978 384.778 744.086 367.75C740.933 331.802 738.883 307.679 737.937 295.381C730.369 320.292 717.598 350.091 699.624 384.778C706.877 388.562 710.503 394.08 710.503 401.333C710.503 407.324 708.454 412.685 704.354 417.415C700.57 422.145 695.683 424.51 689.691 424.51C683.069 424.51 678.812 422.46 676.92 418.361C676.92 429.713 679.128 438.069 683.542 443.43C688.272 448.791 695.683 451.471 705.773 451.471ZM1125.42 494.041C1100.82 494.041 1088.53 483.477 1088.53 462.35C1088.53 455.413 1089.47 447.529 1091.36 438.7C1093.57 429.555 1096.57 417.888 1100.35 403.698C1104.77 388.877 1108.08 376.264 1110.28 365.858C1112.49 355.452 1113.6 346.15 1113.6 337.951C1113.6 316.508 1104.14 305.787 1085.22 305.787C1079.85 305.787 1074.65 306.418 1069.61 307.679L1031.77 486H963.654L1032.24 164.36C1011.11 173.189 994.715 186.433 983.047 204.092C971.695 221.751 966.019 243.036 966.019 267.947C966.019 279.614 967.123 287.813 969.33 292.543C971.538 296.958 972.641 299.48 972.641 300.111C955.613 300.111 942.842 296.642 934.328 289.705C926.13 282.452 922.03 270.627 922.03 254.23C922.03 234.049 930.229 214.498 946.626 195.578C963.339 176.343 984.624 160.891 1010.48 149.224C1036.34 137.241 1062.2 131.25 1088.05 131.25C1092.47 131.25 1098.77 131.565 1106.97 132.196L1076.23 276.934L1124.95 211.66C1163.73 159.315 1183.28 133.3 1183.6 133.615H1233.26L1101.77 284.975L1118.33 284.502C1139.77 284.502 1154.9 289.074 1163.73 298.219C1172.56 307.048 1176.98 319.346 1176.98 335.113C1176.98 344.258 1175.87 354.033 1173.67 364.439C1171.46 374.53 1168.31 387.143 1164.21 402.279C1161.68 412.054 1159.32 421.672 1157.11 431.132C1154.9 440.592 1153.8 448.475 1153.8 454.782C1153.8 462.035 1155.38 468.499 1158.53 474.175C1162 479.851 1166.57 483.793 1172.25 486C1153.01 491.361 1137.4 494.041 1125.42 494.041ZM1260.03 488.838C1242.06 488.838 1227.08 482.689 1215.09 470.391C1203.11 458.093 1197.12 438.858 1197.12 412.685C1197.12 389.35 1201.69 364.912 1210.84 339.37C1220.3 313.513 1234.17 291.755 1252.46 274.096C1271.07 256.122 1293.14 247.135 1318.68 247.135C1331.61 247.135 1341.23 249.342 1347.53 253.757C1353.84 258.172 1356.99 264.005 1356.99 271.258V274.569L1362.2 249.5H1430.31L1396.25 410.32C1394.99 415.05 1394.36 420.095 1394.36 425.456C1394.36 439.015 1400.83 445.795 1413.75 445.795C1422.58 445.795 1430.15 441.696 1436.46 433.497C1443.08 425.298 1448.28 414.577 1452.07 401.333H1471.93C1460.27 435.389 1445.76 458.566 1428.42 470.864C1411.39 482.847 1394.2 488.838 1376.86 488.838C1363.62 488.838 1352.9 485.212 1344.7 477.959C1336.81 470.391 1332.08 459.512 1330.51 445.322C1321.36 458.251 1311.11 468.814 1299.76 477.013C1288.72 484.896 1275.48 488.838 1260.03 488.838ZM1290.77 442.957C1298.66 442.957 1306.38 439.331 1313.95 432.078C1321.83 424.51 1327.2 414.262 1330.03 401.333L1352.74 294.435C1352.74 290.336 1351.16 286.394 1348.01 282.61C1344.85 278.511 1339.97 276.461 1333.34 276.461C1320.73 276.461 1309.38 283.871 1299.29 298.692C1289.2 313.197 1281.31 330.856 1275.64 351.668C1269.96 372.165 1267.12 390.296 1267.12 406.063C1267.12 421.83 1269.33 431.92 1273.75 436.335C1278.48 440.75 1284.15 442.957 1290.77 442.957ZM1630.09 488.838C1610.54 488.838 1595.72 484.266 1585.63 475.121C1575.54 465.661 1570.49 452.259 1570.49 434.916C1570.49 427.348 1571.44 419.149 1573.33 410.32L1577.11 391.873C1578.37 386.512 1579.01 380.679 1579.01 374.372C1579.01 359.236 1573.33 351.668 1561.98 351.668C1556.93 351.668 1551.57 353.087 1545.9 355.925C1540.53 358.763 1534.23 363.178 1526.98 369.169L1502.38 486H1434.27L1502.85 164.36L1572.86 154.9L1537.38 321.396L1628.67 249.5H1675.5L1580.9 315.247C1585.63 313.986 1590.83 313.355 1596.51 313.355C1613.53 313.355 1626.46 318.558 1635.29 328.964C1644.12 339.37 1648.54 352.614 1648.54 368.696C1648.54 375.318 1647.91 381.309 1646.64 386.67L1641.44 410.32C1639.86 415.996 1639.08 421.041 1639.08 425.456C1639.08 437.123 1645.23 442.957 1657.52 442.957C1666.98 442.957 1674.55 439.646 1680.23 433.024C1685.9 426.087 1691.58 415.523 1697.26 401.333H1717.12C1697.57 459.67 1668.56 488.838 1630.09 488.838ZM1764.69 488.838C1741.36 488.838 1723.23 482.847 1710.3 470.864C1697.37 458.566 1690.91 439.488 1690.91 413.631C1690.91 391.873 1695.16 367.908 1703.68 341.735C1712.19 315.562 1726.07 293.016 1745.3 274.096C1764.54 254.861 1788.98 245.243 1818.62 245.243C1853.3 245.243 1870.65 260.379 1870.65 290.651C1870.65 308.31 1865.6 324.549 1855.51 339.37C1845.42 354.191 1832.02 366.173 1815.31 375.318C1798.59 384.147 1780.78 389.193 1761.86 390.454C1761.23 399.914 1760.91 406.221 1760.91 409.374C1760.91 424.825 1763.59 435.389 1768.95 441.065C1774.31 446.426 1782.98 449.106 1794.97 449.106C1811.99 449.106 1826.5 445.164 1838.48 437.281C1850.78 429.398 1864.18 417.415 1878.69 401.333H1894.77C1859.77 459.67 1816.41 488.838 1764.69 488.838ZM1765.64 367.75C1777.31 367.119 1788.34 363.02 1798.75 355.452C1809.47 347.884 1817.99 338.266 1824.29 326.599C1830.91 314.932 1834.23 302.634 1834.23 289.705C1834.23 276.776 1830.28 270.312 1822.4 270.312C1811.05 270.312 1799.85 280.245 1788.82 300.111C1778.1 319.977 1770.37 342.523 1765.64 367.75ZM1932.51 488.838C1917.37 488.838 1904.6 486 1894.2 480.324C1883.79 474.333 1876.07 466.765 1871.02 457.62C1865.97 448.16 1863.45 438.385 1863.45 428.294C1863.45 417.888 1865.97 408.901 1871.02 401.333C1875.75 393.45 1881.58 387.774 1888.52 384.305C1900.82 362.232 1911.54 340.001 1920.68 317.612C1929.83 294.908 1938.5 270.47 1946.7 244.297L2016.7 234.837C2018.28 275.2 2020.96 318.873 2024.74 365.858C2026.32 384.778 2027.11 398.495 2027.11 407.009C2027.11 426.244 2022.22 442.011 2012.45 454.309C2002.67 466.607 1990.53 475.436 1976.03 480.797C1961.84 486.158 1947.33 488.838 1932.51 488.838ZM1917.37 451.471C1929.04 451.471 1938.82 448.002 1946.7 441.065C1954.58 434.128 1958.52 422.933 1958.52 407.482C1958.52 398.022 1957.58 384.778 1955.69 367.75C1952.53 331.802 1950.48 307.679 1949.54 295.381C1941.97 320.292 1929.2 350.091 1911.22 384.778C1918.48 388.562 1922.1 394.08 1922.1 401.333C1922.1 407.324 1920.05 412.685 1915.95 417.415C1912.17 422.145 1907.28 424.51 1901.29 424.51C1894.67 424.51 1890.41 422.46 1888.52 418.361C1888.52 429.713 1890.73 438.069 1895.14 443.43C1899.87 448.791 1907.28 451.471 1917.37 451.471Z"),k(c,"fill","#FF8989"),k(l,"class","text svelte-125pj58"),k(l,"d","M322.051 479.041C309.438 479.041 298.401 476.361 288.941 471C279.796 465.955 275.224 456.968 275.224 444.039C275.224 435.84 277.274 426.696 281.373 416.605C287.049 422.912 292.252 427.326 296.982 429.849C302.027 432.372 307.388 433.633 313.064 433.633C328.831 433.633 340.498 424.804 348.066 407.145C355.949 389.486 359.891 369.936 359.891 348.493C359.891 308.446 344.913 288.422 314.956 288.422C306.442 288.422 299.189 288.895 293.198 289.841L254.412 471H186.3L250.628 170.172L320.632 160.712L298.401 265.718H301.239C313.222 265.718 324.416 261.934 334.822 254.366C345.228 246.483 353.584 236.707 359.891 225.04C366.198 213.057 369.351 201.075 369.351 189.092C369.351 174.587 364.148 162.446 353.742 152.671C343.651 142.896 328.042 138.008 306.915 138.008C287.68 138.008 268.917 142.423 250.628 151.252C232.339 159.766 217.36 172.695 205.693 190.038C194.341 207.381 188.665 228.351 188.665 252.947C188.665 264.614 189.769 272.813 191.976 277.543C194.183 281.958 195.287 284.48 195.287 285.111C178.574 285.111 165.961 281.8 157.447 275.178C148.933 268.241 144.676 257.046 144.676 241.595C144.676 220.152 152.717 199.813 168.799 180.578C184.881 161.343 206.166 145.891 232.654 134.224C259.142 122.241 287.049 116.25 316.375 116.25C338.448 116.25 357.053 119.719 372.189 126.656C387.325 133.593 398.519 142.738 405.772 154.09C413.34 165.442 417.124 177.898 417.124 191.457C417.124 205.962 413.025 219.995 404.826 233.554C396.627 247.113 384.96 258.15 369.824 266.664C388.744 270.133 402.776 278.962 411.921 293.152C421.066 307.027 425.638 323.582 425.638 342.817C425.638 360.791 422.169 380.342 415.232 401.469C408.61 422.596 397.416 440.886 381.649 456.337C366.198 471.473 346.332 479.041 322.051 479.041ZM498.776 473.838C480.802 473.838 465.823 467.689 453.841 455.391C441.858 443.093 435.867 423.858 435.867 397.685C435.867 374.35 440.439 349.912 449.584 324.37C459.044 298.513 472.918 276.755 491.208 259.096C509.812 241.122 531.886 232.135 557.428 232.135C570.356 232.135 579.974 234.342 586.281 238.757C592.587 243.172 595.741 249.005 595.741 256.258V259.569L600.944 234.5H669.056L635 395.32C633.738 400.05 633.108 405.095 633.108 410.456C633.108 424.015 639.572 430.795 652.501 430.795C661.33 430.795 668.898 426.696 675.205 418.497C681.827 410.298 687.03 399.577 690.814 386.333H710.68C699.012 420.389 684.507 443.566 667.164 455.864C650.136 467.847 632.95 473.838 615.607 473.838C602.363 473.838 591.641 470.212 583.443 462.959C575.559 455.391 570.829 444.512 569.253 430.322C560.108 443.251 549.86 453.814 538.508 462.013C527.471 469.896 514.227 473.838 498.776 473.838ZM529.521 427.957C537.404 427.957 545.13 424.331 552.698 417.078C560.581 409.51 565.942 399.262 568.78 386.333L591.484 279.435C591.484 275.336 589.907 271.394 586.754 267.61C583.6 263.511 578.713 261.461 572.091 261.461C559.477 261.461 548.125 268.871 538.035 283.692C527.944 298.197 520.061 315.856 514.385 336.668C508.709 357.165 505.871 375.296 505.871 391.063C505.871 406.83 508.078 416.92 512.493 421.335C517.223 425.75 522.899 427.957 529.521 427.957ZM744.909 473.838C729.773 473.838 717.002 471 706.596 465.324C696.19 459.333 688.465 451.765 683.419 442.62C678.374 433.16 675.851 423.385 675.851 413.294C675.851 402.888 678.374 393.901 683.419 386.333C688.149 378.45 693.983 372.774 700.92 369.305C713.218 347.232 723.94 325.001 733.084 302.612C742.229 279.908 750.901 255.47 759.099 229.297L829.103 219.837C830.68 260.2 833.36 303.873 837.144 350.858C838.721 369.778 839.509 383.495 839.509 392.009C839.509 411.244 834.622 427.011 824.846 439.309C815.071 451.607 802.931 460.436 788.425 465.797C774.235 471.158 759.73 473.838 744.909 473.838ZM729.773 436.471C741.441 436.471 751.216 433.002 759.099 426.065C766.983 419.128 770.924 407.933 770.924 392.482C770.924 383.022 769.978 369.778 768.086 352.75C764.933 316.802 762.883 292.679 761.937 280.381C754.369 305.292 741.598 335.091 723.624 369.778C730.877 373.562 734.503 379.08 734.503 386.333C734.503 392.324 732.454 397.685 728.354 402.415C724.57 407.145 719.683 409.51 713.691 409.51C707.069 409.51 702.812 407.46 700.92 403.361C700.92 414.713 703.128 423.069 707.542 428.43C712.272 433.791 719.683 436.471 729.773 436.471ZM1149.42 479.041C1124.82 479.041 1112.53 468.477 1112.53 447.35C1112.53 440.413 1113.47 432.529 1115.36 423.7C1117.57 414.555 1120.57 402.888 1124.35 388.698C1128.77 373.877 1132.08 361.264 1134.28 350.858C1136.49 340.452 1137.6 331.15 1137.6 322.951C1137.6 301.508 1128.14 290.787 1109.22 290.787C1103.85 290.787 1098.65 291.418 1093.61 292.679L1055.77 471H987.654L1056.24 149.36C1035.11 158.189 1018.71 171.433 1007.05 189.092C995.695 206.751 990.019 228.036 990.019 252.947C990.019 264.614 991.123 272.813 993.33 277.543C995.538 281.958 996.641 284.48 996.641 285.111C979.613 285.111 966.842 281.642 958.328 274.705C950.13 267.452 946.03 255.627 946.03 239.23C946.03 219.049 954.229 199.498 970.626 180.578C987.339 161.343 1008.62 145.891 1034.48 134.224C1060.34 122.241 1086.2 116.25 1112.05 116.25C1116.47 116.25 1122.77 116.565 1130.97 117.196L1100.23 261.934L1148.95 196.66C1187.73 144.315 1207.28 118.3 1207.6 118.615H1257.26L1125.77 269.975L1142.33 269.502C1163.77 269.502 1178.9 274.074 1187.73 283.219C1196.56 292.048 1200.98 304.346 1200.98 320.113C1200.98 329.258 1199.87 339.033 1197.67 349.439C1195.46 359.53 1192.31 372.143 1188.21 387.279C1185.68 397.054 1183.32 406.672 1181.11 416.132C1178.9 425.592 1177.8 433.475 1177.8 439.782C1177.8 447.035 1179.38 453.499 1182.53 459.175C1186 464.851 1190.57 468.793 1196.25 471C1177.01 476.361 1161.4 479.041 1149.42 479.041ZM1284.03 473.838C1266.06 473.838 1251.08 467.689 1239.09 455.391C1227.11 443.093 1221.12 423.858 1221.12 397.685C1221.12 374.35 1225.69 349.912 1234.84 324.37C1244.3 298.513 1258.17 276.755 1276.46 259.096C1295.07 241.122 1317.14 232.135 1342.68 232.135C1355.61 232.135 1365.23 234.342 1371.53 238.757C1377.84 243.172 1380.99 249.005 1380.99 256.258V259.569L1386.2 234.5H1454.31L1420.25 395.32C1418.99 400.05 1418.36 405.095 1418.36 410.456C1418.36 424.015 1424.83 430.795 1437.75 430.795C1446.58 430.795 1454.15 426.696 1460.46 418.497C1467.08 410.298 1472.28 399.577 1476.07 386.333H1495.93C1484.27 420.389 1469.76 443.566 1452.42 455.864C1435.39 467.847 1418.2 473.838 1400.86 473.838C1387.62 473.838 1376.9 470.212 1368.7 462.959C1360.81 455.391 1356.08 444.512 1354.51 430.322C1345.36 443.251 1335.11 453.814 1323.76 462.013C1312.72 469.896 1299.48 473.838 1284.03 473.838ZM1314.77 427.957C1322.66 427.957 1330.38 424.331 1337.95 417.078C1345.83 409.51 1351.2 399.262 1354.03 386.333L1376.74 279.435C1376.74 275.336 1375.16 271.394 1372.01 267.61C1368.85 263.511 1363.97 261.461 1357.34 261.461C1344.73 261.461 1333.38 268.871 1323.29 283.692C1313.2 298.197 1305.31 315.856 1299.64 336.668C1293.96 357.165 1291.12 375.296 1291.12 391.063C1291.12 406.83 1293.33 416.92 1297.75 421.335C1302.48 425.75 1308.15 427.957 1314.77 427.957ZM1654.09 473.838C1634.54 473.838 1619.72 469.266 1609.63 460.121C1599.54 450.661 1594.49 437.259 1594.49 419.916C1594.49 412.348 1595.44 404.149 1597.33 395.32L1601.11 376.873C1602.37 371.512 1603.01 365.679 1603.01 359.372C1603.01 344.236 1597.33 336.668 1585.98 336.668C1580.93 336.668 1575.57 338.087 1569.9 340.925C1564.53 343.763 1558.23 348.178 1550.98 354.169L1526.38 471H1458.27L1526.85 149.36L1596.86 139.9L1561.38 306.396L1652.67 234.5H1699.5L1604.9 300.247C1609.63 298.986 1614.83 298.355 1620.51 298.355C1637.53 298.355 1650.46 303.558 1659.29 313.964C1668.12 324.37 1672.54 337.614 1672.54 353.696C1672.54 360.318 1671.91 366.309 1670.64 371.67L1665.44 395.32C1663.86 400.996 1663.08 406.041 1663.08 410.456C1663.08 422.123 1669.23 427.957 1681.52 427.957C1690.98 427.957 1698.55 424.646 1704.23 418.024C1709.9 411.087 1715.58 400.523 1721.26 386.333H1741.12C1721.57 444.67 1692.56 473.838 1654.09 473.838ZM1788.69 473.838C1765.36 473.838 1747.23 467.847 1734.3 455.864C1721.37 443.566 1714.91 424.488 1714.91 398.631C1714.91 376.873 1719.16 352.908 1727.68 326.735C1736.19 300.562 1750.07 278.016 1769.3 259.096C1788.54 239.861 1812.98 230.243 1842.62 230.243C1877.3 230.243 1894.65 245.379 1894.65 275.651C1894.65 293.31 1889.6 309.549 1879.51 324.37C1869.42 339.191 1856.02 351.173 1839.31 360.318C1822.59 369.147 1804.78 374.193 1785.86 375.454C1785.23 384.914 1784.91 391.221 1784.91 394.374C1784.91 409.825 1787.59 420.389 1792.95 426.065C1798.31 431.426 1806.98 434.106 1818.97 434.106C1835.99 434.106 1850.5 430.164 1862.48 422.281C1874.78 414.398 1888.18 402.415 1902.69 386.333H1918.77C1883.77 444.67 1840.41 473.838 1788.69 473.838ZM1789.64 352.75C1801.31 352.119 1812.34 348.02 1822.75 340.452C1833.47 332.884 1841.99 323.266 1848.29 311.599C1854.91 299.932 1858.23 287.634 1858.23 274.705C1858.23 261.776 1854.28 255.312 1846.4 255.312C1835.05 255.312 1823.85 265.245 1812.82 285.111C1802.1 304.977 1794.37 327.523 1789.64 352.75ZM1956.51 473.838C1941.37 473.838 1928.6 471 1918.2 465.324C1907.79 459.333 1900.07 451.765 1895.02 442.62C1889.97 433.16 1887.45 423.385 1887.45 413.294C1887.45 402.888 1889.97 393.901 1895.02 386.333C1899.75 378.45 1905.58 372.774 1912.52 369.305C1924.82 347.232 1935.54 325.001 1944.68 302.612C1953.83 279.908 1962.5 255.47 1970.7 229.297L2040.7 219.837C2042.28 260.2 2044.96 303.873 2048.74 350.858C2050.32 369.778 2051.11 383.495 2051.11 392.009C2051.11 411.244 2046.22 427.011 2036.45 439.309C2026.67 451.607 2014.53 460.436 2000.03 465.797C1985.84 471.158 1971.33 473.838 1956.51 473.838ZM1941.37 436.471C1953.04 436.471 1962.82 433.002 1970.7 426.065C1978.58 419.128 1982.52 407.933 1982.52 392.482C1982.52 383.022 1981.58 369.778 1979.69 352.75C1976.53 316.802 1974.48 292.679 1973.54 280.381C1965.97 305.292 1953.2 335.091 1935.22 369.778C1942.48 373.562 1946.1 379.08 1946.1 386.333C1946.1 392.324 1944.05 397.685 1939.95 402.415C1936.17 407.145 1931.28 409.51 1925.29 409.51C1918.67 409.51 1914.41 407.46 1912.52 403.361C1912.52 414.713 1914.73 423.069 1919.14 428.43C1923.87 433.791 1931.28 436.471 1941.37 436.471Z"),k(l,"fill","#545454"),k(o,"width",t[1]),k(o,"height",f=598*t[1]/2305),k(o,"viewBox","0 0 2305 598"),k(o,"fill","none"),k(o,"xmlns","http://www.w3.org/2000/svg"),Z((()=>t[2].call(n)))},m(e,h){u(e,n,h),d(n,o),d(o,r),d(o,i),d(o,s),d(o,a),d(o,C),d(o,c),d(o,l),d(n,w),j&&j.m(n,null),$=function(e,t){"static"===getComputedStyle(e).position&&(e.style.position="relative");const n=m("iframe");n.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),n.setAttribute("aria-hidden","true"),n.tabIndex=-1;const o=b();let r;return o?(n.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",r=v(window,"message",(e=>{e.source===n.contentWindow&&t()}))):(n.src="about:blank",n.onload=()=>{r=v(n.contentWindow,"resize",t)}),d(e,n),()=>{(o||r&&n.contentWindow)&&r(),p(n)}}(n,t[2].bind(n))},p(e,[t]){2&t&&k(o,"width",e[1]),2&t&&f!==(f=598*e[1]/2305)&&k(o,"height",f),null!=e[0]?j?j.p(e,t):(j=J(e),j.c(),j.m(n,null)):j&&(j.d(1),j=null)},i:e,o:e,d(e){e&&p(n),j&&j.d(),$()}}}function Y(e,t,n){let o,{subtitle:r}=t;return e.$$set=e=>{"subtitle"in e&&n(0,r=e.subtitle)},n(1,o=0),[r,o,function(){o=this.clientWidth,n(1,o)}]}class Q extends K{constructor(e){super(),P(this,e,Y,G,i,{subtitle:0})}}function U(t){let n;return{c(){n=m("main"),n.innerHTML='<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/139269807?h=a16d8c8b14&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen="" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Showreel Bas Kakes"></iframe></div> \n  <script src="https://player.vimeo.com/api/player.js"><\/script>'},m(e,t){u(e,n,t)},p:e,i:e,o:e,d(e){e&&p(n)}}}function X(e){return[]}class ee extends K{constructor(e){super(),P(this,e,X,U,i,{})}}const{window:te}=I;function ne(e){let t;return{c(){t=f("Bekijk mijn portfolio")},m(e,n){u(e,t,n)},d(e){e&&p(t)}}}function oe(e){let t;return{c(){t=f("Mail mij")},m(e,n){u(e,t,n)},d(e){e&&p(t)}}}function re(e){let t;return{c(){t=f("LinkedIn")},m(e,n){u(e,t,n)},d(e){e&&p(t)}}}function ie(e){let t,n,r,i,s,a,C,l,h,f,b,$,j,x,L,y,M,H,_,z,E,B,F,A,I,S,P,K,O,q,J,G,Y,U,X,ie,ae,ce,le,de,ue,pe,me,he,fe,ge,ve,ke,we,be,$e,je,xe,Le,ye,Me,He,_e,Ze,ze,Ee,Be,Fe,Ae,De,Ne,Ie,Ve,We,Te,Se,Pe,Ke,Oe,qe,Re,Je,Ge,Ye;return Z(e[4]),n=new Q({props:{subtitle:"brengt het in beeld"}}),$=new R({props:{center:!0,click:Ce,$$slots:{default:[ne]},$$scope:{ctx:e}}}),y=new ee({}),Se=new R({props:{click:"mailto:info@baskakes.nl?subject=Samenwerken aan project",$$slots:{default:[oe]},$$scope:{ctx:e}}}),Ke=new R({props:{click:"https://www.linkedin.com/in/bas-kakes/",$$slots:{default:[re]},$$scope:{ctx:e}}}),{c(){t=m("main"),V(n.$$.fragment),r=g(),i=m("content"),s=m("badgeContainer"),s.innerHTML='<img class="badge svelte-1huogsc" src="./assets/images/bas-kakes.jpg" alt="Foto van Bas Kakes"/>',a=g(),C=m("space"),l=g(),h=m("quote"),f=m("p"),f.textContent=`${se}`,b=g(),V($.$$.fragment),j=g(),x=m("h2"),x.textContent="Showreel",L=g(),V(y.$$.fragment),M=g(),H=m("p"),H.textContent="Voor mij moet het modern, visueel verantwoord en technisch perfect zijn;\n      de kijker moet voelen wat ik voel. En dat geldt ook voor de mensen waarmee\n      ik werk, want mijn kracht en passie komen bijeen door samen te werken aan\n      prachtige filmprojecten.",_=g(),z=m("p"),z.textContent="Ik ben filmregisseur, cameraman, en video-editor.",E=g(),B=m("p"),B.textContent="Al van kleins af aan trommelde ik de hele buurt op om in mijn ‘films’ te\n      spelen. Toen was ik al begonnen mezelf te ontwikkelen, en nog steeds leg\n      ik de lat keer op keer hoger. Na een studie met specialisatie tot\n      cameraman en video-editor (afgerond in 2015) was de basis gelegd om\n      professionele projecten te kunnen realiseren.",F=g(),A=m("h2"),A.textContent="Ter land, ter zee en in de lucht",I=g(),S=m("p"),S.textContent="Ik zorg dat ik met mijn camera op de juiste plaats en om de juiste tijd\n      aanwezig ben om de mooiste shots te maken. Het vliegen met een drone of\n      het maken van een duik in het water kunnen die unieke beelden opleveren\n      die nodig zijn om het verhaal goed in beeld te brengen. Natuurlijk ben ik\n      gecertificeerd bij de EASA op A1-A3 en A2-niveau voor het vliegen met de\n      drone en bij PADI als Open Water Diver; rekening houden met veiligheid en\n      lokale regelgeving zijn voor mij belangrijk.",P=g(),K=m("h2"),K.textContent="Portfolio",O=g(),q=m("p"),q.textContent="Dit zijn enkele van mijn afgeronde projecten.",J=g(),G=m("h3"),G.textContent="Dordrecht door de jaren heen",Y=g(),U=m("p"),U.innerHTML='Een documentaire over de stad waar ik vandaan kom. Deze film heb ik samen\n      met mijn neef <a target="_blank" href="https://www.linkedin.com/in/coen-koopmans-3b15519a/">Coen Koopmans</a>\n      en goede vriend\n      <a target="_blank" href="https://www.linkedin.com/in/kevin-van-den-hoek-9302b8145/">Kevin van den Hoek</a> gemaakt. Het begon met het enorme enthousiasme voor Dordrecht van de opa\n      van Coen en mijzelf. Dit wilde ik onderzoeken en is uitgedraaid tot een bioscoopfilm\n      over de stad.',X=g(),ie=m("img"),ce=g(),le=m("a"),le.textContent="Meer over Dordrecht door de jaren heen",de=g(),ue=m("a"),ue.textContent="In het AD",pe=g(),me=m("h3"),me.textContent="BMW Nederland",he=g(),fe=m("p"),fe.innerHTML="Voor BMW maak ik diverse films van speciale evenementen die ze verzorgen. <i>BMW Privileges</i> (een programma voor klanten) biedt meerdere evenementen aan voor BMW-rijders.\n      Dit varieert van luxe dinertjes tot het racen op Circuit Zandvoort. Zo’n evenement\n      wordt door mij vastgelegd en verwerkt in een korte film.",ge=g(),ve=m("a"),ve.textContent="Bekijk mijn werk voor BMW Nederland",ke=g(),we=m("a"),we.textContent="Bekijk mijn werk voor MINI Nederland",be=g(),$e=m("h3"),$e.textContent="Rijkswaterstaat",je=g(),xe=m("p"),xe.textContent="Voor Rijkswaterstaat ben ik bezig geweest om diverse onderdelen in het\n      bedrijf in beeld te brengen om begrip tussen afdelingen te vergroten.",Le=g(),ye=m("a"),ye.textContent="Bekijk mijn werk voor Rijkswaterstaat",Me=g(),He=m("h3"),He.textContent="De Biesbosch: Grootse natuur in een klein land",_e=g(),Ze=m("p"),Ze.textContent="De Biesbosch is een prachtig gebied en ligt praktisch in mijn achtertuin.\n      Een uniek gebied waar ik graag ben en meer over te weten wil komen. Samen\n      met onder andere Jacques van der Neut (oud-boswachter van de Biesbosch)\n      maak ik een film over dit prachtige gebied.",ze=g(),Ee=m("img"),Fe=g(),Ae=m("img"),Ne=g(),Ie=m("p"),Ie.textContent="Natuurlijk ben ik beschikbaar voor onder ander bedrijfsvideo’s,\n      commercials, videoclips en allerlei andere videoklussen. Zullen we\n      samenwerken aan uw project?",Ve=g(),We=m("spacer"),Te=g(),V(Se.$$.fragment),Pe=g(),V(Ke.$$.fragment),Oe=g(),qe=m("video"),k(s,"class","svelte-1huogsc"),k(f,"class","svelte-1huogsc"),k(h,"class","svelte-1huogsc"),k(x,"class","reel svelte-1huogsc"),k(z,"class","bold"),k(A,"class","svelte-1huogsc"),k(K,"id","portfolio"),k(K,"class","svelte-1huogsc"),k(G,"class","svelte-1huogsc"),k(ie,"class","photo svelte-1huogsc"),k(ie,"alt","Foto van première Dordrecht door de jaren heen."),c(ie.src,ae="./assets/images/dordrecht-door-de-jaren-heen-premiere.jpg")||k(ie,"src","./assets/images/dordrecht-door-de-jaren-heen-premiere.jpg"),k(le,"target","_blank"),k(le,"href","https://www.dordtfilm.nl/"),k(ue,"target","_blank"),k(ue,"href","https://www.ad.nl/dordrecht/corona-gooide-eerder-roet-in-het-eten-maar-dordt-docu-is-straks-echt-te-zien-in-de-bioscoop~a26842e3/"),k(me,"class","svelte-1huogsc"),k(fe,"class","bmw svelte-1huogsc"),k(ve,"target","_blank"),k(ve,"href","https://www.bmw.nl/nl/content/aftersales/privileges/privileges.html#"),k(we,"target","_blank"),k(we,"href","https://www.mini.nl/nl_NL/home/nog-meer-mini/mini-favours.html"),k($e,"class","svelte-1huogsc"),k(ye,"target","_blank"),k(ye,"href","https://www.youtube.com/watch?v=r2gcHdI4AJY"),k(He,"class","svelte-1huogsc"),k(Ee,"class","photo svelte-1huogsc"),k(Ee,"alt","Foto van camera van Bas"),c(Ee.src,Be="./assets/images/biesbosch-camera.jpg")||k(Ee,"src","./assets/images/biesbosch-camera.jpg"),k(Ae,"class","photo svelte-1huogsc"),k(Ae,"alt","Foto van Bas met camera"),c(Ae.src,De="./assets/images/bas-kakes-biesbosch.jpg")||k(Ae,"src","./assets/images/bas-kakes-biesbosch.jpg"),k(We,"class","svelte-1huogsc"),k(i,"class","svelte-1huogsc"),k(qe,"preload","none"),c(qe.src,Re=e[1])||k(qe,"src",Re),qe.autoplay=!0,qe.muted=!0,qe.loop=!0,k(qe,"class","svelte-1huogsc"),w(t,"width",e[2]+"px"),k(t,"class","svelte-1huogsc")},m(o,c){u(o,t,c),W(n,t,null),d(t,r),d(t,i),d(i,s),d(i,a),d(i,C),d(i,l),d(i,h),d(h,f),d(i,b),W($,i,null),d(i,j),d(i,x),d(i,L),W(y,i,null),d(i,M),d(i,H),d(i,_),d(i,z),d(i,E),d(i,B),d(i,F),d(i,A),d(i,I),d(i,S),d(i,P),d(i,K),d(i,O),d(i,q),d(i,J),d(i,G),d(i,Y),d(i,U),d(i,X),d(i,ie),d(i,ce),d(i,le),d(i,de),d(i,ue),d(i,pe),d(i,me),d(i,he),d(i,fe),d(i,ge),d(i,ve),d(i,ke),d(i,we),d(i,be),d(i,$e),d(i,je),d(i,xe),d(i,Le),d(i,ye),d(i,Me),d(i,He),d(i,_e),d(i,Ze),d(i,ze),d(i,Ee),d(i,Fe),d(i,Ae),d(i,Ne),d(i,Ie),d(i,Ve),d(i,We),d(i,Te),W(Se,i,null),d(i,Pe),W(Ke,i,null),d(t,Oe),d(t,qe),Je=!0,Ge||(Ye=[v(te,"resize",e[3]),v(te,"resize",e[4])],Ge=!0)},p(e,[n]){const o={};32&n&&(o.$$scope={dirty:n,ctx:e}),$.$set(o);const r={};32&n&&(r.$$scope={dirty:n,ctx:e}),Se.$set(r);const i={};32&n&&(i.$$scope={dirty:n,ctx:e}),Ke.$set(i),(!Je||2&n&&!c(qe.src,Re=e[1]))&&k(qe,"src",Re),(!Je||4&n)&&w(t,"width",e[2]+"px")},i(e){Je||(D(n.$$.fragment,e),D($.$$.fragment,e),D(y.$$.fragment,e),D(Se.$$.fragment,e),D(Ke.$$.fragment,e),Je=!0)},o(e){N(n.$$.fragment,e),N($.$$.fragment,e),N(y.$$.fragment,e),N(Se.$$.fragment,e),N(Ke.$$.fragment,e),Je=!1},d(e){e&&p(t),T(n),T($),T(y),T(Se),T(Ke),Ge=!1,o(Ye)}}}let se="Ik wil de wereld van haar mooiste kant laten zien. Dit doe ik via mijn passie voor film.";function ae(){return`./assets/video/bg_${window.innerHeight>window.innerWidth?"portrait":"landscape"}.mp4`}function Ce(){var e;null===(e=document.getElementById("portfolio"))||void 0===e||e.scrollIntoView({behavior:"smooth"})}function ce(e,t,n){let o,r,i;function s(){const e=ae();e!=i&&n(1,i=e)}return j(s),e.$$.update=()=>{1&e.$$.dirty&&n(2,r=Math.min(.5*Math.max(screen.width,screen.height),Math.max(o,300)))},n(0,o=0),n(1,i=ae()),[o,i,r,s,function(){n(0,o=te.innerWidth)}]}return new class extends K{constructor(e){super(),P(this,e,ce,ie,i,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
