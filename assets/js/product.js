/* --------- Targeting the needed parameter [o] --------- */
let params = new URLSearchParams(document.location.search);  // searching a parameter in the active page URL
let productId = params.get("id");  // getting the value of the "id" parameter in URL
/* --------- Targeting the parameter to use [o] --------- */



/* --------- Getting the API's data for the product matching the parameter [o] --------- */
fetch(`http://localhost:3000/api/teddies/${productId}`)
    .then(response => response.json())  // converting data


    /* --------- Displaying the model matching the parameter for this type of product (teddies) [o] --------- */
    .then(model => {  // elements to display on page for the chosen model

        /* --- Product title [o] --- */
        if (model.name !== undefined) {  // preventing display of "undefined" in titles for a non-existent productId
            document.title = `Commandez ${model.name} - Ours en peluche faits à la main - Oripeluche par Orinoco`;  // setting a dynamic page title

            const modelTitleMain = document.querySelector("h1");  // targeting the <h1> element
            modelTitleMain.textContent = `Commandez ${model.name}, parmi nos peluches faites-main`;  // filling the <h1> element with the product name
        };
        /* --- Product title [x] --- */


        const element = document.getElementById("product");  // targeting the "product" <section> element

        const modelProduct = document.createElement("article");  // defining an <article> element for the product
        modelProduct.classList.add("d-md-flex", "flex-row", "m-2", "p-1", "p-sm-3", "border", "border-5", "rounded-3", "bg-light", "bg-gradient");  // adding a "class" attribute for styling
        element.appendChild(modelProduct);  // adding the <article> element inside the "product" <section>


        /* --- Product description [o] --- */
        const modelFigureDiv = document.createElement("div");  // defining a <div> element for each product description
        modelFigureDiv.classList.add("col-md-8");  // adding a "class" attribute for styling
        modelProduct.appendChild(modelFigureDiv);  // adding the tag inside the <article> element

        const modelFigure = document.createElement("figure");
        modelFigureDiv.appendChild(modelFigure);  // adding the figure inside the <div> element

        const modelUrl = document.createElement("img");  // defining an <img> element for each product
        modelUrl.setAttribute("src", model.imageUrl);  // filling the "src" attribute with the image URL
        modelUrl.setAttribute("alt", `Peluche ${model.name}`);  // filling the alt attribute with a description
        modelUrl.classList.add("lead", "img-fluid", "p-3", "mb-3", "border", "border-2", "rounded", "bg-body");  // adding a "class" attribute for styling
        modelFigure.appendChild(modelUrl);  // adding the image inside the <figure> element

        const modelDescription = document.createElement("figcaption");  // defining an <figcaption> element for the product
        modelDescription.textContent = model.description;  // filling the <figcaption> element with the description text
        modelDescription.classList.add("lead", "p-2", "fw-normal");  // adding a "class" attribute for styling
        modelFigure.appendChild(modelDescription);  // adding the <figcaption> in the <figure> element
        /* --- Product description [x] --- */


        /* --- Product customisation [o] --- */
        const modelCustomDiv = document.createElement("div");  // defining a <div> element for each product customisation
        modelCustomDiv.classList.add("col-md-4", "p-3", "text-center");  // adding a "class" attribute for styling
        modelProduct.appendChild(modelCustomDiv);  // adding the tag inside the <article> element

        const modelVariationLabel = document.createElement("label");  // defining a <label> element linked to variation <select>
        modelVariationLabel.setAttribute("for", "select-variation");  // setting the attribute linking the variation <label> with the variation <select>
        modelVariationLabel.textContent = "Couleur :";  // filling the <label> element with a description
        modelVariationLabel.classList.add("p-2", "fw-bold");  // adding a "class" attribute for styling
        modelCustomDiv.appendChild(modelVariationLabel);  // adding the label inside the <div> element

        const modelVariationSelect = document.createElement("select");  // defining a <select> element to choose between product variations
        modelVariationSelect.setAttribute("id", "select-variation");  // setting an ID for the <select> element
        modelVariationSelect.setAttribute("name", "select-variation");  // setting a name attribute for the <select> element
        modelVariationSelect.classList.add("form-select", "form-select-lg", "mb-4");  // adding a "class" attribute for styling
        modelCustomDiv.appendChild(modelVariationSelect);  // adding the label inside the <div> element

        const variations = model.colors;  // getting the values of the variations
        for (const variation of variations) {  // defining a loop iterating "variations"
            const modelVariationOption = document.createElement("option");  // defining an <option> element for each variation
            modelVariationOption.setAttribute("value", variation);  // filling the value attribute with the variation
            modelVariationOption.textContent = variation;  // filling the <option> element with the variation
            modelVariationSelect.appendChild(modelVariationOption);  // adding the <option> element inside the <select> element
        }


        const modelQuantityLabel = document.createElement("label");  // defining a <label> element linked to quantity <select>
        modelQuantityLabel.setAttribute("for", "select-quantity");  // setting the attribute linking the quantity <label> with the quantity <select>
        modelQuantityLabel.textContent = "Quantité :";  // filling the <label> element with a description
        modelQuantityLabel.classList.add("p-2", "fw-bold");  // adding a "class" attribute for styling
        modelCustomDiv.appendChild(modelQuantityLabel);

        const modelQuantitySelect = document.createElement("select");  // defining a <select> element for quantity
        modelQuantitySelect.setAttribute("id", "select-quantity");  // setting and ID for the <input>
        modelQuantitySelect.setAttribute("name", "select-quantity");  // setting and ID for the <input>
        modelQuantitySelect.classList.add("form-select", "form-select-lg", "mb-4");  // adding a "class" attribute for styling
        modelCustomDiv.appendChild(modelQuantitySelect);  // adding the <input> inside the <article> element

        const quantities = [1];  // [1, 2, 3, 4, 5]
        for (const quantity of quantities) {
            const modelQuantityNumber = document.createElement("option");  // defining an <option> element for quantity
            modelQuantityNumber.setAttribute("value", quantity);  // filling the value attribute with the quantity
            modelQuantityNumber.textContent = quantity;  // filling the <option> element with the quantity
            modelQuantitySelect.appendChild(modelQuantityNumber);  // adding the <option> inside the <select> element
        }
        /* --- Product quantity [x] --- */


        /* --- Product price [o] --- */
        const modelPrice = document.createElement("p");  // defining a <p> element for each product
        modelPrice.textContent = (model.price / 100) + ",00€";  // filling the paragraph with the price displayed in euros
        modelPrice.classList.add("fs-1");  // adding a "class" attribute for styling
        modelCustomDiv.appendChild(modelPrice);  // adding the price inside the <article> element
        /* --- Product price [x] --- */



        /* --------- Add to cart [o] --------- */

        const buttonToCart = document.createElement("button");  // defining a <button> element
        buttonToCart.setAttribute("id", "btn__cart");  // defining an ID for the <button>
        buttonToCart.setAttribute("name", "add-to-cart");  // defining a name for the <button>
        buttonToCart.setAttribute("type", "submit");  // defining the "submit" type for the <button>
        buttonToCart.textContent = "Ajouter au panier";  // filling the <button> with text
        buttonToCart.classList.add("btn", "btn-primary", "btn-lg", "m-3", "fw-bold", "text-center");  // adding a "class" attribute for styling
        modelCustomDiv.appendChild(buttonToCart);  // adding the <button> to the <div> tag


        /* --- Sending informations to LocalStorage [o] --- */
        buttonToCart.addEventListener("click", (event) => {  // setting the events when the button is clicked
            event.preventDefault();  // preventing default behavior of the <button>

            const selectVariation = document.querySelector("#select-variation");  // targeting the <select> element for variation option
            const selectVariationValue = selectVariation.value;  // getting the selector's value

            const selectQuantity = document.querySelector("#select-quantity");  // targeting the <select> element for quantity
            const selectQuantityValue = Number(selectQuantity.value);  // getting the selector's value


            /* --- Object structure for LocalStorage [o] --- */
            const sendingProductInformations = {  // defining an object with the informations to send to cart
                sentProductName: model.name,  // sending the product name
                sentProductUrl: model.imageUrl,  // sending the product picture URL
                sentProductPrice: (model.price / 100), // * selectQuantityValue,  // sending the product price
                sentProductId: model._id,  // sending the product ID
                sentProductVariation: selectVariationValue,  // sending the product variation option
                sentProductQuantity: selectQuantityValue  // sending the selected quantity
            };
            /* --- Object structure for LocalStorage [x] --- */


            /* --- Actions called when checking data in LocalStorage [o] --- */
            let productsInStorage = JSON.parse(localStorage.getItem("products"));  // retrieve object from data in LocalStorage (parsed from JSON to JS)

            const addProductLocalStorage = () => {
                productsInStorage.push(sendingProductInformations);  // adding the object with chosen product in the array existing in LocalStorage
                localStorage.setItem("products", JSON.stringify(productsInStorage));  // sending the informations in "products" key of LocalStorage, converting JS to JSON
            }

            const confirmationToCart = () => {
                window.alert("Votre sélection a été ajoutée au panier");  // displaying an alert box when products are added to cart
            };
            /* --- Actions called when checking data in LocalStorage [x] --- */


            /* --- Checking data in LocalStorage [o] --- */
            if (productsInStorage) {  // defining what to do when there is existing data in LocalStorage
                addProductLocalStorage();
                confirmationToCart();
            } else {  // defining what to do when LocalStorage is empty
                productsInStorage = [];  // creating an empty array to store informations to send in LocalStorage
                addProductLocalStorage();
                confirmationToCart();
            }
            /* --- Checking data in LocalStorage [x] --- */

        });
        /* --- Sending informations to LocalStorage [x] --- */

        /* --------- Add to cart [x] --------- */
    })
    /* --------- Displaying the model matching the parameter for this type of product (teddies) [x] --------- */


    /* --------- Displaying a message when no response is found [o] --------- */
    .catch(error => document.getElementById("product").innerHTML = `<p class="mx-auto m-1 p-5 fs-5 border border-5 rounded-3 bg-light bg-gradient">Désolé, cet article n'est pas disponible.</p>`);  // message displayed when a problem occur
    /* --------- Displaying a message when no response is found [x] --------- */


/* --------- Getting the API's data for the product matching the parameter [x] --------- */
