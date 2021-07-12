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
        const teddyQuantityNumber = document.createElement("input");  // defining an <input> element for quantity
        teddyQuantityNumber.setAttribute("id", "quantity");  // setting and ID for the <input>
        teddyQuantityNumber.setAttribute("name", "quantity");  // setting and ID for the <input>
        teddyQuantityNumber.setAttribute("size", 1);  // limiting the width of the <input>
        teddyQuantityNumber.setAttribute("type", "number");  // limiting the length to one character
        teddyQuantityNumber.setAttribute("value", 1);  // filling the "value" attribute to 1
        teddyQuantityNumber.setAttribute("min", 1);  // limiting the "value" from 1...
        teddyQuantityNumber.setAttribute("max", 9);  // ...to 9
        teddyItem.appendChild(teddyQuantityNumber);  // adding the <input> inside the <article> element
        /* ------ */


            
        /* --- Item price --- */
        const teddyPrice = document.createElement("p");  // defining a <p> element for each item
        teddyPrice.setAttribute("class", "price");  // setting and ID for the <input>
        teddyPrice.textContent = (teddy.price / 100) + ",00€";  // filling the paragraph with the price displayed in euros
        teddyItem.appendChild(teddyPrice);  // adding the price inside the <article> element
        
        const priceQuantity = document.getElementById("quantity");  // modifying the displayed price when quantity change
        priceQuantity.addEventListener('change', (event) => {  // placing EventListener on the "quantity" input
            const totalPriceQuantity = (teddy.price * event.target.value) / 100;  // calculating the price with a new quantity
            const displayTotalPriceQuantity = document.querySelector('.price');  // 
            displayTotalPriceQuantity.textContent = totalPriceQuantity + ",00€";
        });
        /* ------ */
        

        /* --- Add to cart --- */
        document.getElementById("item");  // targeting the "item" <section>
        
        const add = document.createElement("div");  // defining an <div> element
        item.appendChild(add);  // adding the <div> inside the "item" <section>

        const addToCart = document.createElement("button");  // defining a <button> element
        addToCart.textContent = "Ajouter au panier";
        add.appendChild(addToCart);
        /* ------ */
    })
    .catch(error => document.getElementById("item").innerHTML = "<p>Désolé, aucun article n'est disponible.</p>");  // message displayed when a problem occur