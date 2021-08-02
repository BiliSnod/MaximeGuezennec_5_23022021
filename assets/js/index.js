fetch("http://localhost:3000/api/teddies")  // getting the API's data
    .then(result => result.json())
    .then(models => {  // all models for this type of product that is get in API
        for (const model of models) {  // elements to display on page for each model
            const allModels = document.getElementById("products");  // targeting the "products" <section> element
            
            const modelLink = document.createElement("a");  // defining an <a> tag for each product
            modelLink.setAttribute("href", `pages/product.html?id=${model._id}`);  // filling the href attribute with the product specific URL
            modelLink.classList.add("col-md-6", "col-lg-4", "text-decoration-none", "link-dark");  // adding class attribute (styling)
            allModels.appendChild(modelLink);  // adding the link inside the "products" <section> element
            
            const modelProduct = document.createElement("article");  // defining an <article> element for each product
            modelProduct.classList.add("card", "m-2", "p-3", "border", "border-5", "rounded-3", "shadow-sm", "bg-light", "bg-gradient");  // adding class attribute (styling)
            modelLink.appendChild(modelProduct);  // adding the <article> element inside the <a> tag


            /* --- Products image --- */
            const modelUrl = document.createElement("img");  // defining an <img> element for each product
            modelUrl.setAttribute("src", model.imageUrl);  // filling the src attribute with the URL
            modelUrl.setAttribute("alt", `Peluche ${model.name}`);  // filling the alt attribute with a description
            modelUrl.classList.add("image-height", "img-fluid", "overflow-hidden", "p-3", "mb-5", "border", "border-2", "rounded", "bg-body");  // adding class attribute (styling)
            modelProduct.appendChild(modelUrl);  // adding the image inside the <article> element
            /* ------ */

            /* --- Products name --- */
            const modelName = document.createElement("h2"); // defining a <h2> element for each product
            modelName.textContent = model.name;  // filling the <h2> tag with the product name
            modelName.classList.add("mx-auto", "card-title", "text-uppercase", "bg-light", "bg-gradient");  // adding class attribute (styling)
            modelProduct.appendChild(modelName);  // adding the title inside the <article> element
            /* ------ */

            /* --- Products price --- */
            const modelPrice = document.createElement("p");  // defining a <p> tag for each product
            modelPrice.textContent = (model.price / 100) + ",00€";  // filling the paragraph with the price displayed in euros
            modelPrice.classList.add("mx-auto", "fw-bold", "fs-4");  // adding class attribute (styling)
            modelProduct.appendChild(modelPrice);  // adding the <p> tag inside the <article> element
            /* ------ */
        }
    })
    .catch(error => document.getElementById("products").innerHTML = `<p class="mx-auto col-12 m-1 p-5 fs-5 border border-5 rounded-3 bg-light bg-gradient">Désolé, aucun article n'est disponible.</p>`);