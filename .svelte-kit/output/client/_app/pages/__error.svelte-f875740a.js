import{S as w,i as C,s as M,x as l,y as f,z as u,r as $,p,C as _,e as T,t as d,k as v,c as E,a as P,h,d as c,m as S,g as b,K as k,j as x}from"../chunks/index-63fce611.js";import{M as A}from"../chunks/MainWithSidebar-86148665.js";import{M as B}from"../chunks/MainBlock-8aade17e.js";import{C as H}from"../chunks/CodeBlock-b1b64871.js";/* empty css                                                        */import"../chunks/Icon-c351fa8a.js";function j(o){let e,n,t,s,a,m;return a=new H({props:{lang:"none",text:o[0]}}),{c(){e=T("p"),n=d("An error occured on the server: HTTP "),t=d(o[1]),s=v(),l(a.$$.fragment)},l(r){e=E(r,"P",{});var i=P(e);n=h(i,"An error occured on the server: HTTP "),t=h(i,o[1]),i.forEach(c),s=S(r),f(a.$$.fragment,r)},m(r,i){b(r,e,i),k(e,n),k(e,t),b(r,s,i),u(a,r,i),m=!0},p(r,i){(!m||i&2)&&x(t,r[1]);const g={};i&1&&(g.text=r[0]),a.$set(g)},i(r){m||($(a.$$.fragment,r),m=!0)},o(r){p(a.$$.fragment,r),m=!1},d(r){r&&c(e),r&&c(s),_(a,r)}}}function q(o){let e,n;return e=new B({props:{title:"Error: "+o[1],$$slots:{default:[j]},$$scope:{ctx:o}}}),{c(){l(e.$$.fragment)},l(t){f(e.$$.fragment,t)},m(t,s){u(e,t,s),n=!0},p(t,s){const a={};s&2&&(a.title="Error: "+t[1]),s&7&&(a.$$scope={dirty:s,ctx:t}),e.$set(a)},i(t){n||($(e.$$.fragment,t),n=!0)},o(t){p(e.$$.fragment,t),n=!1},d(t){_(e,t)}}}function z(o){let e,n;return e=new A({props:{$$slots:{default:[q]},$$scope:{ctx:o}}}),{c(){l(e.$$.fragment)},l(t){f(e.$$.fragment,t)},m(t,s){u(e,t,s),n=!0},p(t,[s]){const a={};s&7&&(a.$$scope={dirty:s,ctx:t}),e.$set(a)},i(t){n||($(e.$$.fragment,t),n=!0)},o(t){p(e.$$.fragment,t),n=!1},d(t){_(e,t)}}}function J({error:o,status:e}){return{props:{message:o.message,status:e}}}function K(o,e,n){let{message:t}=e,{status:s}=e;return o.$$set=a=>{"message"in a&&n(0,t=a.message),"status"in a&&n(1,s=a.status)},[t,s]}class L extends w{constructor(e){super(),C(this,e,K,z,M,{message:0,status:1})}}export{L as default,J as load};
