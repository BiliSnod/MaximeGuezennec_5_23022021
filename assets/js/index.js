fetch("http://localhost:3000/api/teddies")  // getting the API's data
    .then(result => result.json())
    .then(teddies => {
        for (const teddy of teddies) {
            const allItems = document.getElementById("items");  // targeting the "items" <section> element
            
            const teddyLink = document.createElement("a");  // defining an <a> tag for each item
            teddyLink.setAttribute("href", `pages/item.html?id=${teddy._id}`);  // filling the href attribute with the item specific URL
            teddyLink.classList.add("link-dark");  // adding class attribute (styling)
            allItems.appendChild(teddyLink);  // adding the link inside the "items" <section> element
            
            const teddyItem = document.createElement("article");  // defining an <article> element for each item
            teddyItem.classList.add("m-2", "p-1", "p-sm-3", "border", "border-5", "rounded-3", "bg-light", "bg-gradient");  // adding class attribute (styling)
            teddyLink.appendChild(teddyItem);  // adding the <article> element inside the <a> tag


            /* --- Items image --- */
            const teddyUrl = document.createElement("img");  // defining an <img> element for each item
            teddyUrl.setAttribute("src", teddy.imageUrl);  // filling the src attribute with the URL
            teddyUrl.setAttribute("height", "200");  // TEMPORARY
            teddyUrl.setAttribute("alt", `Peluche ${teddy.name}`);  // filling the alt attribute with a description
            teddyItem.appendChild(teddyUrl);  // adding the image inside the <article> element
            /* ------ */

            /* --- Items name --- */
            const teddyName = document.createElement("h2"); // defining a <h2> element for each item
            teddyName.textContent = teddy.name;  // filling the <h2> tag with the item name
            teddyItem.appendChild(teddyName);  // adding the title inside the <article> element
            /* ------ */

            /* --- Items price --- */
            const teddyPrice = document.createElement("p");  // defining a <p> tag for each item
            teddyPrice.textContent = (teddy.price / 100) + ",00€";  // filling the paragraph with the price displayed in euros
            teddyItem.appendChild(teddyPrice);  // adding the <p> tag inside the <article> element
            /* ------ */
        }
    })
    .catch(error => document.getElementById("items").innerHTML = "<p>Désolé, aucun article n'est disponible.</p>");