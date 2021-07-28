let productsInStorage = JSON.parse(localStorage.getItem("products"));
// console.log("productsInStorage", productsInStorage);


/* ------------ Cart content [o] ------------ */
const cartContent = document.querySelector("#cart");


if (productsInStorage === null) {  // displaying a message if LocalStorage is empty

    // console.log("Le panier est vide")
    const nothingInCart = document.createElement("p");
    nothingInCart.textContent = "Votre panier ne contient aucun article.";
    cartContent.appendChild(nothingInCart);
    console.log(nothingInCart);

    document.getElementById("customer-form").style.display = "none";  // hiding the form when cart is empty
    document.getElementById("customer-form").setAttribute("aria-hidden", "true");  // hiding the form from readers

} else {  // displaying the products in cart with informations stored in LocalStorage

    let allPriceSums = [];  // defining an array to get all total price for each product 
    // console.log("total", allPriceSums)

    const listOfProducts = document.createElement("div");
    listOfProducts.setAttribute("class", "cart-products d-inline-flex flex-wrap");
    cartContent.appendChild(listOfProducts);


    for (const productInStorage of productsInStorage) {  // what to do for each object of LocalStorage
        // console.log(productsInStorage.length)

        /* --- Product in cart structure --- */

        const productInCart = document.createElement("article");
        productInCart.setAttribute("class", "m-3 p-4-sm");
        listOfProducts.appendChild(productInCart);

        const productInCartTitle = document.createElement("h2");  // displaying product name
        productInCartTitle.textContent = `${productInStorage.sentProductName}`;
        productInCart.appendChild(productInCartTitle);

        const returnToProductPage = document.createElement("a");  // creating a link on the picture to go on the product page
        returnToProductPage.setAttribute("href", `product.html?id=${productInStorage.sentProductId}`);
        productInCart.appendChild(returnToProductPage);

        const productInCartImage = document.createElement("img");  // displaying product picture
        productInCartImage.setAttribute("src", productInStorage.sentProductUrl);
        productInCartImage.setAttribute("alt", `${productInStorage.sentProductName} ajouté au panier`);
        productInCartImage.setAttribute("height", 80);
        returnToProductPage.appendChild(productInCartImage);
        /*
        const productColorOption = document.createElement("p");  // displaying product color
        productColorOption.textContent = `Couleur : ${productInStorage.sentProductColor}`;
        productInCart.appendChild(productColorOption);
        */
        const productInCartQuantity = document.createElement("p");  // displaying product quantity
        productInCartQuantity.textContent = `Quantité : ${productInStorage.sentProductQuantity}`;
        productInCart.appendChild(productInCartQuantity);

        /* --- Calculating sum of price for each product regarding to its quantity [o] --- */
        sumOfProductPrice = productInStorage.sentProductPrice * productInStorage.sentProductQuantity;
        allPriceSums.push(sumOfProductPrice);
        /* --- Calculating sum of price for each product regarding to its quantity [x] --- */


        const productInCartPrice = document.createElement("p");  // displaying product price
        productInCartPrice.textContent = `Prix : ${sumOfProductPrice},00€`;
        productInCart.appendChild(productInCartPrice);

        const productInCartDelete = document.createElement("button");  // defining a button tu delete product from cart
        productInCartDelete.setAttribute("id", `delete-${productInStorage.sentProductId}`);
        productInCartDelete.setAttribute("class", "btn__delete-product");
        productInCartDelete.setAttribute("name", "delete-product");
        productInCartDelete.setAttribute("type", "button");
        productInCartDelete.textContent = "Supprimer";
        productInCart.appendChild(productInCartDelete);

        const deleteProducts = document.querySelectorAll(".btn__delete-product");
        for (const deleteProduct of deleteProducts) {  // 
            deleteProduct.addEventListener("click", (event) =>{  // what will happen on <button> click
                event.preventDefault();  // preventing normal button behavior
                const productToDelete = productInStorage.sentProductId;
                localStorage.setItem("products", JSON.stringify(productsInStorage));
                console.log("productToDelete", productToDelete);
            });
        };
        /* --- Product in cart structure [x] --- */
    }
    /*
    deleteProduct = document.querySelectorAll(".btn__delete-product");
    deleteProduct.addEventListener("click", (event) =>{  // what will happen on <button> click
        event.preventDefault();  // preventing normal button behavior
        const productToDelete = productInStorage.sentProductId;
        productInCart.filter(element => element.sentProductId !== productToDelete); ///splice
        window.alert("L'article a été retiré du panier.");
        location.reload();
    });
    */


    /* --- Calculating cart total price [o] --- */
    const totalCartPrice = allPriceSums.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue
    }, 0);
    // console.log("total", totalCartPrice);
    /* --- Calculating cart total price [x] --- */

    /* --- Displaying cart total price [o] --- */
    const cartDisplayTotal = document.createElement("div");
    cartDisplayTotal.setAttribute("id", "total-price");
    cartDisplayTotal.innerHTML = `<p><em>Prix total</em> : ${totalCartPrice},00€</p>`;
    cartContent.appendChild(cartDisplayTotal);
    /* --- Displaying cart total price [x] --- */


    /* --- Emptying cart [o] --- */
    const emptyCartButton = document.createElement("button"); // defining a <button> element to clear cart content
    emptyCartButton.setAttribute("id", "btn__empty-cart");
    emptyCartButton.setAttribute("name", "empty-cart");
    emptyCartButton.setAttribute("type", "button");
    emptyCartButton.textContent = "Vider le panier";
    cartContent.appendChild(emptyCartButton);

    emptyCart = document.querySelector("#btn__empty-cart");
    emptyCart.addEventListener("click", (event) =>{  // what will happen on <button> click
        event.preventDefault();  // preventing normal button behavior
        localStorage.clear();  // deleting all entries of LocalStorage
        window.alert("Le panier est vide.");
        location.reload();  // reloading the page
    });
    /* --- Emptying cart [x] --- */



    /* --- Cart validation [o] --- */

    
    /* --- Sending customer informations to LocalStorage [o] --- */
    confirmCart = document.querySelector("#btn__confirm-cart");
    confirmCart.addEventListener("click", (event) =>{
                
        /* --- Object model for "contact" in LocalStorage [o] --- */
        const sendingCustomerData = {  // defining an object with the user informations to send to LocalStorage
            firstName: document.querySelector("#input__first-name").value,
            lastName: document.querySelector("#input__last-name").value,
            address: document.querySelector("#input__address").value,
            city: document.querySelector("#input__city").value,
            email: document.querySelector("#input__mail").value
        };
        /* --- Object model for "contact" in LocalStorage [x] --- */

        
        /* --- Checking validity of data entered in the form [o] --- */
        
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
                console.log("selector", selector);
                document.querySelector(`#${selector}`).style.removeProperty("border-color");  // displaying visual cue on the invalid field
                return true;
            } else {
                document.querySelector(`.${selector}--error`).textContent = "Champs à corriger.";  // displaying a message next to the invalid field
                document.querySelector(`#${selector}`).style.borderColor = "red";  // displaying visual cue on the invalid field
                return false;
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
        
        /* --- Checking validity of data entered in the form [x] --- */


        /* --- Required conditions to accept customer form data --- */
        if (checkFormData(regexFirstName, "input__first-name") && checkFormData(regexLastName, "input__last-name") && checkFormData(regexAddress, "input__address") && checkFormData(regexCity, "input__city") && checkFormData(regexMail, "input__mail")) {

            event.preventDefault();
            localStorage.setItem("contact", JSON.stringify(sendingCustomerData));  // sending contact object with form data to LocalStorage
            // console.log("sendingCustomerData", sendingCustomerData);


            /* --- Defining an array with the list of products to send to server [o] --- */
            const sendingProductsList = [];
            for (const productInStorage of productsInStorage) {
                sendingProductsList.push(productInStorage.sentProductId);
            }
            console.log("sendingProductsList", sendingProductsList);
            /* --- Defining an array with the list of products to send to server [x] --- */


            /* --- Creating an object with "contact" and "products" to send with POST [o] --- */
            const dataForServer = {
                contact: sendingCustomerData,  // form content
                products: sendingProductsList  // products selected
            };
            console.log("dataForServer", dataForServer);
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
            console.log("sendingData", sendingData)
            /* --- Sending object with "contact" and "products" to server [x] --- */


            /* --- Checking server response in console and sending order informations to LocalStorage [o] --- */
            sendingData.then(async (response) => {
                try {
                    const content = await response.json();
                    console.log('response', response);
                    console.log('content', content);

                    /* --- Sending ID created by the server for the order with total price to LocalStorage [o] --- */
                    console.log("content.orderId", content.orderId);  // ID created by the server for the order

                    const orderInformations = {  // defining an object with the informations to send to cart
                        orderAmount: totalCartPrice,
                        orderId: content.orderId
                    };

                    localStorage.setItem("order", JSON.stringify(orderInformations));
                    //console.log("orderInformations", orderInformations);
                    /* --- Sending ID created by the server for the order with total price to LocalStorage [x] --- */
                    
                    /* --- Redirect to the order confirmation page [o] --- */
                    window.location = "order.html";
                    /* --- Redirect to the order confirmation page [x] --- */

                } catch (error) {
                    console.error("error", error);
                };
            })
            /* --- Checking server response in console and sending order informations to LocalStorage [x] --- */

        } else {
            // event.preventDefault();
            document.querySelector("#cart-invalid").textContent = "Tous les champs ne sont pas correctement renseignés.";  // displaying a message next to the invalid field
            // alert("Erreur dans le formulaire à corriger");
        }
        /* --- Required conditions to accept customer form data --- */
    });
    /* --- Sending customer informations to LocalStorage [x] --- */
    /* --- Cart validation [x] --- */
    /* --------- Customer informations form [x] --------- */
}   
/* ------------ Cart content [x] ------------ */