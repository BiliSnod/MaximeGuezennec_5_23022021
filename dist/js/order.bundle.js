(()=>{let e=JSON.parse(localStorage.getItem("order"));const t=document.querySelector("#title"),n=document.createElement("h1");n.classList.add("text-center","text-light"),t.appendChild(n);const r=document.getElementById("order");if(null===e){n.textContent="Votre commande Oripeluche n'a pas été passée";const e=document.createElement("p");e.innerHTML='<a href="product.html?id=5be9c8541c9d440000665243">Norbert</a> et ses amis se sentent seuls&hellip;',e.classList.add("m-2","p-4","fs-5"),r.appendChild(e)}else{n.textContent="Votre commande Oripeluche est validée !";const t=e.orderId,o=e.orderAmount,d=document.createElement("div");d.innerHTML=`<p class="fs-5">Merci !</p>\n                                <p>Votre commande <i>n°${t}</i> d'un montant total de <b>${o},00&euro;</b> a bien été enregistrée.</p>\n                                <p>Vous recevrez un mail de confirmation, et serez tenu informé du suivi de votre commande.</p>\n                                <p>À bientôt sur Orinoco !</p>`,d.classList.add("p-4"),r.appendChild(d),localStorage.clear()}})();