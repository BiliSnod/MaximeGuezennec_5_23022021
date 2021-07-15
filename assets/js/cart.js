let itemsInStorage = JSON.parse(localStorage.getItem("items"));
console.log(itemsInStorage);


/* --- Cart content --- */
const cartContent = document.querySelector("#cart");


if (itemsInStorage === null) {  // displaying a message if LocalStorage is empty
    // console.log("Le panier est vide")
    const nothingInCart = document.createElement("p");
    nothingInCart.textContent = "Votre panier ne contient aucun article.";
    cartContent.appendChild(nothingInCart);
    console.log(nothingInCart)
} else {  // displaying the items in cart with informations stored in LocalStorage
    let allPriceSums = [];  // defining an array to get all total price for each item 
    console.log("total", allPriceSums)

    for (const itemInStorage of itemsInStorage) {  // what to do for each object of LocalStorage
        // console.log(itemsInStorage.length)

        /* --- Item in cart structure --- */
        const itemInCart = document.createElement("article");
        cartContent.appendChild(itemInCart);

        const itemInCartTitle = document.createElement("h2");
        itemInCartTitle.textContent = `${itemInStorage.sentItemName}`;
        itemInCart.appendChild(itemInCartTitle);

        const returnToItemPage = document.createElement("a");
        returnToItemPage.setAttribute("href", `item.html?id=${itemInStorage.sentItemId}`);
        itemInCart.appendChild(returnToItemPage);

        const itemInCartImage = document.createElement("img");
        itemInCartImage.setAttribute("src", itemInStorage.sentItemUrl);
        itemInCartImage.setAttribute("alt", `${itemInStorage.sentItemName} ajouté au panier`);
        itemInCartImage.setAttribute("height", 80);
        returnToItemPage.appendChild(itemInCartImage);

        const itemInCartQuantity = document.createElement("p");
        itemInCartQuantity.textContent = `Quantité : ${itemInStorage.sentItemQuantity}`;
        itemInCart.appendChild(itemInCartQuantity);

        const itemInCartPrice = document.createElement("p");
        itemInCartPrice.textContent = `Prix : ${itemInStorage.sentItemPrice},00€`;
        itemInCart.appendChild(itemInCartPrice);

        const itemInCartDelete = document.createElement("button");
        itemInCartDelete.setAttribute("class", "btn__delete-item");
        itemInCartDelete.setAttribute("name", "delete-item"); 
        itemInCartDelete.setAttribute("type", "button");
        itemInCartDelete.textContent = "Supprimer";
        itemInCart.appendChild(itemInCartDelete);
        /*
        deleteItem = document.querySelector(".btn__delete-item");
        deleteItem.addEventListener("click", (event) =>{  // what will happen on <button> click
            event.preventDefault();  // preventing normal button behavior
            const itemToDelete = itemInStorage.sentItemId;
            itemInCart.filter(element => element.sentItemId !== itemToDelete); ///splice
            window.alert("L'article a été retiré du panier.");
            location.reload();
        });
        */
        /* ------ */

        /* --- Calculating sum of price for each item regarding its quantity --- */
        sumOfItemPrice = itemInStorage.sentItemPrice // * itemInStorage.sentItemQuantity;
        allPriceSums.push(sumOfItemPrice);
        /* ------ */
    }
    /* --- Calculating cart total price --- */
    const totalCartPrice = allPriceSums.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue
    }, 0);
    // console.log("total", totalCartPrice)
    /* ------ */  

    /* --- Displaying cart total price --- */
    const cartTotalPrice = document.createElement("div");
    cartTotalPrice.setAttribute("id", "total-price");
    cartTotalPrice.innerHTML = `<p><em>Prix total</em> : ${totalCartPrice},00€</p>`;
    cartContent.appendChild(cartTotalPrice);
    /* ------ */

    /* --- Emptying cart --- */
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
    /* ------ */






    /* --- Customer informations form --- */
    const customerForm = document.querySelector("#customer-form");

    const formContainer = document.createElement("form");
    formContainer.setAttribute("action", "");  // to fill
    formContainer.setAttribute("method", "POST");  // to fill
    customerForm.appendChild(formContainer);

    const formField = document.createElement("fieldset");
    formContainer.appendChild(formField);

    const formLegend = document.createElement("legend");
    formLegend.textContent = "Pour commander, merci de compléter ce formulaire.";
    formField.appendChild(formLegend);

    /* First Name */
    const formFirstNameDiv = document.createElement("div");
    formField.appendChild(formFirstNameDiv);

    const formFirstNameLabel = document.createElement("label");
    formFirstNameLabel.setAttribute("for", "input__first-name");
    formFirstNameLabel.textContent = "Prénom :";
    formFirstNameDiv.appendChild(formFirstNameLabel);

    const formFirstNameInput = document.createElement("input");
    formFirstNameInput.setAttribute("type", "text");
    formFirstNameInput.setAttribute("id", "input__first-name");
    formFirstNameInput.setAttribute("name", "first-name");
    formFirstNameInput.required = true;
    formFirstNameDiv.appendChild(formFirstNameInput);
    /* ------ */

    /* Last Name */
    const formLastNameDiv = document.createElement("div");
    formField.appendChild(formLastNameDiv);

    const formLastNameLabel = document.createElement("label");
    formLastNameLabel.setAttribute("for", "input__last-name");
    formLastNameLabel.textContent = "Nom :";
    formLastNameDiv.appendChild(formLastNameLabel);

    const formLastNameInput = document.createElement("input");
    formLastNameInput.setAttribute("type", "text");
    formLastNameInput.setAttribute("id", "input__last-name");
    formLastNameInput.setAttribute("name", "last-name");
    formFirstNameInput.required = true;
    formLastNameDiv.appendChild(formLastNameInput);
    /* ------ */

    /* Adress */
    const formAdressDiv = document.createElement("div");
    formField.appendChild(formAdressDiv);

    const formAdressLabel = document.createElement("label");
    formAdressLabel.setAttribute("for", "input__adress");
    formAdressLabel.textContent = "Adresse :";
    formAdressDiv.appendChild(formAdressLabel);

    const formAdressInput = document.createElement("input");
    formAdressInput.setAttribute("type", "text");
    formAdressInput.setAttribute("id", "input__adress");
    formAdressInput.setAttribute("name", "adress");
    formFirstNameInput.required = true;
    formAdressDiv.appendChild(formAdressInput);
    /* ------ */

    /* City */
    const formCityDiv = document.createElement("div");
    formField.appendChild(formCityDiv);

    const formCityLabel = document.createElement("label");
    formCityLabel.setAttribute("for", "input__city");
    formCityLabel.textContent = "Ville :";
    formCityDiv.appendChild(formCityLabel);

    const formCityInput = document.createElement("input");
    formCityInput.setAttribute("type", "text");
    formCityInput.setAttribute("id", "input__city");
    formCityInput.setAttribute("name", "city");
    formFirstNameInput.required = true;
    formCityDiv.appendChild(formCityInput);
    /* ------ */

    /* Mail */
    const formMailDiv = document.createElement("div");
    formField.appendChild(formMailDiv);

    const formMailLabel = document.createElement("label");
    formMailLabel.setAttribute("for", "input__mail");
    formMailLabel.textContent = "E-mail :";
    formMailDiv.appendChild(formMailLabel);

    const formMailInput = document.createElement("input");
    formMailInput.setAttribute("type", "email");
    formMailInput.setAttribute("id", "input__mail");
    formMailInput.setAttribute("name", "mail");
    formFirstNameInput.required = true;
    formMailDiv.appendChild(formMailInput);
    /* ------ */
}   
