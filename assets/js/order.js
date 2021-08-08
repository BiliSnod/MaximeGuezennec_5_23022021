let getOrder = JSON.parse(localStorage.getItem("order"));  // getting LocalStorage "order" object
let getProducts = JSON.parse(localStorage.getItem("products"));  // getting LocalStorage "order" object



/* ------------ Order confirmation status [o] ------------ */

/* --- Order title [o] --- */
const orderTitleMain = document.querySelector("#title");  // targeting the "title" <div> element
const orderTitle = document.createElement("h1"); // defining a <h1> element for order confirmation status
orderTitle.classList.add("text-center", "text-light");  // adding a "class" attribute for styling
orderTitleMain.appendChild(orderTitle);  // adding the element inside the "title" <div> element
/* --- Order title [x] --- */

const orderContent = document.getElementById("order");  // targeting the "order" <section> element


if (getProducts === null) {  // if existing products were not been found in LocalStorage

    orderTitle.textContent = `Votre commande Oripeluche n'a pas été passée`;  // filling the <h1> element with order status

    /* --- Displaying an error message [o] --- */
    const emptyOrder = document.createElement("p");  // defining a <p> tag to display message
    emptyOrder.innerHTML = `<a href="product.html?id=5be9c8541c9d440000665243">Norbert</a> et ses amis se sentent seuls&hellip;`;  // message to display
    emptyOrder.classList.add("m-2", "p-4", "fs-5");  // adding a "class" attribute for styling
    orderContent.appendChild(emptyOrder);  // adding the tag inside the <section> element
    /* --- Displaying an error message [x] --- */


} else {  // if an existing order has been found in LocalStorage

    orderTitle.textContent = `Votre commande Oripeluche est validée !`;  // filling the <h1> element with order status

    /* --- Getting order ID from LocalStorage [o] --- */
    const getOrderId = getOrder.orderId;
    /* --- Getting order ID from LocalStorage [x] --- */

    /* --- Getting ordered products prices from API [o] --- */
    async function getOrderAmounts(callback) {

        let allPriceSums = [];  // creating an array to store ordered products prices

        for (const getProduct of getProducts) {  // what to do for each of ordered products
            
            const getProductData = new Request(`http://localhost:3000/api/teddies/${getProduct.sentProductId}`);  // requesting ordered products data from API

            await fetch(getProductData) 
            .then(response => response.json())  // converting data
            .then(model => {

                callback = (model.price / 100);  // getting price data and calculating from cents to euros
                allPriceSums.push(callback);  // adding the sum to the array

            })
            .catch(error => console.log("error")); // if problem with request

        };
        return allPriceSums;
    };
    /* --- Getting ordered products prices from API [x] --- */

    /* --- Calculating order total price then Displaying order informations for customer [o] --- */
    const listOfPrices = getOrderAmounts("getProductPrice");  // function expression with a callback argument

    const orderDisplay = async () => {

        const orderPrices = await listOfPrices;
        const getOrderPrice = orderPrices.reduce(function (accumulator, currentValue) {  // reducing the array's values to get the sum of prices
            return accumulator + currentValue;
        }, 0);  // initial value

        const displayOrder = document.createElement("div");  // defining a <div> tag to display order informations
        displayOrder.innerHTML =   `<p class="fs-5">Merci !</p>
                                    <p>Votre commande <i>n°${getOrderId}</i> d'un montant total de <b>${getOrderPrice},00&euro;</b> a bien été enregistrée.</p>
                                    <p>Vous recevrez un mail de confirmation, et serez tenu informé du suivi de votre commande.</p>
                                    <p>À bientôt sur Orinoco !</p>`;
        displayOrder.classList.add("p-4");  // adding a "class" attribute for styling
        orderContent.appendChild(displayOrder);  // adding the tag inside the <section> element
    };

    orderDisplay();  // calling the function to display informations
    /* --- Calculating order total price then Displaying order informations for customer [x] --- */


    /* --- Keeping only useful data in LocalStorage [o] --- */
    function clearStorage() {
        JSON.parse(localStorage.removeItem("products"));
    };
    clearStorage();
    /* --- Keeping only useful data in LocalStorage [x] --- */
};

/* ------------ Order confirmation status [x] ------------ */
