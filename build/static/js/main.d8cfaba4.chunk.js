(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{15:function(t,e,n){t.exports=n(38)},37:function(t,e,n){},38:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),o=n(14),c=n.n(o),u=n(4),i=n(2),l=n(3),m=n.n(l),f=function(){return m.a.get("/api/notes").then((function(t){return t.data}))},s=function(t){return m.a.post("/api/notes",t).then((function(t){return t.data}))},p=function(t,e){return m.a.put("".concat("/api/notes","/").concat(t),e).then((function(t){return t.data}))},d=function(t){var e=t.note,n=t.toggleImportance,a=e.important?"make not important":"make important";return r.a.createElement("li",{class:"note"},e.content,r.a.createElement("button",{onClick:n},a))},b=function(t){var e=t.message;return null===e?null:r.a.createElement("div",{className:"error"},e)},h=function(){var t=Object(a.useState)([]),e=Object(i.a)(t,2),n=e[0],o=e[1],c=Object(a.useState)(""),l=Object(i.a)(c,2),m=l[0],h=l[1],v=Object(a.useState)(!0),E=Object(i.a)(v,2),g=E[0],O=E[1],j=Object(a.useState)("some error happened..."),k=Object(i.a)(j,2),S=k[0],w=k[1];Object(a.useEffect)((function(){f().then((function(t){o(t)}))}),[]);var y=g?n:n.filter((function(t){return!0===t.important}));return r.a.createElement("div",null,r.a.createElement("h1",null,"Notes"),r.a.createElement(b,{message:S}),r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){return O(!g)}},"show ",g?"important":"all")),r.a.createElement("ul",null,y.map((function(t){return r.a.createElement(d,{key:t.id,note:t,toggleImportance:function(){!function(t){var e=n.find((function(e){return e.id===t})),a=Object(u.a)(Object(u.a)({},e),{},{important:!e.important});p(t,a).then((function(e){o(n.map((function(n){return n.id!==t?n:e})))})).catch((function(a){w("Note '".concat(e.content,"' was already removed from server")),setTimeout((function(){w(null)}),5e3),o(n.filter((function(e){return e.id!==t})))}))}(t.id)}})}))),r.a.createElement("form",{onSubmit:function(t){t.preventDefault();var e={content:m,date:(new Date).toISOString(),important:Math.random()<.5,id:n.length+1};s(e).then((function(t){o(n.concat(t)),h("")}))}},r.a.createElement("input",{onChange:function(t){h(t.target.value)},value:m}),r.a.createElement("button",{type:"submit"},"save")))};n(37);c.a.render(r.a.createElement(h,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.d8cfaba4.chunk.js.map