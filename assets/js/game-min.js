const myModule=(()=>{"use strict";let e=[];const s=["C","D","H","S"],a=["A","J","Q","K"];let t=[],l=0,d=0;const i={showClass:{popup:"animate__animated animate__fadeInDown animate__faster"},hideClass:{popup:"animate__animated animate__fadeOutUp animate__faster"}},n=document.querySelector("#btnPull"),o=(document.querySelector("#btnNew"),document.querySelector("#btnStop")),r=document.querySelectorAll(".divCards"),c=document.querySelectorAll("small"),u=()=>{e=[];for(let a=2;a<=10;a++)for(let t of s)e.push(a+t);for(let t of s)for(let s of a)e.push(s+t);return _.shuffle(e)},m=()=>{if(0===e.length)throw"No hay cartas";return e.pop()},h=(e,s)=>{const a=document.createElement("img");a.src=`./assets/cards/${e}.png`,a.classList.add("game-card"),a.classList.add("animate__animated"),a.classList.add("animate__backInRight"),a.classList.add("animate__faster"),r[s].append(a)},f=(e,s)=>(t[s]=t[s]+(e=>{const s=e.substring(0,e.length-1);return isNaN(s)?"A"===s?11:10:1*s})(e),c[s].innerText=t[s],t[s]),p=e=>{const s=t.length-1;do{const a=m();if(d=f(a,s),h(a,s),e>21)break}while(d<=e&&d<21);w(e,d)},w=(e,s)=>{setTimeout(()=>{const{showClass:a,hideClass:t}=i;e<=21?s<21&&e>s||s>21?Swal.fire({title:"Has ganado",showClass:a,hideClass:t}):s===e?Swal.fire({title:"Empate",showClass:a,hideClass:t}):Swal.fire({title:"Has perdido",showClass:a,hideClass:t}):Swal.fire({title:"Has perdido",showClass:a,hideClass:t})},500)};return n.addEventListener("click",()=>{const e=m();l=f(e,0),h(e,0),l>21?(n.disabled=!0,o.disabled=!0,p(l)):21===l&&(n.disabled=!0,o.disabled=!0,p(l))}),o.addEventListener("click",()=>{n.disabled=!0,o.disabled=!0,p(l)}),{newGame:(s=2)=>{e=u(),t=[];for(let e=0;e<s;e++)t.push(0),c[e].innerText=0,r[e].innerHTML="";n.disabled=!1,o.disabled=!1}}})();