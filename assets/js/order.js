let getOrder = JSON.parse(localStorage.getItem("order"));
 console.log("order", JSON.parse(localStorage.getItem("order")));


/* ------------ Order confirmation status [o] ------------ */
const orderContent = document.getElementById("order");

/* --- Order title [o] --- */
const orderTitleMain = document.querySelector("#title");
const orderTitle = document.createElement("h1"); // defining a <h1> element for order confirmation status
orderTitle.classList.add("text-center", "text-light");  // adding class attribute (styling)
orderTitleMain.appendChild(orderTitle);
/* --- Order title [x] --- */


if (getOrder === null) {  // if an existing order has not been found in LocalStorage

    orderTitle.textContent = `Votre commande Oripeluche n'a pas été passée`;  // filling the <h1> element with order status

    /* --- Displaying an error message [o] --- */
    const emptyOrder = document.createElement("p");
    emptyOrder.innerHTML = `<a href="product.html?id=5be9c8541c9d440000665243">Norbert</a> et ses amis se sentent seuls&hellip;`;                     
    emptyOrder.classList.add("p-4", "fs-5");  // adding class attribute (styling)
    orderContent.appendChild(emptyOrder);
    /* --- Displaying an error message [x] --- */

} else {  // an existing order has been found in LocalStorage

    orderTitle.textContent = `Votre commande Oripeluche est validée !`;  // filling the <h1> element with order status

    /* --- Getting the order ID from LocalStorage [o] --- */
    const getOrderId = getOrder.orderId;
    console.log("getOrderId", getOrderId);
    /* --- Getting the order ID from LocalStorage [x] --- */

    /* --- Getting the order total price from LocalStorage [o] --- */
    const getOrderAmount = getOrder.orderAmount;
    console.log("getOrderAmount", getOrderAmount);
    /* --- Getting the order total price from LocalStorage [x] --- */

    /* --- Displaying order informations for customer [o] --- */
    const orderResult = document.getElementById("order");

    const displayOrder = document.createElement("div");
    displayOrder.innerHTML =   `<p class="fs-5">Merci !</p>
                                <p>Votre commande <i>n°${getOrderId}</i> d'un montant total de <b>${getOrderAmount},00&euro;</b> a bien été enregistrée.</p>
                                <p>Vous recevrez un mail de confirmation, et serez tenu informé du suivi de votre commande.</p>
                                <p>À bientôt sur Orinoco !</p>`;                                
    displayOrder.classList.add("p-4");  // adding class attribute (styling)
    orderResult.appendChild(displayOrder);
    /* --- Displaying order informations for customer [x] --- */


    /* --- Emptying LocalStorage [o] --- */
    function clearStorage() {
        localStorage.clear();
    }
    clearStorage();
        /* --- Emptying LocalStorage [x] --- */
}

/* ------------ Order confirmation status [x] ------------ */