(this["webpackJsonpreact-hook-animate-number-example"]=this["webpackJsonpreact-hook-animate-number-example"]||[]).push([[0],{11:function(e,t,n){"use strict";n.r(t);n(5);var r=n(1),a=n.n(r),s=n(4),i=n.n(s),c=n(2);function u(){return u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u.apply(this,arguments)}var l={easeInOutCubic:function(e){return e>=1?1:e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2},easeOutCirc:function(e){return e>=1?1:Math.sqrt(1-Math.pow(e-1,2))},easeOutQuint:function(e){return e>=1?1:1-Math.pow(1-e,5)},easeOutExpo:function(e){return 1===e?1:1-Math.pow(2,-10*e)}},o=function(e){var t=e.number,n=void 0===t?0:t,a=e.durationInMs,s=void 0===a?4e3:a,i=e.decimalPlaces,c=void 0===i?0:i,o=e.easingFunctionName,b=void 0===o?"easeOutExpo":o,m=e.setInitialValue,d=void 0!==m&&m,x=(Object(r.useState)(0),Object(r.useState)(d?n:0),Object(r.useState)(0),Object(r.useState)(0),Object(r.useState)({currentNumber:0,originalNumber:d?n:0,step:0,isGoingUp:!1,isAnimating:!1})),j=x[0],p=x[1],f=Object(r.useRef)(),g=Object(r.useRef)(!0),O=Object(r.useRef)(),h=Object(r.useCallback)((function(e){if(g.current){if(void 0===O.current)return O.current=e,void(f.current=requestAnimationFrame(h));var t=function(){p({currentNumber:n,originalNumber:n,step:0,isGoingUp:!1,isAnimating:!1}),O.current=void 0,f.current&&cancelAnimationFrame(f.current),f.current=void 0};if("number"!==typeof n)try{n=parseFloat(n)}catch(m){return console.error("useAnimateNumber: number is not a number"),void t()}if(n!==j.currentNumber){var r=e-O.current;if(r>=s)t();else{var a=l.easeOutExpo;b&&l[b]&&(a=l[b]);var i=a(r/s),o=i*n;p((function(e){var t=n>e.originalNumber;return t||(o=(1-i)*e.originalNumber+n),0!==o&&(o=parseFloat(o.toFixed(c))),t&&o>n&&(o=n),!t&&o<n&&(o=n),u({},e,{currentNumber:o,isGoingUp:t,isAnimating:!0})})),f.current=window.requestAnimationFrame(h)}}else t()}}),[n,s,c,b]);return Object(r.useEffect)((function(){return f.current=window.requestAnimationFrame(h),function(){f.current&&cancelAnimationFrame(f.current)}}),[n]),{number:j.currentNumber,isGoingUp:j.isGoingUp,isAnimating:j.isAnimating}},b=n(0),m=function(){var e=a.a.useState(382),t=Object(c.a)(e,2),n=t[0],r=t[1],s=a.a.useState(4e3),i=Object(c.a)(s,2),u=i[0],l=i[1],m=a.a.useState(382),d=Object(c.a)(m,2),x=d[0],j=d[1],p=a.a.useState(4e3),f=Object(c.a)(p,2),g=f[0],O=f[1],h=o({number:n,durationInMs:u,debug:!0});return Object(b.jsxs)("div",{className:"min-h-screen flex flex-col justify-center items-center",children:[Object(b.jsx)("h1",{className:"text-6xl font-extrabold mb-12",children:"Animated number"}),Object(b.jsxs)("div",{className:"max-w-4xl w-full flex flex-col md:flex-row items-center justify-center gap-12",children:[Object(b.jsxs)("div",{className:"flex-1 flex flex-col gap-4",children:[Object(b.jsx)("div",{className:"text-6xl font-extrabold ".concat(h.isAnimating?h.isGoingUp?"bg-red-500":"bg-green-500":"bg-slate-300 dark:bg-slate-700"," rounded-xl text-center py-4 w-full"),children:h.number}),Object(b.jsxs)("p",{className:"flex flex-row gap-2 flex-wrap",children:[Object(b.jsxs)("span",{className:"bg-slate-50 dark:bg-slate-700 rounded-lg px-2",children:["To: ",n]}),Object(b.jsxs)("span",{className:"bg-slate-50 dark:bg-slate-700 rounded-lg px-2",children:["Duration: ",u]}),Object(b.jsxs)("span",{className:"bg-slate-50 dark:bg-slate-700 rounded-lg px-2",children:["Is animating: ",h.isAnimating?"true":"false"]}),Object(b.jsxs)("span",{className:"bg-slate-50 dark:bg-slate-700 rounded-lg px-2",children:["Is going up: ",h.isGoingUp?"true":"false"]})]}),Object(b.jsx)("button",{onClick:function(e){e.preventDefault();var t=Math.floor(1e3*Math.random())+1;j(t),r(t),l(g)},className:"bg-blue-500 text-2xl px-8 py-2 rounded-lg mt-8",children:"Random number"})]}),Object(b.jsx)("form",{onSubmit:function(e){e.preventDefault(),r(x),l(g)},className:"flex-1",children:Object(b.jsxs)("div",{className:"flex flex-col gap-4",children:[Object(b.jsxs)("div",{children:[Object(b.jsx)("strong",{children:"Number:"}),Object(b.jsx)("input",{type:"number",className:"block rounded-lg w-full p-2 text-slate-800",placeholder:"Enter a number...",value:x,onChange:function(e){return j(e.target.value)}})]}),Object(b.jsxs)("div",{children:[Object(b.jsx)("strong",{children:"Animation duration (ms):"}),Object(b.jsx)("input",{type:"number",className:"block rounded-lg w-full p-2 text-slate-800",placeholder:"Enter a number...",value:g,onChange:function(e){return O(e.target.value)}})]}),Object(b.jsx)("button",{className:"bg-blue-500 text-2xl px-8 py-2 rounded-lg w-full",type:"submit",children:"Launch"})]})})]})]})};i.a.render(Object(b.jsx)(b.Fragment,{children:Object(b.jsx)(m,{})}),document.getElementById("root"))},5:function(e,t,n){}},[[11,1,2]]]);
//# sourceMappingURL=main.7692d979.chunk.js.map