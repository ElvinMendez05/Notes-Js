(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const m of n.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&d(m)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}})();const L=`<section class="todoapp"></section>\r
    <header class="header">\r
        <h1>Notas Js</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
             <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
             <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li>  -->\r
        </ul>\r
    </section>  \r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <a class="filtro" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
 </section>\r
\r
\r
<!-- <footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <!-- <p>Creado por <a href="http://todomvc.com">Elvin Mendez</a></p> -->\r
    <!-- <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p> -->\r
</footer> \r
\r
`;var s=[];for(var T=0;T<256;++T)s.push((T+256).toString(16).slice(1));function S(e,t=0){return(s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]).toLowerCase()}var b,E=new Uint8Array(16);function A(){if(!b&&(b=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!b))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return b(E)}var P=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);const v={randomUUID:P};function k(e,t,a){if(v.randomUUID&&!t&&!e)return v.randomUUID();e=e||{};var d=e.random||(e.rng||A)();return d[6]=d[6]&15|64,d[8]=d[8]&63|128,S(d)}class w{constructor(t){this.id=k(),this.description=t,this.done=!1,this.createAt=new Date}}const c={All:"all",Completed:"Completed",Pending:"Pending"},l={todos:[new w("Formula one 05"),new w("Lebron james is the current king in nba"),new w("Stephen curry is the best player in nba")],filter:c.All},I=()=>{C(),console.log("initStore 😎")},C=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=c.All}=JSON.parse(localStorage.getItem("state"));l.todos=e,l.filter=t},g=()=>{localStorage.setItem("state",JSON.stringify(l))},U=(e=c.All)=>{switch(e){case c.All:return[...l.todos];case c.Completed:return l.todos.filter(t=>t.done);case c.Pending:return l.todos.filter(t=>!t.done);default:throw Error(`Opcion ${e} is not valid`)}},x=e=>{if(!e)throw"Description is required";l.todos.push(new w(e)),g()},D=e=>{l.todos=l.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),g()},F=e=>{l.todos=l.todos.filter(t=>t.id!==e),g()},M=()=>{l.todos=l.todos.filter(e=>!e.done),g()},O=(e=c.All)=>{l.filter=e,g()},q=()=>l.filter,i={initStore:I,loadStore:C,addTodo:x,toggleTodo:D,deleteTodo:F,deleteComplete:M,setFilter:O,getCurrentFilter:q,getTodos:U},N=e=>{if(!e)throw new Error("A TODO objects is required");const{done:t,description:a,id:d}=e,o=`
      <div class="view">
        <input class="toggle" type="checkbox" ${t?"checked":""}>
        <label>${a}</label>
        <button class="destroy"></button>
          </div>
       <input class="edit" value="Create a To3doMVC template">
       `,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",d),e.done&&n.classList.add("completed"),n};let h;const H=(e,t=[])=>{if(h||(h=document.querySelector(e)),!h)throw new Error(`Element ${e} not found`);h.innerHTML="",t.forEach(a=>{h.append(N(a))})};let y;const V=e=>{if(y||(y=document.querySelector(e)),!y)throw new Error(`Element ${e} not found`);y.innerHTML=i.getTodos(c.Pending).length},p={TodoList:".todo-list",NewTodoInput:"#new-todo-input",btnCompeleted:".clear-completed",TodoFilters:".filtro",PendingCount:"#pending-count"},R=e=>{const t=()=>{const r=i.getTodos(i.getCurrentFilter());H(p.TodoList,r),a()},a=()=>{V(p.PendingCount)};(()=>{const r=document.createElement("div");r.innerHTML=L,document.querySelector(e).append(r),t()})();const d=document.querySelector(p.NewTodoInput),o=document.querySelector(p.TodoList),n=document.querySelector(p.btnCompeleted),m=document.querySelectorAll(p.TodoFilters);d.addEventListener("keyup",r=>{r.keyCode===13&&r.target.value.trim().length!==0&&(i.addTodo(r.target.value),r.target.value="",t())}),o.addEventListener("click",r=>{const u=r.target.closest("[data-id]");i.toggleTodo(u.getAttribute("data-id")),t()}),o.addEventListener("click",r=>{const u=r.target.className==="destroy",f=r.target.closest("[data-id]");!f||!u||(i.deleteTodo(f.getAttribute("data-id")),t())}),n.addEventListener("click",r=>{const u=r.target.closest(p.btnCompeleted);i.deleteComplete(u.getAttribute(p.btnCompeleted)),t()}),m.forEach(r=>{r.addEventListener("click",u=>{switch(m.forEach(f=>f.classList.remove("selected")),u.target.classList.add("selected"),u.target.text){case"Todo":i.setFilter(c.All);break;case"Pendientes":i.setFilter(c.pending);break;case"Completados":i.setFilter(c.Completed)}t()})})};i.initStore();R("#app");
