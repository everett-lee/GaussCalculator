(this.webpackJsonpgauss=this.webpackJsonpgauss||[]).push([[0],{15:function(e,t,a){},16:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(7),i=a.n(c),s=a(2),o=a.n(s),u=a(3),l=a(1),m=function(e){return new Promise((function(t){return setTimeout(t,e)}))};var f=function(e){var t=e.className,a=e.val,c=e.inputTest,i=e.number,s=e.f,o=e.placeholder,u=e.testId,f=Object(n.useState)({backgroundColor:"white"}),p=Object(l.a)(f,2),d=p[0],v=p[1];return r.a.createElement("input",{className:t,value:a,style:d,onChange:function(e){return function(e){c(e)?(v({backgroundColor:"#ec3643"}),m(500).then((function(e){return v({backgroundColor:"white"})})),s("")):s(i?Number(e):e)}(e.target.value)},placeholder:o,"data-testid":u})};var p=function(e){var t=e.className,a=e.name,n=e.testId,c=e.f;return r.a.createElement("button",{className:t,onClick:function(e){return c()},"data-testid":n},a)};var d=function(e){var t=e.m,a=e.setM,n=e.n,c=e.setN,i=e.makeArray,s=e.resetMatrix,o=function(e){return isNaN(e)||e<1||e>10};return r.a.createElement("div",{className:"topContainer"},r.a.createElement(f,{className:"topInput",val:t,inputTest:o,f:a,placeholder:"m",number:!0,testId:"mInput"}),r.a.createElement("div",{className:"topDiv"},"X"),r.a.createElement(f,{className:"topInput",val:n,inputTest:o,f:c,placeholder:"n",number:!0,testId:"nInput"}),r.a.createElement(p,{name:"Make matrix",f:i,className:"topButton"}),r.a.createElement(p,{name:"Reset",f:s,className:"topButton"}))},v=function(e){var t=[];return e.forEach((function(e){return t.push(e.map((function(e){return e="."===e||"-"===e?0:e,parseFloat(e,10)})))})),t},x=function(e){var t=parseFloat(e);return isNaN(t)?(console.error("Invalid scalar"),!1):t},b=function(e,t){return isNaN(e)||e<1||e>t};var h=function(e){var t=e.rowRangeTest,a=e.getMatrix,c=e.setMatrix,i=e.dimRows,s=Object(n.useState)(1),o=Object(l.a)(s,2),u=o[0],m=o[1],d=Object(n.useState)(""),h=Object(l.a)(d,2),w=h[0],E=h[1],N=Object(n.useState)(""),g=Object(l.a)(N,2),M=g[0],j=g[1],O=function(e){var a=t(e);return e=Number(e),a||(e===w||e===M)};return r.a.createElement("div",{className:"fContainer"},r.a.createElement(f,{className:"fInput",f:m,val:u,inputTest:function(e){return!/^-{0,1}\d*\.{0,1}\d*$/.test(e)||e.length>7},number:!1,testId:"scalarValueTop"}),r.a.createElement("div",{className:"fDiv"}," ","\u2715"," Row "),r.a.createElement(f,{className:"fInput",f:E,val:w,inputTest:O,number:!0,testId:"R1ValueTop",placeholder:"R\u1d62"}),r.a.createElement("div",{className:"fDiv"}," + Row "),r.a.createElement(f,{className:"fInput",f:j,val:M,inputTest:O,number:!0,testId:"R2ValueTop",placeholder:"R\u2c7c"}),r.a.createElement(p,{className:"fButton",name:"".concat(u," ").concat("\u2715"," R").concat(w," + R").concat(M," \u2192 R").concat(M),f:function(){!function(e,t,a,n,r,c){var i=n().length;if(b(e,i)||b(t,i))console.error("Both rows must be selected");else{var s=e-1,o=t-1,u=x(a);if(u){for(var l=n(),m=(l=v(l))[s].map((function(e){return e*u})),f=0;f<l[o].length;f++)l[o][f]+=m[f];var p=l.flatMap((function(e){return e}));c([o]),r(p)}}}(w,M,u,a,c,i)},testId:"rowAdditionButton"}))};var w=function(e){var t=e.getMatrix,a=e.setMatrix,c=e.rowRangeTest,i=e.dimRows,s=Object(n.useState)(1),o=Object(l.a)(s,2),u=o[0],m=o[1],d=Object(n.useState)(""),b=Object(l.a)(d,2),h=b[0],w=b[1],E=Object(n.useState)("\xb7"),N=Object(l.a)(E,2),g=N[0],M=N[1];return r.a.createElement("div",{className:"fContainer"},r.a.createElement("div",{className:"fDivLong"}," "),r.a.createElement("div",{className:"fDiv"}," Row "),r.a.createElement(f,{className:"fInput",f:w,val:h,inputTest:c,number:!0,testId:"R1ValueBottom",placeholder:"R\u1d62"}),r.a.createElement("div",{className:"opButtonContainer"},r.a.createElement(p,{className:"opButton",name:g,testId:"setOperationButton",f:function(){M("\xb7"===g?"\xf7":"\xb7")}})),r.a.createElement(f,{className:"fInput",f:m,val:u,inputTest:function(e){var t="0"===e;return!/^-{0,1}\d*\.{0,1}\d*$/.test(e)||e.length>7||t},number:!1,testId:"scalarValueBottom"}),r.a.createElement(p,{className:"fButton",name:"R".concat(h," ").concat(g," ").concat(u," \u2192 R").concat(h),testId:"rowScaleButton",f:function(){!function(e,t,a,n,r,c){var i=e-1;if(!(i<0)){var s=x(t);if(s){var o=n(),u=(o=v(o))[i].map((function(e){return"\xb7"===a?e*s:e/s}));o[i]=u;var l=o.flatMap((function(e){return e}));c([i]),r(l)}}}(h,u,g,t,a,i)}}))};var E=function(e){var t=e.rows,a=e.getMatrix,n=e.setMatrix,c=e.dimRows,i=function(e){return isNaN(e)||e<1||e>t};return r.a.createElement("div",{className:"functionContainer"},r.a.createElement(h,{rows:t,dimRows:c,getMatrix:a,setMatrix:n,rowRangeTest:i}),r.a.createElement(w,{rows:t,dimRows:c,getMatrix:a,setMatrix:n,rowRangeTest:i}))},N=a(8);var g=function(e){var t=[];return e.forEach((function(e){t.push(e.slice(0))})),t},M=function(){};function j(){return(j=Object(u.a)(o.a.mark((function e(t,a){var n,r,c,i,s,u,l,m=arguments;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=m.length>2&&void 0!==m[2]?m[2]:M,t=g(t),r=0,c=t.length,i=t[0].length,s=o.a.mark((function e(s){var u,l,m,f,p,d,v,x;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(r>=i)){e.next=2;break}return e.abrupt("return",{v:t});case 2:if(0!==t[u=s][r]){e.next=12;break}if(-1!==(l=k(t,u,s,r,c,i))[0]){e.next=9;break}return e.abrupt("return",{v:t});case 9:m=Object(N.a)(l),u=m[0],r=m[1];case 12:return t=C(u,s,t),e.next=15,O(a,[u,s],500);case 15:if(n(t.flatMap((function(e){return e}))),0===(f=t[s][r])){e.next=22;break}return t[s]=t[s].map((function(e){return e/f})),e.next=21,O(a,[s],500);case 21:n(t.flatMap((function(e){return e})));case 22:p=0;case 23:if(!(p<c)){e.next=31;break}if(f=t[p][r],p!==s)for(d=t[s].map((function(e){return e*f})),v=t[p],x=0;x<i;x++)v[x]-=d[x],n(t.flatMap((function(e){return e})));return e.next=28,O(a,[p],250);case 28:p++,e.next=23;break;case 31:r++;case 32:case"end":return e.stop()}}),e)})),u=0;case 7:if(!(u<c)){e.next=15;break}return e.delegateYield(s(u),"t0",9);case 9:if("object"!==typeof(l=e.t0)){e.next=12;break}return e.abrupt("return",l.v);case 12:u++,e.next=7;break;case 15:return e.abrupt("return",R(t));case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(e,t,a){return y.apply(this,arguments)}function y(){return(y=Object(u.a)(o.a.mark((function e(t,a,n){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(a),e.next=3,m(n);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function R(e){var t=[];return e.forEach((function(e){return t.push(e.map((function(e){return-0===e?0:e})))})),t}function k(e,t,a,n,r,c){for(;0===e[t][n];)if(++t===r&&(t=a,++n===c))return[-1,-1];return[t,n]}function C(e,t,a){var n=(a=g(a))[e];return a[e]=a[t],a[t]=n,a}var I=function(e,t){return j.apply(this,arguments)};var B=function(e){var t=e.rows,a=e.getMatrix,n=e.setMatrix,c=e.undoLast,i=e.dimRows,s=function(){var e=Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:I(a(),i,n).then((function(e){n(e.flatMap((function(e){return e})))}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"bottomContainer"},r.a.createElement(E,{rows:t,dimRows:i,getMatrix:a,setMatrix:n}),r.a.createElement(p,{name:"\u21ba",className:"undoButton",f:c,testId:"undoButton"}),r.a.createElement(p,{name:"Convert to row canonical form",className:"echeleonButton",f:s}))},S=Object(n.createContext)();function T(e){var t=e.children,a={n:4,m:5},c={matrix:new Array(a.m*a.n).fill(0),dimensions:a},i=Object(n.useState)([c]),s=Object(l.a)(i,2),o=s[0],u=s[1];return r.a.createElement(S.Provider,{value:{undo:function(){if(1===o.length)return!1;var e=o.slice(0).pop();return u(o.slice(0,o.length-1)),e},addState:function(e){var t=o.slice(0);t.push(e),u(t)},resetHistory:function(e){u([e])}}},t)}var A=function(e){var t,a=e.cols,n=e.index,c=e.opacity,i=e.matrix,s=e.setMatrix,o={opacity:c,transitionProperty:"opacity",transitionDuration:"0.2s",backgroundColor:(t=n,t%a===a-1?"#cecece":"white")},u=function(e){/^-{0,1}\d*\.{0,1}\d*$/.test(e)&&function(e){var t=i.slice(0);t[n]=e,s(t)}(e)};return r.a.createElement("div",{className:"cell"},r.a.createElement("input",{type:"text",className:"numInput",value:i[n],style:o,onChange:function(e){return u(e.target.value)},"data-testid":n}))};var D=function(e){var t=e.cols,a=e.dimmedCells,n=e.matrix,c=e.setMatrix,i={gridTemplateColumns:"repeat(".concat(t,", minmax(auto, 1fr))")};return r.a.createElement("div",{className:"matrix",style:i},n.map((function(e,i){var s=a.includes(i)?0:1;return r.a.createElement(A,{index:i,key:i,matrix:n,setMatrix:c,cols:t,opacity:s})})))};var P=function(e){var t=e.clicked,a=e.f,n=e.i,c=e.name,i={};return t&&(i={backgroundColor:"#3CBC8D"}),r.a.createElement("button",{className:"swapButton",onClick:function(e){a(n)},style:i},c)},V=function(e,t,a,n,r,c){var i=t;if(i.push(e),a(i.slice(0)),2===t.length){var s=t[0],o=t[1];c([s,o]);var u=n(),l=u[s];u[s]=u[o],u[o]=l,r(u.flatMap((function(e){return e}))),a([])}};var H=function(e){var t=e.dimensions,a=e.swapPair,n=e.setSwapPair,c=e.matrix,i=e.setMatrix,s=e.arrayToMatrix,o=e.dimmedCells,u=e.dimRows,l=t.n,m=function(e){V(e,a,n,s,i,u)};return r.a.createElement("div",{className:"matrixContainer"},r.a.createElement("div",{className:"swapButtons"},new Array(t.m).fill(0).map((function(e,t){var n=!1;return t!==a[0]&&t!==a[1]||(n=!0),r.a.createElement(P,{i:t,key:t,name:"\u27fa Row ".concat(t+1),f:m,clicked:n})}))),r.a.createElement(D,{cols:l,matrix:c,setMatrix:i,dimmedCells:o}))};var L=function(e){var t=e.heading;return r.a.createElement("div",{className:"topRowItem"},t)};var $=function(e){var t=e.cols,a=["x\u2081","x\u2082","x\u2083","x\u2084","x\u2085","x\u2086","x\u2087","x\u2088","x\u2089","d"];return r.a.createElement("div",{className:"topRow"},function(){var e=new Array(t).fill(0),n=0,c=a.length-1;return e.map((function(e){var i=n===t-1?a[c]:a[n];return n++,r.a.createElement(L,{heading:i,key:n})}))}())};a(15);var F=function(){var e={m:4,n:5},t=new Array(e.m*e.n).fill(0),a=Object(n.useContext)(S),c=Object(n.useState)(e),i=Object(l.a)(c,2),s=i[0],f=i[1],p=Object(n.useState)(""),v=Object(l.a)(p,2),x=v[0],b=v[1],h=Object(n.useState)(""),w=Object(l.a)(h,2),E=w[0],N=w[1],g=Object(n.useState)(new Array(e.m*e.n).fill(0).map((function(e){return Math.floor(21*Math.random()-10)}))),M=Object(l.a)(g,2),j=M[0],O=M[1],y=Object(n.useState)([]),R=Object(l.a)(y,2),k=R[0],C=R[1],I=Object(n.useState)([]),T=Object(l.a)(I,2),A=T[0],D=T[1],P=function(){N(""),b(""),f(e),O(t),C([]),a.resetHistory({matrix:t,dimensions:e})},V=function(e){a.addState({matrix:j,dimensions:s}),O(e)},L=function(){for(var e=[],t=s.n,a=0;a<j.length;a+=t)e.push(j.slice(a,a+t));return e},F=function(){var e=Object(u.a)(o.a.mark((function e(t){var a,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=s.n,n=[],t.forEach((function(e){var t=e*a;n.push(t);for(var r=t+1;r<t+a;r++)n.push(r)})),D(n),e.next=6,m(250);case 6:D([]);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"mainContainer"},r.a.createElement(d,{setM:b,setN:N,m:x,n:E,makeArray:function(){if(P(),""!==x&&""!==E){var n=x*E;f({m:x,n:E});var r=new Array(n).fill(0);a.resetHistory({matrix:t,dimensions:e}),V(r)}},resetMatrix:P}),r.a.createElement($,{cols:s.n}),r.a.createElement(H,{dimensions:s,swapPair:k,setSwapPair:C,arrayToMatrix:L,matrix:j,setMatrix:V,dimmedCells:A,dimRows:F}),r.a.createElement(B,{rows:s.m,getMatrix:L,setMatrix:V,undoLast:function(){var e=a.undo();e?(O(e.matrix),f(e.dimensions)):P()},setDimmedCells:D,dimRows:F}))};i.a.render(r.a.createElement(T,null,r.a.createElement(F,null)),document.getElementById("root"))},9:function(e,t,a){e.exports=a(16)}},[[9,1,2]]]);
//# sourceMappingURL=main.a3cb9fc2.chunk.js.map