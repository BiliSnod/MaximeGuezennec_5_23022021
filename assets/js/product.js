let params = new URLSearchParams(document.location.search);  // searching a parameter in the active page URL
let productId = params.get("id");  // getting the value of the "id" parameter in URL
// console.log("product ID :", productId);


fetch(`http://localhost:3000/api/teddies/${productId}`)
    .then(result => result.json())
    .then(model => {  // elements to display on page for the chosen model
        console.log("model", model);
        /* --- Product title [o] --- */
        document.title = `Commandez ${model.name} - Ours en peluche faits à la main - Oripeluche par Orinoco`;
        
        const modelTitleMain = document.querySelector("#title");
        const modelTitle = document.createElement("h1"); // defining a <h1> element for the product
        modelTitle.textContent = `Commandez ${model.name}, parmi nos peluches faites-main`;  // filling the <h1> element with the product name
        modelTitle.classList.add("text-center", "text-light");  // adding class attribute (styling)
        modelTitleMain.appendChild(modelTitle);  // adding the title inside the <article> element
        /* --- Product title [x] --- */


        const element = document.getElementById("product");  // targeting the "product" <section>
        
        const modelProduct = document.createElement("article");  // defining an <article> element for the product
        modelProduct.classList.add("d-md-flex", "flex-row", "m-2", "p-1", "p-sm-3", "border", "border-5", "rounded-3", "bg-light", "bg-gradient");  // adding class attribute (styling)
        element.appendChild(modelProduct);  // adding the <article> element inside the "product" <section>


        /* --- Product description [o] --- */
        const modelFigureDiv = document.createElement("div");
        modelFigureDiv.classList.add("col-md-8");  // adding class attribute (styling)
        modelProduct.appendChild(modelFigureDiv);

        const modelFigure = document.createElement("figure");
        modelFigureDiv.appendChild(modelFigure);  // adding the <figure> element inside the "product" <section>
        
        const modelUrl = document.createElement("img");  // defining an <img> element for each product
        modelUrl.setAttribute("src", model.imageUrl);  // filling the "src" attribute with the image URL
        modelUrl.setAttribute("alt", `Peluche ${model.name}`);  // filling the alt attribute with a description
        modelUrl.classList.add("lead", "img-fluid", "p-3", "mb-3", "border", "border-2", "rounded", "bg-body");  // adding class attribute (styling)
        modelFigure.appendChild(modelUrl);  // adding the image inside the <article> element
        
        const modelDescription = document.createElement("figcaption");  // defining an <figcaption> element for the product
        modelDescription.textContent = model.description;  // filling the <figcaption> element with the description text
        modelDescription.classList.add("lead", "p-2", "fw-normal");  // adding class attribute (styling)
        modelFigure.appendChild(modelDescription);  // adding the <figcaption> in the <figure> element
        /* --- Product description [x] --- */


        /* --- Product customisation [o] --- */
        const modelCustomDiv = document.createElement("div");
        modelCustomDiv.classList.add("col-md-4", "p-3", "text-center");  // adding class attribute (styling)
        modelProduct.appendChild(modelCustomDiv);

        const modelColorLabel = document.createElement("label");  // defining a <label> element linked to color <select>
        modelColorLabel.setAttribute("for", "select-color");
        modelColorLabel.textContent = "Couleur :";
        modelColorLabel.classList.add("p-2", "fw-bold");  // adding class attribute (styling)
        modelCustomDiv.appendChild(modelColorLabel);

        const modelColorSelect = document.createElement("select");  // defining a <select> element to choose between product colors
        modelColorSelect.setAttribute("id", "select-color");  // setting and ID for the <select>
        modelColorSelect.setAttribute("name", "select-color");  // setting and ID for the <select>
        modelColorSelect.classList.add("form-select", "form-select-lg", "mb-4");  // adding class attribute (styling)
        modelCustomDiv.appendChild(modelColorSelect);  // adding the image inside the <article> element

        const colors = model.colors; 
        // console.log(colors);
        for (const color of colors) {  // defining a loop iterating "colors" 
            // console.log(color);
            const modelColorOption = document.createElement("option");  // defining an <option> element for each color
            modelColorOption.setAttribute("value", color);  // filling the value attribute with the color
            modelColorOption.textContent = color;  // filling the <option> element with the color
            modelColorSelect.appendChild(modelColorOption);  // adding the <option> element inside the <select> element
        }
        

        const modelQuantityLabel = document.createElement("label");  // defining a <label> element linked to quantity <select>
        modelQuantityLabel.setAttribute("for", "select-quantity");
        modelQuantityLabel.textContent = "Quantité :";
        modelQuantityLabel.classList.add("p-2", "fw-bold");  // adding class attribute (styling)
        modelCustomDiv.appendChild(modelQuantityLabel);

        const modelQuantitySelect = document.createElement("select");  // defining a <select> element for quantity
        modelQuantitySelect.setAttribute("id", "select-quantity");  // setting and ID for the <input>
        modelQuantitySelect.setAttribute("name", "select-quantity");  // setting and ID for the <input>
        modelQuantitySelect.classList.add("form-select", "form-select-lg", "mb-4");  // adding class attribute (styling)
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
        modelPrice.classList.add("fs-1");  // adding class attribute (styling)
        modelCustomDiv.appendChild(modelPrice);  // adding the price inside the <article> element
        /* --- Product price [x] --- */
        



        /* --------- Add to cart [o] --------- */

        const buttonToCart = document.createElement("button");  // defining a <button> element
        buttonToCart.setAttribute("id", "btn__cart");  // defining an ID for the <button>
        buttonToCart.setAttribute("name", "add-to-cart");  // defining a name for the <button>
        buttonToCart.setAttribute("type", "submit");  // defining the "submit" type for the <button>
        buttonToCart.textContent = "Ajouter au panier";  // filling the <button> with text
        buttonToCart.classList.add("btn", "btn-primary", "btn-lg", "m-3", "fw-bold", "text-center");  // adding class attribute (styling)
        modelCustomDiv.appendChild(buttonToCart);  // adding the <button> to the <div> tag


        /* --- Sending informations to LocalStorage [o] --- */
        buttonToCart.addEventListener("click", (event) => {  // setting the events when the button is clicked
            event.preventDefault();  // preventing default behavior of the <button>
            
            const selectColor = document.querySelector("#select-color");  // targeting the <select> element for color option
            const selectColorValue = selectColor.value;  // getting the selector's value
            
            const selectQuantity = document.querySelector("#select-quantity");  // targeting the <select> element for quantity
             const selectQuantityValue = Number(selectQuantity.value);  // getting the selector's value


            /* --- Object structure for LocalStorage [o] --- */
            const sendingProductInformations = {  // defining an object with the informations to send to cart
                sentProductName: model.name,  // sending the product name
                sentProductUrl: model.imageUrl,  // sending the product picture URL
                sentProductPrice: (model.price / 100), // * selectQuantityValue,  // sending the product price
                sentProductId: model._id,  // sending the product ID
                sentProductColor: selectColorValue,  // sending the product color option
                sentProductQuantity: selectQuantityValue  // sending the selected quantity
            };
            /* --- Object structure for LocalStorage [x] --- */
    
            let productsInStorage = JSON.parse(localStorage.getItem("products"));  // retrieve object from data in LocalStorage (parsed from JSON to JS)
            // console.log(productsInStorage);

            const addProductLocalStorage = () => {
                productsInStorage.push(sendingProductInformations);  // adding the object customer choices in the array destined to LocalStorage
                localStorage.setItem("products", JSON.stringify(productsInStorage));  // sending the informations in "product" key of LocalStorage, converting JS to JSON
            }


            const confirmationToCart = () => {
                window.alert("Votre sélection a été ajoutée au panier");  // displaying an alert box when products are added to cart
            };
                 
            
            /* --- Checking data in LocalStorage [o] --- */
            if (productsInStorage) {  // defining what to do when there is existing data in LocalStorage
                addProductLocalStorage();
                confirmationToCart();
            } else {  // defining what to do when LocalStorage is empty
                productsInStorage = [];  // creating an empty array to store informations to send
                addProductLocalStorage();
                confirmationToCart();
                // location.reload();
            }
            /* --- Checking data in LocalStorage [x] --- */
        });
        /* --- Sending informations to LocalStorage [x] --- */
        /* --------- Add to cart [x] --------- */
    })
    .catch(error => document.getElementById("product").innerHTML = `<p class="mx-auto m-1 p-5 fs-5 border border-5 rounded-3 bg-light bg-gradient">Désolé, cet article n'est pas disponible.</p>`);  // message displayed when a problem occur

