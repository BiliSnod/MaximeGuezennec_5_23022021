let params = new URLSearchParams(document.location.search);  // searching a parameter in the active page url
let itemId = params.get("id");  // getting the value of the "id" parameter
// console.log("item ID :", itemId);


fetch(`http://localhost:3000/api/teddies/${itemId}`)
    .then(result => result.json())
    .then(teddy => {
        const item = document.getElementById("item");  // targeting the "item" <section>
        
        const teddyItem = document.createElement("article");  // defining an <article> element for the item
        item.appendChild(teddyItem);  // adding the <article> element inside the "item" <section>


        /* --- Item title --- */
        const teddyTitle = document.createElement("h1"); // defining a <h1> element for the item
        teddyTitle.textContent = `Commandez ${teddy.name}, parmi nos peluches faites-main`;  // filling the <h1> element with the item name
        teddyItem.appendChild(teddyTitle);  // adding the title inside the <article> element
        /* ------ */


        /* --- Item description --- */
        const teddyFigure = document.createElement("figure");
        teddyItem.appendChild(teddyFigure);  // adding the <figure> element inside the "item" <section>
        
        const teddyUrl = document.createElement("img");  // defining an <img> element for each item
        teddyUrl.setAttribute("src", teddy.imageUrl);  // filling the "src" attribute with the image URL
        teddyUrl.setAttribute("height", "200");  // TEMPORARY
        teddyUrl.setAttribute("alt", `Peluche ${teddy.name}`);  // filling the alt attribute with a description
        teddyFigure.appendChild(teddyUrl);  // adding the image inside the <article> element
        
        const teddyDescription = document.createElement("figcaption");  // defining an <figcaption> element for the item
        teddyDescription.textContent = teddy.description;  // filling the <figcaption> element with the description text
        teddyFigure.appendChild(teddyDescription);  // adding the <figcaption> in the <figure> element
        /* ------ */


        /* --- Item color --- */
        const teddyColorSelect = document.createElement("select");  // defining a <select> element to choose between item colors
        teddyColorSelect.setAttribute("id", "select-color");  // setting and ID for the <input>
        teddyColorSelect.setAttribute("name", "select-color");  // setting and ID for the <input>
        teddyItem.appendChild(teddyColorSelect);  // adding the image inside the <article> element

        const colors = teddy.colors; 
        // console.log(colors);
        for (const color of colors) {  // defining a loop iterating "colors" 
            // console.log(color);
            const teddyColorOption = document.createElement("option");  // defining an <option> element for each color
            teddyColorOption.setAttribute("value", color);  // filling the value attribute with the color
            teddyColorOption.textContent = color;  // filling the <option> element with the color
            teddyColorSelect.appendChild(teddyColorOption);  // adding the <option> element inside the <select> element
        }
        /* ------ */


        /* --- Item quantity --- */
        const teddyQuantitySelect = document.createElement("select");  // defining a <select> element for quantity
        teddyQuantitySelect.setAttribute("id", "select-quantity");  // setting and ID for the <input>
        teddyQuantitySelect.setAttribute("name", "select-quantity");  // setting and ID for the <input>
        teddyItem.appendChild(teddyQuantitySelect);  // adding the <input> inside the <article> element

        const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (const quantity of quantities) {
            const teddyQuantityNumber = document.createElement("option");  // defining an <option> element for quantity
            teddyQuantityNumber.setAttribute("value", quantity);  // filling the value attribute with the quantity
            teddyQuantityNumber.textContent = quantity;  // filling the <option> element with the quantity
            teddyQuantitySelect.appendChild(teddyQuantityNumber);  // adding the <option> inside the <select> element
        }
        /* ------ */

            
        /* --- Item price --- */
        const teddyPrice = document.createElement("p");  // defining a <p> element for each item
        teddyPrice.textContent = (teddy.price / 100) + ",00€";  // filling the paragraph with the price displayed in euros
        teddyItem.appendChild(teddyPrice);  // adding the price inside the <article> element
        /* ------ */
        



        /* --- Add to cart --- */
        document.getElementById("item");  // targeting the "item" <section>
        
        const toCart = document.createElement("div");  // defining an <div> element
        item.appendChild(toCart);  // adding the <div> inside the "item" <section>

        const buttonToCart = document.createElement("button");  // defining a <button> element
        buttonToCart.setAttribute("id", "btn__cart");  // defining an ID for the <button>
        buttonToCart.setAttribute("name", "add-to-cart");  // defining a name for the <button>
        buttonToCart.setAttribute("type", "submit");  // defining the "submit" type for the <button>
        buttonToCart.textContent = "Ajouter au panier";  // filling the <button> with text

        toCart.appendChild(buttonToCart);  // adding the <button> to the <div> tag


        const sendToCart = document.querySelector("#btn__cart");  // targeting the <button> sending the informations to cart 
        sendToCart.addEventListener("click", (event) => {  // configuring the events when the button is clicked
            event.preventDefault();  // preventing default behavior of the <button>
            
            const selectQuantity = document.querySelector("#select-quantity");  // targeting the <select> element for quantity
            const selectQuantityValue = selectQuantity.value;  // getting the selector's value

            const sendingInformations = {  // defining an object with the informations to send to cart
                sendItemId: teddy._id,  // sending the item ID
                sendQuantity: selectQuantityValue  // sending the selected quantity
            };
            console.log(sendingInformations)
        });
        /* ------ */
    })
    .catch(error => document.getElementById("item").innerHTML = "<p>Désolé, aucun article n'est disponible.</p>");  // message displayed when a problem occur

