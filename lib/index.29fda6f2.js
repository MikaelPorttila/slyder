function loadData(){fetch("/api/data").then((e=>e.json())).then((e=>{console.log(e),document.querySelector("#Main").innerHTML=e.reduce(((e,a)=>e+`<p>${a}</p>`),"")}))}loadData();
//# sourceMappingURL=index.29fda6f2.js.map
