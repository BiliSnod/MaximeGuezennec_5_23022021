let getOrder = JSON.parse(localStorage.getItem("order"));  // getting LocalStorage "order" object



/* ------------ Order confirmation status [o] ------------ */

/* --- Order title [o] --- */
const orderTitleMain = document.querySelector("#title");  // targeting the "title" <div> element
const orderTitle = document.createElement("h1"); // defining a <h1> element for order confirmation status
orderTitle.classList.add("text-center", "text-light");  // adding a "class" attribute for styling
orderTitleMain.appendChild(orderTitle);  // adding the element inside the "title" <div> element
/* --- Order title [x] --- */

const orderContent = document.getElementById("order");  // targeting the "order" <section> element


if (getOrder === null) {  // if an existing order has not been found in LocalStorage

    orderTitle.textContent = `Votre commande Oripeluche n'a pas été passée`;  // filling the <h1> element with order status

    /* --- Displaying an error message [o] --- */
    const emptyOrder = document.createElement("p");  // defining a <p> tag to display message
    emptyOrder.innerHTML = `<a href="product.html?id=5be9c8541c9d440000665243">Norbert</a> et ses amis se sentent seuls&hellip;`;  // message to display
    emptyOrder.classList.add("m-2", "p-4", "fs-5");  // adding a "class" attribute for styling
    orderContent.appendChild(emptyOrder);  // adding the tag inside the <section> element
    /* --- Displaying an error message [x] --- */


} else {  // if an existing order has been found in LocalStorage

    orderTitle.textContent = `Votre commande Oripeluche est validée !`;  // filling the <h1> element with order status

    /* --- Getting the order ID from LocalStorage [o] --- */
    const getOrderId = getOrder.orderId;
    /* --- Getting the order ID from LocalStorage [x] --- */

    /* --- Getting the order total price from LocalStorage [o] --- */
    const getOrderAmount = getOrder.orderAmount;
    /* --- Getting the order total price from LocalStorage [x] --- */

    /* --- Displaying order informations for customer [o] --- */
    const displayOrder = document.createElement("div");  // defining a <div> tag to display order informations
    displayOrder.innerHTML =   `<p class="fs-5">Merci !</p>
                                <p>Votre commande <i>n°${getOrderId}</i> d'un montant total de <b>${getOrderAmount},00&euro;</b> a bien été enregistrée.</p>
                                <p>Vous recevrez un mail de confirmation, et serez tenu informé du suivi de votre commande.</p>
                                <p>À bientôt sur Orinoco !</p>`;
    displayOrder.classList.add("p-4");  // adding a "class" attribute for styling
    orderContent.appendChild(displayOrder);  // adding the tag inside the <section> element
    /* --- Displaying order informations for customer [x] --- */


    /* --- Emptying LocalStorage [o] --- */
    function clearStorage() {
        localStorage.clear();
    };
    clearStorage();
    /* --- Emptying LocalStorage [x] --- */
};

/* ------------ Order confirmation status [x] ------------ */
