document.addEventListener('DOMContentLoaded', () => {
    const main = document.getElementById("main");
    const categorySelect = document.getElementById("categorySelect");
    const cart = []; 

    function updateCartCount() {
        const cartCount = document.getElementById("cartCount");
        cartCount.textContent = `Cart: ${cart.length} item(s)`; 
    }

    async function display() {
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            const result = await response.json();
            
            console.log(result); 

            const categories = [];
            result.forEach(product => {
                if (!categories.includes(product.category)) {
                    categories.push(product.category);
                }
            });

            categories.unshift("All"); 

            populateCategories(categories);

            appendImage(result);

            categorySelect.addEventListener("change", (event) => 
                appendImage(result.filter(product => event.target.value === "All" || product.category === event.target.value))
            );
            
            
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    function populateCategories(categories) {
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }

    function appendImage(data) {
        main.innerHTML = "";

        data.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");

            const image = document.createElement("img");
            image.src = product.image;
            image.alt = product.title; 

            const title = document.createElement("h6");
            title.textContent = product.title;

            const price = document.createElement("p");
            price.textContent = `$${product.price}`;

            const cartButton = document.createElement("button");

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove from Cart";
            removeButton.classList.add("btn");

            removeButton.addEventListener("click", () => {
                removeFromCart(product);
            });
            cartButton.textContent = "Add to Cart";
            cartButton.classList.add("btn");

            cartButton.addEventListener("click", () => {
                addToCart(product); 
            });

            const detailsButton = document.createElement("button");
            detailsButton.textContent = "View Details";
            detailsButton.classList.add("btn");

            detailsButton.addEventListener("click", () => {
                showProductDetails(product);
            });

            productDiv.append(image, title, price, cartButton, removeButton, detailsButton);

            main.appendChild(productDiv);
        });
    }

    function addToCart(product) {
        const productIndex = cart.findIndex(item => item.id === product.id);

        if (productIndex === -1) {
            cart.push(product);
            console.log("Product added to cart:", product);
        } else {
            alert("Product is already in the cart.")
            console.log("Product is already in the cart.");
        }

        updateCartCount();
    }

    function showProductDetails(product) {
        const modal = document.createElement("div");
        modal.classList.add("modal");
        
        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");

        const modalTitle = document.createElement("h2");
        modalTitle.textContent = product.title;

        const modalDescription = document.createElement("p");
        modalDescription.textContent = product.description;

        const modalPrice = document.createElement("p");
        modalPrice.textContent = `$${product.price}`;

        const modalImage = document.createElement("img");
        modalImage.src = product.image;
        modalImage.alt = product.title;

        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        closeButton.classList.add("btn");
        closeButton.addEventListener("click", () => {
            modal.style.display = "none"; 
        });

        modalContent.append(modalTitle, modalImage, modalDescription, modalPrice, closeButton);

        modal.appendChild(modalContent);

        document.body.appendChild(modal);
        
        modal.style.display = "block";
    }

    display();
});





