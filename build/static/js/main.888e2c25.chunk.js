(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,n,t){e.exports=t(39)},19:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(0),u=t.n(a),l=t(11),r=t.n(l),c=(t(19),t(12)),i=t(2),o=function(e){return u.a.createElement("form",null,u.a.createElement("div",null,"nimi: ",u.a.createElement("input",{value:e.name,onChange:e.nameOnChange})),u.a.createElement("div",null,"numero: ",u.a.createElement("input",{value:e.number,onChange:e.numberOnChange})),u.a.createElement("div",null,u.a.createElement("button",{type:"submit",onClick:e.onClick},"lis\xe4\xe4")))},m=function(e){return u.a.createElement("div",null,"Rajaa n\xe4ytett\xe4vi\xe4: ",u.a.createElement("input",{value:e.value,onChange:e.onChange}))},s=function(e){return u.a.createElement("p",null,e.name," - ",e.number," - ",u.a.createElement("button",{onClick:function(){e.deleteCall(e.id)}},"Poista"))},f=function(e){return e.persons.filter(function(n){return n.name.toLowerCase().includes(e.filter.toLowerCase())}).map(function(n){return u.a.createElement(s,{name:n.name,number:n.number,key:n.id,id:n.id,deleteCall:e.deleteCall})})},d=t(3),b=t.n(d),E="/api/persons",v=function(){return b.a.get(E)},h=function(e){return b.a.post(E,e)},p=function(e){return b.a.delete(E+"/".concat(e))},C=function(e){return b.a.put(E+"/".concat(e.id),e)},O=function(e){var n=e.message,t=e.className;return null===n?null:u.a.createElement("div",{className:t},n)},g=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],l=n[1],r=Object(a.useState)(""),s=Object(i.a)(r,2),d=s[0],b=s[1],E=Object(a.useState)(""),g=Object(i.a)(E,2),j=g[0],k=g[1],w=Object(a.useState)(""),S=Object(i.a)(w,2),N=S[0],P=S[1],y=Object(a.useState)(null),L=Object(i.a)(y,2),T=L[0],J=L[1],x=Object(a.useState)(null),B=Object(i.a)(x,2),D=B[0],H=B[1];Object(a.useEffect)(function(){v().then(function(e){l(e.data)})},[]);return u.a.createElement("div",null,u.a.createElement("h2",null,"Puhelinluettelo"),u.a.createElement(O,{message:T,className:"info"}),u.a.createElement(O,{message:D,className:"error"}),u.a.createElement(m,{value:N,onChange:function(e){return P(e.target.value)}}),u.a.createElement("h2",null,"Lis\xe4\xe4 uusi"),u.a.createElement(o,{name:d,number:j,nameOnChange:function(e){return b(e.target.value)},numberOnChange:function(e){return k(e.target.value)},onClick:function(e){if(e.preventDefault(),t.some(function(e){return e.name===d})){var n=Object(c.a)({},t.filter(function(e){return e.name===d})[0],{name:d,number:j}),a=n.id;window.confirm("".concat(n.name," on jo luettelossa, korvataanko vanha numero uudella?"))&&C(n).then(function(e){l(t.map(function(n){return n.id===a?e.data:n})),b(""),k(""),J("P\xe4ivitettiin henkil\xf6n ".concat(n.name," puhelinnumero")),setTimeout(function(){J(null)},3e3)}).catch(function(e){l(t.filter(function(e){return e.id!==a})),H("Henkil\xf6 ".concat(n.name," oli jo poistettu")),setTimeout(function(){H(null)},3e3)})}else h({name:d,number:j}).then(function(e){l(t.concat(e.data)),b(""),k(""),J("Lis\xe4ttiin ".concat(e.data.name)),setTimeout(function(){J(null)},3e3)})}}),u.a.createElement("h2",null,"Numerot"),u.a.createElement(f,{persons:t,filter:N,deleteCall:function(e){var n=t.filter(function(n){return n.id===e})[0];window.confirm("Poistetaanko ".concat(n.name,"?"))&&p(e).then(function(a){l(t.filter(function(n){return n.id!==e})),J("Poistettiin henkil\xf6 ".concat(n.name)),setTimeout(function(){J(null)},3e3)})}}))};r.a.render(u.a.createElement(g,null),document.getElementById("root"))}},[[13,1,2]]]);
//# sourceMappingURL=main.888e2c25.chunk.js.map