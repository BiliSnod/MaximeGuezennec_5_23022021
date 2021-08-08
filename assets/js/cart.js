let productsInStorage = JSON.parse(localStorage.getItem("products"));  // getting LocalStorage "products" object



/* ------------ Cart content [o] ------------ */

const cartContent = document.querySelector("#cart");  // targeting the "cart" <section> element


if (productsInStorage === null) {  // displaying a message if LocalStorage is empty

    const nothingInCart = document.createElement("p");  // creating a <p> tag to display message
    nothingInCart.textContent = "Votre panier ne contient aucun article.";  // message to display
    nothingInCart.classList.add("m-2", "p-4", "fs-5");  // adding a "class" attribute for styling
    cartContent.appendChild(nothingInCart);  // adding the element inside the "cart" <section> element

    document.getElementById("customer-form").style.display = "none";  // hiding the form when cart is empty
    document.getElementById("customer-form").setAttribute("aria-hidden", "true");  // hiding the form from readers


} else {  // displaying the products in cart with informations stored in LocalStorage

    const listOfProducts = document.createElement("div");  // creating a <div> tag to display the products in cart
    listOfProducts.classList.add("d-flex", "flex-wrap");  // adding a "class" attribute for styling
    cartContent.appendChild(listOfProducts);  // adding the tag inside the "cart" <section> element


    /* ------ Products in cart structure [o] ------ */

    productsInStorage.forEach(productInStorage => {  // what to do for each object of LocalStorage "products" array

        const productInCart = document.createElement("article");  //
        productInCart.classList.add("mx-auto", "m-3", "p-2", "border", "rounded-3", "bg-body", "text-center");  // adding a "class" attribute for styling
        listOfProducts.appendChild(productInCart);  // adding the element inside the <div> with all products in cart

        const productInCartTitle = document.createElement("h2");  // displaying product name in a <h2> element
        productInCartTitle.textContent = `${productInStorage.sentProductName}`;  // filling the title with the name of the product in LocalStorage
        productInCart.appendChild(productInCartTitle);  // adding the element in the <article>

        const returnToProductPage = document.createElement("a");  // creating a link on the picture to go on the product page
        returnToProductPage.setAttribute("href", `product.html?id=${productInStorage.sentProductId}`);  // defining the URL with the ID in of the product in LocalStorage
        productInCart.appendChild(returnToProductPage);  // adding the element in the <article>

        const productInCartImage = document.createElement("img");  // displaying product picture
        productInCartImage.setAttribute("src", productInStorage.sentProductUrl);  // defining the "src" attribute with the image URL of the product in LocalStorage
        productInCartImage.setAttribute("alt", `${productInStorage.sentProductName} ajouté au panier`);  // defining the "alt" attribute
        productInCartImage.classList.add("img-thumbnail", "image-mid-height");  // adding a "class" attribute for styling
        returnToProductPage.appendChild(productInCartImage);  // adding the element in the link

        const productVariationOption = document.createElement("p");  // displaying product variation
        productVariationOption.innerHTML = `Couleur : <b>${productInStorage.sentProductVariation}</b>`;  // displaying the variation with value for the product in LocalStorage
        productInCart.appendChild(productVariationOption);  // adding the element in the <article>

        const productInCartQuantity = document.createElement("p");  // displaying product quantity
        productInCartQuantity.innerHTML = `Quantité : <b>${productInStorage.sentProductQuantity}</b>`;  // displaying quantity with value for the product in LocalStorage
        productInCart.appendChild(productInCartQuantity);  // adding the element in the <article>

        const productInCartPrice = document.createElement("p");  // displaying product price...        
        const getProductInfo = new Request(`http://localhost:3000/api/teddies/${productInStorage.sentProductId}`);
        fetch(getProductInfo)
        .then(response => response.json())  // converting data
        .then(model => {
            // console.log("model", model);
            const getProductPrice = (model.price / 100);
            productInCartPrice.innerHTML = `Prix : <b><i class="product-price">${getProductPrice},00&euro;</i></b>`; // displaying product price in euros
        })
        .catch(error => productInCartPrice.innerHTML = ""); // if problem with request
        productInCartPrice.setAttribute("class", "product-price");  // defining the "src" attribute with the image URL of the product in LocalStorage
        productInCart.appendChild(productInCartPrice);  // adding the element in the <article>


        /* --- Deleting a product [o] --- */
        const productInCartDelete = document.createElement("button");  // creating a button element to delete product from cart
        productInCartDelete.setAttribute("class", "btn__delete-product");  // defining a class for the button
        productInCartDelete.setAttribute("name", "delete-product");  // defining the name of the button
        productInCartDelete.setAttribute("type", "button");  // defining the type of the button
        productInCartDelete.textContent = "Supprimer";  // filling button's text
        productInCartDelete.classList.add("btn", "btn-success", "fw-bold");  // adding a "class" attribute for styling
        productInCart.appendChild(productInCartDelete);  // adding the element in the <article>

        const productToDelete = productsInStorage.indexOf(productInStorage);  // determining the position of the product in LocalStorage's "products" array

        productInCartDelete.addEventListener("click", (event) =>{  // what is happening when a <button> clicked
            const deleteProduct = productsInStorage.splice(productToDelete, 1);  // deleting the product in LocalStorage's "products" array
            localStorage.setItem("products", JSON.stringify(productsInStorage));  // updating LocalStorage
            if (productsInStorage.length === 0) {  // if LocalStorage's "products" array is empty
                localStorage.removeItem("products");  // remove LocalStorage's "products" array to avoid displaying an empty product
            };
            location.reload();  // reload the page to update positions in LocalStorage's "products" array
        });
        /* --- Deleting a product [x] --- */

    });

    /* ------ Products in cart structure [x] ------ */


    /* ------ Cart total price [o] ------ */
    
    /* --- Getting price for each product from the API [o] --- */
    async function getCartAmounts(callback) {

        let allPriceSums = [];  // creating an array to store products in cart prices

        for (const productInStorage of productsInStorage) {  // what to do for each of products in cart
            
            const productInStorageData = new Request(`http://localhost:3000/api/teddies/${productInStorage.sentProductId}`);  // requesting products in cart data from API
            // console.log("productInStorageData", productInStorageData);

            await fetch(productInStorageData)
            .then(response => response.json())  // converting data
            .then(model => {

                callback = (model.price / 100);
                // console.log("callback", callback);
                allPriceSums.push(callback);  // adding the sum to the array
                // console.log("allPriceSums Y", allPriceSums);
            })
            .catch(error => console.log("error")); // if problem with request

        };
        console.log("allPriceSums X", allPriceSums);
        return allPriceSums;
    };
    /* --- Getting price for each product from the API [x] --- */

    /* --- Calculating then displaying cart total price [o] --- */
    const listOfPrices = getCartAmounts("getProductPrice");  // function expression with a callback argument
    // console.log("listOfPrices", listOfPrices);

    const displayCartPrice = async () => {
        const orderPrices = await listOfPrices;
        // console.log("array", array);
        const totalCartPrice = orderPrices.reduce(function (accumulator, currentValue) {  // reducing the array's values to get the sum of prices
            // console.log('currentValue.price', currentValue);
            return accumulator + currentValue;
        }, 0);  // initial value
        // console.log('getOrderPrice', getOrderPrice);

        const cartDisplayTotal = document.createElement("div"); // creating a <div> tag
        cartDisplayTotal.setAttribute("id", "total-price");  // defining an ID for cart total price
        cartDisplayTotal.innerHTML = `<p><em>Prix total</em> : ${totalCartPrice},00€</p>`;  // filling the tag with the price in euros
        cartDisplayTotal.classList.add("fs-1", "text-center");  // adding a "class" attribute for styling
        cartContent.appendChild(cartDisplayTotal);  // adding the tag inside the "cart" <section> element
    };
    // console.log("sumOfPrices()", sumOfPrices());

    displayCartPrice();  // calling the function to display cart total price
    /* --- Calculating then displaying cart total price [x] --- */

    /* ------ Cart total price [x] ------ */


    /* --- Emptying cart [o] --- */
    const emptyCartDiv = document.createElement("div"); // creating a <div> tag
    emptyCartDiv.classList.add("m-4", "text-center");  // adding a "class" attribute for styling
    cartContent.appendChild(emptyCartDiv);  // adding the button inside the <div> for cart total price

    const emptyCartButton = document.createElement("button"); // creating a <button> element to clear cart content
    emptyCartButton.setAttribute("id", "btn__empty-cart");  // defining an ID for the button
    emptyCartButton.setAttribute("name", "empty-cart");  // defining a "name" attribute for the button
    emptyCartButton.setAttribute("type", "button");  // defining at "type" attribute for the button
    emptyCartButton.textContent = "Supprimer tous les articles";  // filling the button with text
    emptyCartButton.classList.add("btn", "btn-success", "btn-lg", "fw-bold");  // adding a "class" attribute for styling
    emptyCartDiv.appendChild(emptyCartButton);  // adding the button inside the <div> for cart total price

    const emptyCart = document.querySelector("#btn__empty-cart");  // targeting the button to empty the cart
    emptyCart.addEventListener("click", (event) =>{  // what will happen on <button> click
        localStorage.clear();  // deleting all entries of LocalStorage
        window.alert("Le panier est désormais vide.");  // displaying an alert box
        location.reload();  // reloading the page
    });
    /* --- Emptying cart [x] --- */



    /* --------- Cart and customer form validation [o] --------- */

    confirmCart = document.querySelector("#btn__confirm-cart");
    confirmCart.addEventListener("click", (event) =>{

        event.preventDefault();  // disabling default behavior of "submit" button


        /* --- Object model for "contact" in LocalStorage [o] --- */
        const sendingCustomerData = {  // defining an object with the user informations to send to LocalStorage (values entered in each input of the form)
            firstName: document.querySelector("#input__first-name").value,
            lastName: document.querySelector("#input__last-name").value,
            address: document.querySelector("#input__address").value,
            city: document.querySelector("#input__city").value,
            email: document.querySelector("#input__mail").value
        };
        /* --- Object model for "contact" in LocalStorage [x] --- */


        /* ------ Checking validity of data entered in the form [o] ------ */

        /* --- Conditions for validation of each field [o] --- */
        const regexFirstName = /^[a-zA-Z-]{2,36}$/.test(sendingCustomerData.firstName);
        const regexLastName = /^[a-zA-Z\.-\s]{2,36}$/.test(sendingCustomerData.lastName);
        const regexAddress = /^[a-zA-Z0-9\.-\s]{8,240}$/.test(sendingCustomerData.address);
        const regexCity = /^[a-zA-Z\.-\s]{2,50}$/.test(sendingCustomerData.city);
        const regexMail = /^[a-zA-Z0-9_\.-]{3,40}@[a-zA-Z0-9-]{2,10}\.[a-zA-Z]{2,4}$/.test(sendingCustomerData.email);
        /* --- Conditions for validation of each field [x] --- */

        /* --- Declaring a function to display a message and visual cue if there is error(s) in a field [o] --- */
        function checkFormData(condition, selector) {
            if (condition) {
                document.querySelector(`.${selector}--error`).textContent = "";  // hiding the message next to the field when it is valid
                document.querySelector(`#${selector}`).style.removeProperty("background-color");  // displaying visual cue on the invalid field
            } else {
                document.querySelector(`.${selector}--error`).textContent = "Champs à corriger.";  // displaying a message next to the invalid field
                document.querySelector(`#${selector}`).style.backgroundColor = "#d98531";  // displaying visual cue on the invalid field
            };
        };
        /* --- Declaring a function to display a message and visual cue if there is error(s) in a field [x] --- */

        /* --- Calling the function for each field [o] --- */
        checkFormData(regexFirstName, "input__first-name");
        checkFormData(regexLastName, "input__last-name");
        checkFormData(regexAddress, "input__address");
        checkFormData(regexCity, "input__city");
        checkFormData(regexMail, "input__mail");
        /* --- Calling the function for each field [x] --- */

        /* ------ Checking validity of data entered in the form [x] ------ */


        /* ------ Required conditions to accept customer form data [o] ------ */
        if (regexFirstName && regexLastName && regexAddress && regexCity && regexMail) {
            
            localStorage.setItem("contact", JSON.stringify(sendingCustomerData));  // sending "contact" object with form data to LocalStorage


            /* --- Defining an array with the list of products to send to server [o] --- */
            const sendingProductsList = [];
            for (const productInStorage of productsInStorage) {
                sendingProductsList.push(productInStorage.sentProductId);
            };
            /* --- Defining an array with the list of products to send to server [x] --- */


            /* --- Creating an object with "contact" and "products" to send with POST [o] --- */
            const dataForServer = {
                contact: sendingCustomerData,  // including form content
                products: sendingProductsList  // including products selected
            };
            /* --- Creating an object to send with POST [x] --- */

            /* --- Sending object with "contact" and "products" to server [o] --- */
            const sendingData = fetch("http://localhost:3000/api/teddies/order", {
                method: "POST",
                headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
                body: JSON.stringify(dataForServer)
            });
            /* --- Sending object with "contact" and "products" to server [x] --- */


            /* --- Checking server response in console and sending order informations to LocalStorage [o] --- */
            sendingData.then(async (response) => {
                try {

                    const content = await response.json();
                    console.log('content', content);  // response from the server

                    /* --- Sending ID created by the server for the order to LocalStorage [o] --- */
                    console.log("content.orderId", content.orderId);  // ID created by the server for the order
                    const orderInformations = {  // defining an object with the informations to send to cart
                        orderId: content.orderId
                    };
                    localStorage.setItem("order", JSON.stringify(orderInformations));  // sending the object to LocalStorage
                    /* --- Sending ID created by the server for the order to LocalStorage [x] --- */

                    /* --- Redirect to the order confirmation page [o] --- */
                    // window.location = "order.html";
                    /* --- Redirect to the order confirmation page [x] --- */

                } catch (error) {
                    console.error("error", error);
                };
            })
            /* --- Checking server response in console and sending order informations to LocalStorage [x] --- */


        } else {

            document.querySelector("#cart-invalid").textContent = "Tous les champs ne sont pas correctement renseignés.";  // displaying a message on top of the button

        };
        /* ------ Required conditions to accept customer form data [x] ------ */

    });

    /* --------- Cart and customer form validation [x] --------- */


};

/* ------------ Cart content [x] ------------ */
