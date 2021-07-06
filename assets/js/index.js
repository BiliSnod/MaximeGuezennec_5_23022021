fetch("http://localhost:3000/api/teddies")  // getting the API's data
    .then(result => result.json())
    .then(teddies => {
        for(const teddy of teddies) {
            const allItems = document.getElementById("items");  // targeting the "items" <section> element

            const teddyLink = document.createElement("a");  // defining an <a> tag for each item
            teddyLink.setAttribute("href", `item.html?index=${teddy._id}`);  // filling the href attribute with the item specific URL
            allItems.appendChild(teddyLink);  // adding the link inside the "items" <section> element

            const teddyItems = document.createElement("article");  // defining an <article> tag for each item
            teddyLink.appendChild(teddyItems);  // adding the <article> tag inside the <a> tag

            const teddyUrl = document.createElement("img");  // defining an <img> tag for each item
            teddyUrl.setAttribute("src", teddy.imageUrl);  // filling the src attribute with the URL
            teddyUrl.setAttribute("alt", `Peluche ${teddy.name}`);  // filling the alt attribute with a description
            teddyItems.appendChild(teddyUrl);  // adding the image inside the <article> tag

            const teddyName = document.createElement("h2"); // defining a <h2> tag for each item
            teddyName.textContent = teddy.name;  // filling the <h2> tag with the item name
            teddyItems.appendChild(teddyName);  // adding the title inside the <article> tag

            const teddyPrice = document.createElement("p");  // defining a <p> tag for each item
            teddyPrice.textContent = (teddy.price / 100) + "€";  // filling the paragraph with the price displayed in euros
            // teddyName.classList.add("nouvelleClasse");  // adding a new class to the element
            teddyItems.appendChild(teddyPrice);
        }
    })
    .catch(error => document.getElementById("items").innerHTML = "<p>Désolé, aucun article n'est disponible.</p>");
/*--ALTERNATIVE WRITING
----.catch(function(error) {
--------error = document.getElementById("items").innerHTML = "<p>Désolé, aucun article n'est disponible.</p>";
});
--*/


/*
import bar from './bar.js';

bar();
*/