let productsInStorage = JSON.parse(localStorage.getItem("products"));
console.log(productsInStorage);


/* ------------ Cart content [o] ------------ */
const cartContent = document.querySelector("#cart");


if (productsInStorage === null) {  // displaying a message if LocalStorage is empty
    // console.log("Le panier est vide")
    const nothingInCart = document.createElement("p");
    nothingInCart.textContent = "Votre panier ne contient aucun article.";
    cartContent.appendChild(nothingInCart);
    console.log(nothingInCart)
} else {  // displaying the products in cart with informations stored in LocalStorage
    let allPriceSums = [];  // defining an array to get all total price for each product 
    // console.log("total", allPriceSums)

    for (const productInStorage of productsInStorage) {  // what to do for each object of LocalStorage
        // console.log(productsInStorage.length)

        /* --- Product in cart structure --- */
        const productInCart = document.createElement("article");
        cartContent.appendChild(productInCart);

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

        const productColorOption = document.createElement("p");  // displaying product quantity
        productColorOption.textContent = `Couleur : ${productInStorage.sentProductColor}`;
        productInCart.appendChild(productColorOption);

        const productInCartQuantity = document.createElement("p");  // displaying product quantity
        productInCartQuantity.textContent = `Quantité : ${productInStorage.sentProductQuantity}`;
        productInCart.appendChild(productInCartQuantity);

        const productInCartPrice = document.createElement("p");  // displaying product price
        productInCartPrice.textContent = `Prix : ${productInStorage.sentProductPrice},00€`;
        productInCart.appendChild(productInCartPrice);

        const productInCartDelete = document.createElement("button");  // defining a button tu delete product from cart
        productInCartDelete.setAttribute("class", "btn__delete-product");
        productInCartDelete.setAttribute("name", "delete-product");
        productInCartDelete.setAttribute("type", "button");
        productInCartDelete.textContent = "Supprimer";
        productInCart.appendChild(productInCartDelete);

        const deleteProducts = document.querySelectorAll(".btn__delete-product");
        for (const deleteProduct of deleteProducts) {  // LENGTH ????
            deleteProduct.addEventListener("click", (event) =>{  // what will happen on <button> click
                event.preventDefault();  // preventing normal button behavior
                const productToDelete = productInStorage.sentProductId;
                console.log("productToDelete", productToDelete)
            });
        };
        /* --- Product in cart structure [x] --- */

        /* --- Calculating sum of price for each product regarding to its quantity [o] --- */
        sumOfProductPrice = productInStorage.sentProductPrice  // * productInStorage.sentProductQuantity;
        allPriceSums.push(sumOfProductPrice);
        /* --- Calculating sum of price for each product regarding to its quantity [x] --- */
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
    // console.log("total", totalCartPrice)
    /* --- Calculating cart total price [x] --- */


    /* --- Displaying cart total price [o] --- */
    const cartTotalPrice = document.createElement("div");
    cartTotalPrice.setAttribute("id", "total-price");
    cartTotalPrice.innerHTML = `<p><em>Prix total</em> : ${totalCartPrice},00€</p>`;
    cartContent.appendChild(cartTotalPrice);
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
        location.reload();  // another way [ window.location.href = "cart.html"; ]
    });
    /* --- Emptying cart [x] --- */






    /* --------- Customer informations form [o] --------- */
    const customerForm = document.querySelector("#customer-form");

    const formContainer = document.createElement("form");
    // formContainer.setAttribute("action", "");  // to fill ?
    // formContainer.setAttribute("method", "POST");  // ???
    customerForm.appendChild(formContainer);

    const formField = document.createElement("fieldset");
    formContainer.appendChild(formField);

    const formLegend = document.createElement("legend");
    formLegend.textContent = "Pour commander, merci de compléter ce formulaire.";
    formField.appendChild(formLegend);

    /* First Name [o] */
    const formFirstNameDiv = document.createElement("div");
    formField.appendChild(formFirstNameDiv);

    const formFirstNameLabel = document.createElement("label");
    formFirstNameLabel.setAttribute("for", "input__first-name");
    formFirstNameLabel.innerHTML = "Prénom <b>(requis)</b> <span class=\"input__first-name--error\"></span> :";
    formFirstNameDiv.appendChild(formFirstNameLabel);

    const formFirstNameInput = document.createElement("input");
    formFirstNameInput.setAttribute("type", "text");
    formFirstNameInput.setAttribute("id", "input__first-name");
    formFirstNameInput.setAttribute("name", "first-name");
    formFirstNameInput.setAttribute("maxlength", 60);
    formFirstNameInput.required = true;
    formFirstNameDiv.appendChild(formFirstNameInput);
    /* First Name [x] */

    /* Last Name [o] */
    const formLastNameDiv = document.createElement("div");
    formField.appendChild(formLastNameDiv);

    const formLastNameLabel = document.createElement("label");
    formLastNameLabel.setAttribute("for", "input__last-name");
    formLastNameLabel.innerHTML = "Nom <b>(requis)</b> <span class=\"input__last-name--error\"></span> :";
    formLastNameDiv.appendChild(formLastNameLabel);

    const formLastNameInput = document.createElement("input");
    formLastNameInput.setAttribute("type", "text");
    formLastNameInput.setAttribute("id", "input__last-name");
    formLastNameInput.setAttribute("name", "last-name");
    formLastNameInput.setAttribute("maxlength", 60);
    formLastNameInput.required = true;
    formLastNameDiv.appendChild(formLastNameInput);
    /* Last Name [x] */

    /* Adress [o] */
    const formAdressDiv = document.createElement("div");
    formField.appendChild(formAdressDiv);

    const formAdressLabel = document.createElement("label");
    formAdressLabel.setAttribute("for", "input__adress");
    formAdressLabel.innerHTML = "Adresse <b>(requis)</b> <span class=\"input__adress--error\"></span> :";
    formAdressDiv.appendChild(formAdressLabel);

    const formAdressInput = document.createElement("input");
    formAdressInput.setAttribute("type", "text");
    formAdressInput.setAttribute("id", "input__adress");
    formAdressInput.setAttribute("name", "adress");
    formAdressInput.setAttribute("maxlength", 120);
    formAdressInput.required = true;
    formAdressDiv.appendChild(formAdressInput);
    /* Adress [x] */
    
    /* City [o] */
    const formCityDiv = document.createElement("div");
    formField.appendChild(formCityDiv);

    const formCityLabel = document.createElement("label");
    formCityLabel.setAttribute("for", "input__city");
    formCityLabel.innerHTML = "Ville <b>(requis)</b> <span class=\"input__city--error\"></span> :";
    formCityDiv.appendChild(formCityLabel);

    const formCityInput = document.createElement("input");
    formCityInput.setAttribute("type", "text");
    formCityInput.setAttribute("id", "input__city");
    formCityInput.setAttribute("name", "city");
    formCityInput.setAttribute("maxlength", 60);
    formCityInput.required = true;
    formCityDiv.appendChild(formCityInput);
    /* City [x] */

    /* Mail [o] */
    const formMailDiv = document.createElement("div");
    formField.appendChild(formMailDiv);

    const formMailLabel = document.createElement("label");
    formMailLabel.setAttribute("for", "input__mail");
    formMailLabel.innerHTML = "E-mail <b>(requis)</b> <span class=\"input__mail--error\"></span> :";
    formMailDiv.appendChild(formMailLabel);

    const formMailInput = document.createElement("input");
    formMailInput.setAttribute("type", "email");
    formMailInput.setAttribute("id", "input__mail");
    formMailInput.setAttribute("name", "mail");
    formCityInput.setAttribute("maxlength", 120);
    formMailInput.required = true;
    formMailDiv.appendChild(formMailInput);
    /* Mail [x] */


    /* --- Cart validation [o] --- */
    const confirmCartDiv = document.createElement("div");
    formField.appendChild(confirmCartDiv);

    const problemCartButton = document.createElement("p"); // defining a <button> element to confirm cart
    problemCartButton.setAttribute("id", "cart-invalid");
    confirmCartDiv.appendChild(problemCartButton);

    const confirmCartButton = document.createElement("button"); // defining a <button> element to confirm cart
    confirmCartButton.setAttribute("id", "btn__confirm-cart");
    confirmCartButton.setAttribute("name", "confirm-cart");
    confirmCartButton.setAttribute("type", "submit");
    // confirmCartButton.disabled = true;  // disabling the button by default
    confirmCartButton.textContent = "Valider mon panier";
    confirmCartDiv.appendChild(confirmCartButton);

    
    /* --- Sending customer informations to LocalStorage [o] --- */
    confirmCart = document.querySelector("#btn__confirm-cart");
    confirmCart.addEventListener("click", (event) =>{

        /* --- Getting the fields values [o] --- /
        const selectCustomerFirstName = document.querySelector("#input__first-name").value;
        const selectCustomerLastName = document.querySelector("#input__last-name").value;
        const selectCustomerAdress = document.querySelector("#input__adress").value;
        const selectCustomerCity = document.querySelector("#input__city").value;
        const selectCustomerMail = document.querySelector("#input__mail").value;
        /* --- Getting the fields values [x] --- /

        /* --- Object model for customer in LocalStorage [o] --- /
        const sendingCustomerData = {  // defining an object with the informations to send to cart
            firstName: selectCustomerFirstName,  // sending the product name
            lastName: selectCustomerLastName,  // sending the product picture URL
            adress: selectCustomerAdress,  // sending the product price
            city: selectCustomerCity,  // sending the product ID
            email: selectCustomerMail  // sending the selected quantity
        };
        /* --- Object model for customer in LocalStorage [x] --- */
        
        /* --- Object model for "contact" in LocalStorage [o] --- */
        const sendingCustomerData = {  // defining an object with the informations to send to cart
            firstName: document.querySelector("#input__first-name").value,  // sending the product name
            lastName: document.querySelector("#input__last-name").value,  // sending the product picture URL
            adress: document.querySelector("#input__adress").value,  // sending the product price
            city: document.querySelector("#input__city").value,  // sending the product ID
            email: document.querySelector("#input__mail").value  // sending the selected quantity
        };
        // console.log("sendingCustomerData", sendingCustomerData)
        /* --- Object model for "contact" in LocalStorage [x] --- */

        
        /* --- Checking validity of data entered in the form [o] --- */

        /*
        const conditionInputs = (field) => {  // declaring a function with RegEx concerning classic <input> to use for same conditions
            return /^[a-zA-Z-]{2,36}$/.test(field);  // allowing letter from A to Z in lowercase and uppercase, from 2 characters to 36 ; and dash
        }
        */

        /* Declaring function to display a message if there is error(s) in a field [o] / 
        function displayError(value) {  // value will be the node where the message is attached
            const displayErrorMessage = document.createElement("p");
            displayErrorMessage.textContent = "Champs mal renseigné";
            value.appendChild(displayErrorMessage);  // i.e. "value" is "formFirstNameDiv"
        }
        / Declaring function to display a message if there is error(s) in a field [x] */

        function checkFirstName() {
            const valueFirstName = sendingCustomerData.firstName;
            // console.log("sendingCustomerData.firstName", sendingCustomerData.firstName)
            if (/^[a-zA-Z-]{2,36}$/.test(valueFirstName)) {  // "if (conditionInputs(valueFirstName))" to call conditionInputs(field)
                // console.log("OK");
                document.querySelector(".input__first-name--error").textContent = "";  // hiding the message next to the field when it is valid
                document.querySelector("#input__first-name").style.removeProperty("border-color");  // displaying visual cue on the invalid field
                return true;
            } else {
                // console.log("KO");
                // displayError(formFirstNameDiv);
                // console.log("displayError(formFirstNameDiv)", displayError(formFirstNameDiv))
                document.querySelector(".input__first-name--error").textContent = "Ce prénom n'est pas valide.";  // displaying a message next to the invalid field
                document.querySelector("#input__first-name").style.borderColor = "red";  // displaying visual cue on the invalid field
                // alert("Présence de caractères non-valides = checkFirstName");
                return false;
            };
        };

        function checkLastName() {
            const valueLastName = sendingCustomerData.lastName;
            if (/^[a-zA-Z\.-\s]{2,36}$/.test(valueLastName)) {  // allowing letter from A to Z in lowercase and uppercase, from 3 characters to 36 ; point, dash and space
                document.querySelector(".input__last-name--error").textContent = "";  // hiding the message next to the field when it is valid
                document.querySelector("#input__last-name").style.removeProperty("border-color");  // displaying visual cue on the invalid field
                return true;
            } else {
                document.querySelector(".input__last-name--error").textContent = "Ce nom n'est pas valide.";  // displaying a message next to the invalid field
                document.querySelector("#input__last-name").style.borderColor = "red";  // displaying visual cue on the invalid field
                // alert("Présence de caractères non-valides = checkLastName");
                return false;
            };
        };

        function checkAdress() {
            const valueAdress = sendingCustomerData.adress;
            if (/^[a-zA-Z0-9\.-\s]{8,240}$/.test(valueAdress)) {  // allowing letter from A to Z in lowercase and uppercase, from 8 characters to 240 ; numbers, dash, point and space
                document.querySelector(".input__adress--error").textContent = "";  // hiding the message next to the field when it is valid
                document.querySelector("#input__adress").style.removeProperty("border-color");  // displaying visual cue on the invalid field
                return true;
            } else {
                document.querySelector(".input__adress--error").textContent = "Ce format d'adresse est incorrect.";  // displaying a message next to the invalid field
                document.querySelector("#input__adress").style.borderColor = "red";  // displaying visual cue on the invalid field
                // alert("Présence de caractères non-valides = checkAdress");
                return false;
            };
        };

        function checkCity() {
            const valueCity = sendingCustomerData.city;
            if (/^[a-zA-Z\.-\s]{2,50}$/.test(valueCity)) {  // allowing letter from A to Z in lowercase and uppercase, from 2 characters to 50 ; point, dash and space
                document.querySelector(".input__city--error").textContent = "";  // hiding the message next to the field when it is valid
                document.querySelector("#input__city").style.removeProperty("border-color");  // displaying visual cue on the invalid field
                return true;
            } else {
                document.querySelector(".input__city--error").textContent = "Veuillez saisir une adresse email valide.";  // displaying a message next to the invalid field
                document.querySelector("#input__city").style.borderColor = "red";  // displaying visual cue on the invalid field
                // alert("Présence de caractères non-valides = checkMail");
                return false;
            };
        };

        function checkMail() {
            const valueMail = sendingCustomerData.email;
            if (/^[a-zA-Z0-9_\.-]{3,40}@[a-zA-Z0-9-]{2,10}\.[a-zA-Z]{2,4}$/.test(valueMail)) {  // alternative ? ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$
                document.querySelector(".input__mail--error").textContent = "";  // hiding the message next to the field when it is valid
                document.querySelector("#input__mail").style.removeProperty("border-color");  // displaying visual cue on the invalid field
                return true;
            } else {
                document.querySelector(".input__mail--error").textContent = "Veuillez saisir une adresse email valide.";  // displaying a message next to the invalid field
                document.querySelector("#input__mail").style.borderColor = "red";  // displaying visual cue on the invalid field
                // alert("Présence de caractères non-valides = checkMail");
                return false;
            };
        };



        /* --- Checking validity of data entered in the form [x] --- */


        //let customerInStorage = JSON.parse(localStorage.getItem("contact"));  // retrieve object from data in LocalStorage (parsed from JSON to JS)
        // console.log("document.querySelector(...).value", document.querySelector("#input__first-name").value);

        /* --- Required conditions to accept customer form data --- */
        if (checkFirstName() && checkLastName() && checkAdress() && checkCity() && checkMail()) {
            event.preventDefault();
            localStorage.setItem("contact", JSON.stringify(sendingCustomerData));
            console.log("sendingCustomerData", sendingCustomerData);
        } else {
            event.preventDefault();
            document.querySelector("#cart-invalid").textContent = "Tous les champs ne sont pas correctement renseignés.";  // displaying a message next to the invalid field
            // alert("Erreur dans le formulaire à corriger");
        }
        console.log("checkFirstName", checkFirstName());
        console.log("checkLastName", checkLastName());
        console.log("checkAdress", checkAdress());
        console.log("checkCity", checkCity());
        console.log("checkMail", checkMail());
        /* --- Required conditions to accept customer form data --- */


        /* --- Creating an object with "contact" and "products" to send with POST [o] --- */
        const dataForServer = {
            contact: sendingCustomerData,  // form content
            products: productsInStorage  // products selected
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












        /*

        const addCustomerLocalStorage = () => {
            customerInStorage.push(sendingCustomerData);  // adding the "contact" object in the array destined to LocalStorage
            localStorage.setItem("contact", JSON.stringify(customerInStorage));  // sending the informations in "contact" key of LocalStorage, converting JS to JSON
        }
        */



        /*
        const cartValidation = () => {
            -----------------
        };
        */

        /* --- Checking "customer" data in LocalStorage [o] --- /
        if (customerInStorage) {  // defining what to do when there is existing data in LocalStorage
            // console.log("Customer in storage", customerInStorage)
            customerInStorage.length = 0;  // delete existing objects in LocalStorage "customer" array (search other solution ?)
            addCustomerLocalStorage();
            // cartValidation();
        } else {  // defining what to do when LocalStorage is empty
            customerInStorage = [];  // creating an empty array to store informations to send
            addCustomerLocalStorage();
            // cartValidation();
        }
        / --- Checking "customer" data in LocalStorage [x] --- */
    });
    /* --- Sending customer informations to LocalStorage [x] --- */
    /* --- Cart validation [x] --- */
    /* --------- Customer informations form [x] --------- */
}   
/* ------------ Cart content [x] ------------ */