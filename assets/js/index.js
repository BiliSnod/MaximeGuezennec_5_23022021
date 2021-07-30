fetch("http://localhost:3000/api/teddies")  // getting the API's data
    .then(result => result.json())
    .then(teddies => {
        for (const teddy of teddies) {
            const allProducts = document.getElementById("products");  // targeting the "products" <section> element
            
            const teddyLink = document.createElement("a");  // defining an <a> tag for each product
            teddyLink.setAttribute("href", `pages/product.html?id=${teddy._id}`);  // filling the href attribute with the product specific URL
            teddyLink.classList.add("col-md-6", "col-lg-4", "text-decoration-none", "link-dark");  // adding class attribute (styling)
            allProducts.appendChild(teddyLink);  // adding the link inside the "products" <section> element
            
            const teddyProduct = document.createElement("article");  // defining an <article> element for each product
            teddyProduct.classList.add("card", "m-2", "p-3", "border", "border-5", "rounded-3", "shadow-sm", "bg-light", "bg-gradient");  // adding class attribute (styling)
            teddyLink.appendChild(teddyProduct);  // adding the <article> element inside the <a> tag


            /* --- Products image --- */
            const teddyUrl = document.createElement("img");  // defining an <img> element for each product
            teddyUrl.setAttribute("src", teddy.imageUrl);  // filling the src attribute with the URL
            teddyUrl.setAttribute("alt", `Peluche ${teddy.name}`);  // filling the alt attribute with a description
            teddyUrl.classList.add("image-height", "img-fluid", "overflow-hidden", "p-3", "mb-5", "border", "border-2", "rounded", "bg-body");  // adding class attribute (styling)
            teddyProduct.appendChild(teddyUrl);  // adding the image inside the <article> element
            /* ------ */

            /* --- Products name --- */
            const teddyName = document.createElement("h2"); // defining a <h2> element for each product
            teddyName.textContent = teddy.name;  // filling the <h2> tag with the product name
            teddyName.classList.add("mx-auto", "card-title", "text-uppercase", "bg-light", "bg-gradient");  // adding class attribute (styling)
            teddyProduct.appendChild(teddyName);  // adding the title inside the <article> element
            /* ------ */

            /* --- Products price --- */
            const teddyPrice = document.createElement("p");  // defining a <p> tag for each product
            teddyPrice.textContent = (teddy.price / 100) + ",00€";  // filling the paragraph with the price displayed in euros
            teddyPrice.classList.add("mx-auto", "fw-bold", "fs-4");  // adding class attribute (styling)
            teddyProduct.appendChild(teddyPrice);  // adding the <p> tag inside the <article> element
            /* ------ */
        }
    })
    .catch(error => document.getElementById("products").innerHTML = "<p>Désolé, aucun article n'est disponible.</p>");