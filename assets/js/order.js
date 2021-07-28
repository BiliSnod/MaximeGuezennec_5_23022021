/*
fetch(`http://localhost:3000/api/teddies/order`)
.then(result => result.json())
.then(order => {
    const orderResult = document.getElementById("order");

    console.log(order)

    const orderId = document.createElement("div");
    orderId.textContent = `Votre commande numero ${order.orderId} a été enregistrée !`;
    orderId.appendChild(orderResult);
})
*/

let getOrder = JSON.parse(localStorage.getItem("order"));
console.log("order", JSON.parse(localStorage.getItem("order")));


/* ------------ Order confirmation content [o] ------------ */
const orderContent = document.getElementById("order");

/* --- Order title [o] --- */
const orderTitleMain = document.querySelector("#title");
const orderTitle = document.createElement("h1"); // defining a <h1> element for the product
orderTitle.classList.add("text-center", "text-light");  // adding class attribute (styling)
orderTitleMain.appendChild(orderTitle);  // adding the title inside the <article> element
/* --- Order title [x] --- */


if (getOrder === null) {  // if an existing order has not been found in LocalStorage

    orderTitle.textContent = `Votre commande Oripeluche n'a pas été passée`;  // filling the <h1> element with the product name

    const emptyOrder = document.createElement("p");
    emptyOrder.innerHTML = `<a href="product.html?id=5be9c8541c9d440000665243">Norbert</a> et ses amis se sentent seuls&hellip;`;
    orderContent.appendChild(emptyOrder);
    console.log(nothingInCart);

} else {  // an existing order has been found in LocalStorage

    orderTitle.textContent = `Votre commande Oripeluche est validée !`;  // filling the <h1> element with the product name

    /* Getting the order ID from LocalStorage [o] */
    const getOrderId = getOrder.orderId;
    console.log("getOrderId", getOrderId);
    /* Getting the order ID from LocalStorage [x] */

    /* Getting the order total price from LocalStorage [x] */
    const getOrderAmount = getOrder.orderAmount;
    console.log("getOrderAmount", getOrderAmount);
    /* Getting the order total price from LocalStorage [x] */


    /* Displaying order information for customer [o] */
    const orderResult = document.getElementById("order");

    const displayOrder = document.createElement("div");
    displayOrder.innerHTML =   `<p>Merci !</p>
                                <p>Votre commande <i>n°${getOrderId}</i> d'un montant total de <b>${getOrderAmount},00&euro;</b> a bien été enregistrée.</p>
                                <p>Vous recevrez un mail de confirmation, et serez tenu informé du suivi de votre commande.</p>
                                <p>À bientôt sur Orinoco !</p>`;
    orderResult.appendChild(displayOrder);
    /* Displaying order information for customer [x] */
}

/* ------------ Order confirmation content [o] ------------ */