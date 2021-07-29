let params = new URLSearchParams(document.location.search);  // searching a parameter in the active page URL
let productId = params.get("id");  // getting the value of the "id" parameter in URL
// console.log("product ID :", productId);


fetch(`http://localhost:3000/api/teddies/${productId}`)
    .then(result => result.json())
    .then(teddy => {
        /* --- Product title [o] --- */
        document.title = `Commandez ${teddy.name} - Ours en peluche faits à la main - Oripeluche par Orinoco`;
        
        const teddyTitleMain = document.querySelector("#title");
        const teddyTitle = document.createElement("h1"); // defining a <h1> element for the product
        teddyTitle.textContent = `Commandez ${teddy.name}, parmi nos peluches faites-main`;  // filling the <h1> element with the product name
        teddyTitle.classList.add("text-center", "text-light");  // adding class attribute (styling)
        teddyTitleMain.appendChild(teddyTitle);  // adding the title inside the <article> element
        /* --- Product title [x] --- */


        const product = document.getElementById("product");  // targeting the "product" <section>
        
        const teddyProduct = document.createElement("article");  // defining an <article> element for the product
        teddyProduct.classList.add("d-md-flex", "flex-row", "m-2", "p-1", "p-sm-3", "border", "border-5", "rounded-3", "bg-light", "bg-gradient");  // adding class attribute (styling)
        product.appendChild(teddyProduct);  // adding the <article> element inside the "product" <section>


        /* --- Product description [o] --- */
        const teddyFigureDiv = document.createElement("div");
        teddyFigureDiv.classList.add("col-md-8");  // adding class attribute (styling)
        teddyProduct.appendChild(teddyFigureDiv);

        const teddyFigure = document.createElement("figure");
        teddyFigureDiv.appendChild(teddyFigure);  // adding the <figure> element inside the "product" <section>
        
        const teddyUrl = document.createElement("img");  // defining an <img> element for each product
        teddyUrl.setAttribute("src", teddy.imageUrl);  // filling the "src" attribute with the image URL
        teddyUrl.setAttribute("height", "320");  // TEMPORARY
        teddyUrl.setAttribute("alt", `Peluche ${teddy.name}`);  // filling the alt attribute with a description
        teddyUrl.classList.add("lead", "img-fluid", "p-3", "mb-3", "border", "border-2", "rounded", "bg-body");  // adding class attribute (styling)
        teddyFigure.appendChild(teddyUrl);  // adding the image inside the <article> element
        
        const teddyDescription = document.createElement("figcaption");  // defining an <figcaption> element for the product
        teddyDescription.textContent = teddy.description;  // filling the <figcaption> element with the description text
        teddyDescription.classList.add("lead", "p-2", "fw-normal");  // adding class attribute (styling)
        teddyFigure.appendChild(teddyDescription);  // adding the <figcaption> in the <figure> element
        /* --- Product description [x] --- */


        /* --- Product customisation [o] --- */
        const teddyCustomDiv = document.createElement("div");
        teddyCustomDiv.classList.add("col-md-4", "p-3", "text-center");  // adding class attribute (styling)
        teddyProduct.appendChild(teddyCustomDiv);

        const teddyColorLabel = document.createElement("label");  // defining a <label> element linked to color <select>
        teddyColorLabel.setAttribute("for", "select-color");
        teddyColorLabel.textContent = "Couleur :";
        teddyColorLabel.classList.add("p-2", "fw-bold");  // adding class attribute (styling)
        teddyCustomDiv.appendChild(teddyColorLabel);

        const teddyColorSelect = document.createElement("select");  // defining a <select> element to choose between product colors
        teddyColorSelect.setAttribute("id", "select-color");  // setting and ID for the <select>
        teddyColorSelect.setAttribute("name", "select-color");  // setting and ID for the <select>
        teddyColorSelect.classList.add("form-select", "form-select-lg", "mb-4");  // adding class attribute (styling)
        teddyCustomDiv.appendChild(teddyColorSelect);  // adding the image inside the <article> element

        const colors = teddy.colors; 
        // console.log(colors);
        for (const color of colors) {  // defining a loop iterating "colors" 
            // console.log(color);
            const teddyColorOption = document.createElement("option");  // defining an <option> element for each color
            teddyColorOption.setAttribute("value", color);  // filling the value attribute with the color
            teddyColorOption.textContent = color;  // filling the <option> element with the color
            teddyColorSelect.appendChild(teddyColorOption);  // adding the <option> element inside the <select> element
        }
        

        const teddyQuantityLabel = document.createElement("label");  // defining a <label> element linked to quantity <select>
        teddyQuantityLabel.setAttribute("for", "select-quantity");
        teddyQuantityLabel.textContent = "Quantité :";
        teddyQuantityLabel.classList.add("p-2", "fw-bold");  // adding class attribute (styling)
        teddyCustomDiv.appendChild(teddyQuantityLabel);

        const teddyQuantitySelect = document.createElement("select");  // defining a <select> element for quantity
        teddyQuantitySelect.setAttribute("id", "select-quantity");  // setting and ID for the <input>
        teddyQuantitySelect.setAttribute("name", "select-quantity");  // setting and ID for the <input>
        teddyQuantitySelect.classList.add("form-select", "form-select-lg", "mb-4");  // adding class attribute (styling)
        teddyCustomDiv.appendChild(teddyQuantitySelect);  // adding the <input> inside the <article> element

        const quantities = [1, 2, 3, 4, 5];
        for (const quantity of quantities) {
            const teddyQuantityNumber = document.createElement("option");  // defining an <option> element for quantity
            teddyQuantityNumber.setAttribute("value", quantity);  // filling the value attribute with the quantity
            teddyQuantityNumber.textContent = quantity;  // filling the <option> element with the quantity
            teddyQuantitySelect.appendChild(teddyQuantityNumber);  // adding the <option> inside the <select> element
        }
        /* --- Product quantity [x] --- */

            
        /* --- Product price [o] --- */
        const teddyPrice = document.createElement("p");  // defining a <p> element for each product
        teddyPrice.textContent = (teddy.price / 100) + ",00€";  // filling the paragraph with the price displayed in euros
        teddyPrice.classList.add("fs-1");  // adding class attribute (styling)
        teddyCustomDiv.appendChild(teddyPrice);  // adding the price inside the <article> element
        /* --- Product price [x] --- */
        



        /* --------- Add to cart [o] --------- */

        const buttonToCart = document.createElement("button");  // defining a <button> element
        buttonToCart.setAttribute("id", "btn__cart");  // defining an ID for the <button>
        buttonToCart.setAttribute("name", "add-to-cart");  // defining a name for the <button>
        buttonToCart.setAttribute("type", "submit");  // defining the "submit" type for the <button>
        buttonToCart.textContent = "Ajouter au panier";  // filling the <button> with text
        buttonToCart.classList.add("btn", "btn-primary", "btn-lg", "m-3", "fw-bold", "text-center");  // adding class attribute (styling)
        teddyCustomDiv.appendChild(buttonToCart);  // adding the <button> to the <div> tag


        /* --- Sending informations to LocalStorage [o] --- */
        // const sendToCart = document.querySelector("#btn__cart");  // targeting the <button> sending the informations to cart // ALREADY CALLED
        buttonToCart.addEventListener("click", (event) => {  // configuring the events when the button is clicked
            event.preventDefault();  // preventing default behavior of the <button>
            
            const selectColor = document.querySelector("#select-color");  // targeting the <select> element for color option
            const selectColorValue = selectColor.value;  // getting the selector's value
            
            const selectQuantity = document.querySelector("#select-quantity");  // targeting the <select> element for quantity
             const selectQuantityValue = Number(selectQuantity.value);  // getting the selector's value


            /* --- Object model for LocalStorage [o] --- */
            const sendingProductInformations = {  // defining an object with the informations to send to cart
                sentProductName: teddy.name,  // sending the product name
                sentProductUrl: teddy.imageUrl,  // sending the product picture URL
                sentProductPrice: (teddy.price / 100), // * selectQuantityValue,  // sending the product price
                sentProductId: teddy._id,  // sending the product ID
                // sentProductColor: selectColorValue,  // sending the product color option
                sentProductQuantity: selectQuantityValue  // sending the selected quantity
            };
            /* --- Object model for LocalStorage [x] --- */
    
            let productsInStorage = JSON.parse(localStorage.getItem("products"));  // retrieve object from data in LocalStorage (parsed from JSON to JS)
            // console.log(productsInStorage);

            const addProductLocalStorage = () => {
                productsInStorage.push(sendingProductInformations);  // adding the object customer choices in the array destined to LocalStorage
                localStorage.setItem("products", JSON.stringify(productsInStorage));  // sending the informations in "product" key of LocalStorage, converting JS to JSON
            }


            const confirmationToCart = () => {
                window.alert("Votre sélection a été ajoutée au panier");  // displaying an alert box when products are added to cart
            };

            /* --- Declaring a function to add quantity to existing products or adding a new one [o] --- */
            function updateQuantityInStorage(newProduct) {
            // console.log("teddy._id", teddy._id)
                for (const productInStorage of productsInStorage) {  // iterating through "products" in LocalStorage
                    console.log("productsInStorage.length", productsInStorage.length);
                    if (productInStorage.sentProductId === newProduct.sentProductId) {  // condition for updating the quantity of the existing product
                        console.log("ADD QUANTITY")
                        console.log("productInStorage", productInStorage);
                        console.log("newProduct.sentProductQuantity", newProduct.sentProductQuantity);
                        productInStorage.sentProductQuantity += newProduct.sentProductQuantity;
                        console.log("productInStorage.sentProductQuantity", productInStorage.sentProductQuantity);
                        confirmationToCart();   
                        return;  
                    } else {  // when there is no matching product in LocalStorage
                        console.log("ADD NEW PRODUCT")
                        console.log("productInStorage", productInStorage);  // PROBLEM : doesn't seem to iterate, returns only one product, doesn't find existing match and create duplicate entry
                        addProductLocalStorage();
                        confirmationToCart();
                        return;
                    };
                };
            };
            /* --- Declaring a function to add quantity to existing products or adding a new one [x] --- */
            
            /* --- Checking data in LocalStorage [o] --- */
            if (productsInStorage) {  // defining what to do when there is existing data in LocalStorage
                console.log("SOMETHING IN CART")
                updateQuantityInStorage(sendingProductInformations);
                localStorage.setItem("products", JSON.stringify(productsInStorage));
                // location.reload();
            } else {  // defining what to do when LocalStorage is empty
                productsInStorage = [];  // creating an empty array to store informations to send
                console.log("CART IS EMPTY")
                addProductLocalStorage();
                confirmationToCart();
                console.log("CART NOT EMPTY ANYMORE");
                // location.reload();
            }
            /* --- Checking data in LocalStorage [x] --- */
        });
        /* --- Sending informations to LocalStorage [x] --- */
        /* --------- Add to cart [x] --------- */
    })
    .catch(error => document.getElementById("product").innerHTML = "<p>Désolé, aucun article n'est disponible.</p>");  // message displayed when a problem occur

