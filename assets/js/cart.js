let itemsInStorage = JSON.parse(localStorage.getItem("items"));
console.log(itemsInStorage);


/* ------------ Cart content [o] ------------ */
const cartContent = document.querySelector("#cart");


if (itemsInStorage === null) {  // displaying a message if LocalStorage is empty
    // console.log("Le panier est vide")
    const nothingInCart = document.createElement("p");
    nothingInCart.textContent = "Votre panier ne contient aucun article.";
    cartContent.appendChild(nothingInCart);
    console.log(nothingInCart)
} else {  // displaying the items in cart with informations stored in LocalStorage
    let allPriceSums = [];  // defining an array to get all total price for each item 
    // console.log("total", allPriceSums)

    for (const itemInStorage of itemsInStorage) {  // what to do for each object of LocalStorage
        // console.log(itemsInStorage.length)

        /* --- Item in cart structure --- */
        const itemInCart = document.createElement("article");
        cartContent.appendChild(itemInCart);

        const itemInCartTitle = document.createElement("h2");  // displaying item name
        itemInCartTitle.textContent = `${itemInStorage.sentItemName}`;
        itemInCart.appendChild(itemInCartTitle);

        const returnToItemPage = document.createElement("a");  // creating a link on the picture to go on the item page
        returnToItemPage.setAttribute("href", `item.html?id=${itemInStorage.sentItemId}`);
        itemInCart.appendChild(returnToItemPage);

        const itemInCartImage = document.createElement("img");  // displaying item picture
        itemInCartImage.setAttribute("src", itemInStorage.sentItemUrl);
        itemInCartImage.setAttribute("alt", `${itemInStorage.sentItemName} ajouté au panier`);
        itemInCartImage.setAttribute("height", 80);
        returnToItemPage.appendChild(itemInCartImage);

        const itemColorOption = document.createElement("p");  // displaying item quantity
        itemColorOption.textContent = `Couleur : ${itemInStorage.sentItemColor}`;
        itemInCart.appendChild(itemColorOption);

        const itemInCartQuantity = document.createElement("p");  // displaying item quantity
        itemInCartQuantity.textContent = `Quantité : ${itemInStorage.sentItemQuantity}`;
        itemInCart.appendChild(itemInCartQuantity);

        const itemInCartPrice = document.createElement("p");  // displaying item price
        itemInCartPrice.textContent = `Prix : ${itemInStorage.sentItemPrice},00€`;
        itemInCart.appendChild(itemInCartPrice);

        const itemInCartDelete = document.createElement("button");  // defining a button tu delete item from cart
        itemInCartDelete.setAttribute("class", "btn__delete-item");
        itemInCartDelete.setAttribute("name", "delete-item");
        itemInCartDelete.setAttribute("type", "button");
        itemInCartDelete.textContent = "Supprimer";
        itemInCart.appendChild(itemInCartDelete);

        const deleteItems = document.querySelectorAll(".btn__delete-item");
        for (const deleteItem of deleteItems) {  // LENGTH ????
            deleteItem.addEventListener("click", (event) =>{  // what will happen on <button> click
                event.preventDefault();  // preventing normal button behavior
                const itemToDelete = itemInStorage.sentItemId;
                console.log("itemToDelete", itemToDelete)
            });
        };
        /* --- Item in cart structure [x] --- */

        /* --- Calculating sum of price for each item regarding to its quantity [o] --- */
        sumOfItemPrice = itemInStorage.sentItemPrice // * itemInStorage.sentItemQuantity;
        allPriceSums.push(sumOfItemPrice);
        /* --- Calculating sum of price for each item regarding to its quantity [x] --- */
    }
    /*
    deleteItem = document.querySelectorAll(".btn__delete-item");
    deleteItem.addEventListener("click", (event) =>{  // what will happen on <button> click
        event.preventDefault();  // preventing normal button behavior
        const itemToDelete = itemInStorage.sentItemId;
        itemInCart.filter(element => element.sentItemId !== itemToDelete); ///splice
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
    formFirstNameLabel.innerHTML = "Prénom <b>(requis)</b> :";
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
    formLastNameLabel.innerHTML = "Nom <b>(requis)</b> :";
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
    formAdressLabel.innerHTML = "Adresse <b>(requis)</b> :";
    formAdressDiv.appendChild(formAdressLabel);

    const formAdressInput = document.createElement("textarea");
    formAdressInput.setAttribute("id", "input__adress");
    formAdressInput.setAttribute("name", "adress");
    formAdressInput.setAttribute("maxlength", 120);
    formAdressInput.setAttribute("rows", 4);
    formAdressInput.setAttribute("cols", 40);
    formAdressInput.required = true;
    formAdressDiv.appendChild(formAdressInput);
    /* Adress [x] */
    
    /* City [o] */
    const formCityDiv = document.createElement("div");
    formField.appendChild(formCityDiv);

    const formCityLabel = document.createElement("label");
    formCityLabel.setAttribute("for", "input__city");
    formCityLabel.innerHTML = "Ville <b>(requis)</b> :";
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
    formMailLabel.innerHTML = "E-mail <b>(requis)</b> :";
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

    const confirmCartButton = document.createElement("button"); // defining a <button> element to confirm cart
    confirmCartButton.setAttribute("id", "btn__confirm-cart");
    confirmCartButton.setAttribute("name", "confirm-cart");
    confirmCartButton.setAttribute("type", "submit");
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
            sentFirstName: selectCustomerFirstName,  // sending the item name
            sentLastName: selectCustomerLastName,  // sending the item picture URL
            sentAdress: selectCustomerAdress,  // sending the item price
            sentCity: selectCustomerCity,  // sending the item ID
            sentMail: selectCustomerMail  // sending the selected quantity
        };
        /* --- Object model for customer in LocalStorage [x] --- /
        
        /* --- Object model for "contact" in LocalStorage [o] --- */
        const sendingCustomerData = {  // defining an object with the informations to send to cart
            sentFirstName: document.querySelector("#input__first-name").value,  // sending the item name
            sentLastName: document.querySelector("#input__last-name").value,  // sending the item picture URL
            sentAdress: document.querySelector("#input__adress").value,  // sending the item price
            sentCity: document.querySelector("#input__city").value,  // sending the item ID
            sentMail: document.querySelector("#input__mail").value  // sending the selected quantity
        };
        // console.log("sendingCustomerData", sendingCustomerData)
        /* --- Object model for "contact" in LocalStorage [x] --- */

        
        /* --- Checking validity of data entered in the form [o] --- */

        /*
        const conditionInputs = (field) => {  // declaring a function with RegEx concerning classic <input> to use for same conditions
            return /^[a-zA-Z-]{3,30}$/.test(field);  // allowing letter from A to Z in lowercase and uppercase, from 3 characters to 30, and dash
        }
        */

        function checkFirstName() {
            const valueFirstName = sendingCustomerData.sentFirstName;
            // console.log("sendingCustomerData.sentFirstName", sendingCustomerData.sentFirstName)
            if (/^[a-zA-Z-]{3,30}$/.test(valueFirstName)) {  // "if (conditionInputs(valueFirstName))" pour appeler conditionInputs(field)
                console.log("OK");
                return true;
            } else {
                console.log("KO");
                alert("Présence de caractères non-valides = checkFirstName");
                return false;
            };
        };

        function checkLastName() {
            const valueLastName = sendingCustomerData.sentLastName;
            if (/^[a-zA-Z-\s]{3,30}$/.test(valueLastName)) {
                return true;
            } else {
                alert("Présence de caractères non-valides = checkLastName");
                return false;
            };
        };

        function checkAdress() {
            const valueAdress = sendingCustomerData.sentAdress;
            if (/^[a-zA-Z0-9.-\s]{10,300}$/.test(valueAdress)) {
                return true;
            } else {
                alert("Présence de caractères non-valides = checkAdress");
                return false;
            };
        };

        function checkCity() {
            const valueCity = sendingCustomerData.sentCity;
            if (/^[a-zA-Z-]{2,40}$/.test(valueCity)) {
                return true;
            } else {
                alert("Présence de caractères non-valides = checkCity");
                return false;
            };
        };

        function checkMail() {
            const valueMail = sendingCustomerData.sentMail;
            if (/^[a-zA-Z0-9_\.-]{3,40}@[a-zA-Z0-9-]{2,10}\.[a-zA-Z]{2,4}$/.test(valueMail)) {  // alternative ? ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$
                return true;
            } else {
                alert("Présence de caractères non-valides = checkMail");
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
            alert("Erreur dans le formulaire à corriger");
        }
        console.log("checkFirstName", checkFirstName());
        console.log("checkLastName", checkLastName());
        console.log("checkAdress", checkAdress());
        console.log("checkCity", checkCity());
        console.log("checkMail", checkMail());
        /* --- Required conditions to accept customer form data --- */


        /* --- Creating an object to send with POST [o] --- */
        const postData = {
            contact: sendingCustomerData,  // form content
            products: itemsInStorage  // items selected
        }
        // console.log("postData", postData);
        /* --- Creating an object to send with POST [x] --- */

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