var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function o(t){t.forEach(n)}function r(t){return"function"==typeof t}function c(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function u(t,n){t.appendChild(n)}function s(t){t.parentNode.removeChild(t)}function a(t){return document.createElement(t)}let i;function f(t){i=t}const l=[],d=[],p=[],$=[],h=Promise.resolve();let m=!1;function g(t){p.push(t)}const b=new Set;let y=0;function _(){const t=i;do{for(;y<l.length;){const t=l[y];y++,f(t),x(t.$$)}for(f(null),l.length=0,y=0;d.length;)d.pop()();for(let t=0;t<p.length;t+=1){const n=p[t];b.has(n)||(b.add(n),n())}p.length=0}while(l.length);for(;$.length;)$.pop()();m=!1,b.clear(),f(t)}function x(t){if(null!==t.fragment){t.update(),o(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(g)}}const k=new Set;function v(t,n){-1===t.$$.dirty[0]&&(l.push(t),m||(m=!0,h.then(_)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function w(c,u,a,l,d,p,$,h=[-1]){const m=i;f(c);const b=c.$$={fragment:null,ctx:null,props:p,update:t,not_equal:d,bound:e(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(u.context||(m?m.$$.context:[])),callbacks:e(),dirty:h,skip_bound:!1,root:u.target||m.$$.root};$&&$(b.root);let y=!1;if(b.ctx=a?a(c,u.props||{},((t,n,...e)=>{const o=e.length?e[0]:n;return b.ctx&&d(b.ctx[t],b.ctx[t]=o)&&(!b.skip_bound&&b.bound[t]&&b.bound[t](o),y&&v(c,t)),n})):[],b.update(),y=!0,o(b.before_update),b.fragment=!!l&&l(b.ctx),u.target){if(u.hydrate){const t=function(t){return Array.from(t.childNodes)}(u.target);b.fragment&&b.fragment.l(t),t.forEach(s)}else b.fragment&&b.fragment.c();u.intro&&((x=c.$$.fragment)&&x.i&&(k.delete(x),x.i(w))),function(t,e,c,u){const{fragment:s,on_mount:a,on_destroy:i,after_update:f}=t.$$;s&&s.m(e,c),u||g((()=>{const e=a.map(n).filter(r);i?i.push(...e):o(e),t.$$.on_mount=[]})),f.forEach(g)}(c,u.target,u.anchor,u.customElement),_()}var x,w;f(m)}function E(n){let e,o,r;return{c(){var t,c,u,s;e=a("main"),o=a("h1"),t=n[0],r=document.createTextNode(t),c=e,u="class",null==(s="svelte-1cq72g2")?c.removeAttribute(u):c.getAttribute(u)!==s&&c.setAttribute(u,s)},m(t,n){!function(t,n,e){t.insertBefore(n,e||null)}(t,e,n),u(e,o),u(o,r)},p(t,[n]){1&n&&function(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}(r,t[0])},i:t,o:t,d(t){t&&s(e)}}}function A(t,n,e){let o;return e(0,o="Bas Kakes"),["Bas Kakes"]}return new class extends class{$destroy(){!function(t,n){const e=t.$$;null!==e.fragment&&(o(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}{constructor(t){super(),w(this,t,A,E,c,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
