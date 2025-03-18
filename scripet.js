document.addEventListener('DOMContentLoaded', () => {
    const main = document.getElementById("main");
    const categorySelect = document.getElementById("categorySelect");
    const cart = []; // Array to hold cart items

    // Function to display the cart item count
    function updateCartCount() {
        const cartCount = document.getElementById("cartCount");
        cartCount.textContent = `Cart: ${cart.length} item(s)`; // Update cart item count
    }

    async function display() {
        try {
            // Fetch the data from the API
            const response = await fetch("https://fakestoreapi.com/products");
            const result = await response.json();
            
            console.log(result); // Log the result to check the structure

            // Check if result is an array before proceeding
            if (Array.isArray(result)) {
                // Extract categories from the products and populate the dropdown
                populateCategories(result);

                // Initially display all products
                appendImage(result);

                // Add event listener to filter products by selected category
                categorySelect.addEventListener("change", (event) => {
                    const selectedCategory = event.target.value;
                    const filteredProducts = selectedCategory === "All"
                        ? result
                        : result.filter(product => product.category === selectedCategory);
                    appendImage(filteredProducts);
                });
            } else {
                console.error("The fetched data is not an array:", result);
            }
        } catch (error) {
            console.error("Error fetching data:", error); // Handle any errors during fetch
        }
    }

    // Function to populate categories in the dropdown
    function populateCategories(products) {
        const categories = Array.from(new Set(products.map(product => product.category))); // Get unique categories
        categories.unshift("All"); // Add "All" option to show all products
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }

    // Function to create HTML elements for each product and append them
    function appendImage(data) {
        // Clear the main container before adding new products
        main.innerHTML = "";

        data.forEach(product => {
            // Create a div for each product
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");

            // Create and append the image
            const image = document.createElement("img");
            image.src = product.image;
            image.alt = product.title; // Set alt text for accessibility

            // Create and append the product title
            const title = document.createElement("h6");
            title.textContent = product.title;

            // Create and append the price
            const price = document.createElement("p");
            price.textContent = `$${product.price.toFixed(2)}`;

            // Create and append the "Add to Cart" button
            const cartButton = document.createElement("button");
            cartButton.textContent = "Add to Cart";
            cartButton.classList.add("btn");

            // Add event listener to handle Add to Cart button click
            cartButton.addEventListener("click", () => {
                addToCart(product); // Add product to cart
            });

            // Create and append the "View Details" button
            const detailsButton = document.createElement("button");
            detailsButton.textContent = "View Details";
            detailsButton.classList.add("btn");

            // Add event listener to show product details
            detailsButton.addEventListener("click", () => {
                showProductDetails(product);
            });

            // Append the image, title, price, and buttons to the product div
            productDiv.append(image, title, price, cartButton, detailsButton);

            // Finally, append the product div to the main container
            main.appendChild(productDiv);
        });
    }

    // Function to handle adding product to cart
    function addToCart(product) {
        // Check if the product is already in the cart
        const productIndex = cart.findIndex(item => item.id === product.id);

        if (productIndex === -1) {
            // Product is not in the cart, so add it
            cart.push(product);
            console.log("Product added to cart:", product);
        } else {
            console.log("Product is already in the cart.");
        }

        // Update the cart item count display
        updateCartCount();
    }

    // Function to show product details in a modal
    function showProductDetails(product) {
        // Create the modal container
        const modal = document.createElement("div");
        modal.classList.add("modal");
        
        // Create the modal content
        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");

        // Add product details to the modal content
        const modalTitle = document.createElement("h2");
        modalTitle.textContent = product.title;

        const modalDescription = document.createElement("p");
        modalDescription.textContent = product.description;

        const modalPrice = document.createElement("p");
        modalPrice.textContent = `$${product.price.toFixed(2)}`;

        const modalImage = document.createElement("img");
        modalImage.src = product.image;
        modalImage.alt = product.title;

        // Create a close button for the modal
        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        closeButton.classList.add("btn");
        closeButton.addEventListener("click", () => {
            modal.style.display = "none"; // Close the modal
        });

        // Append everything to the modal content
        modalContent.append(modalTitle, modalImage, modalDescription, modalPrice, closeButton);

        // Append modal content to the modal
        modal.appendChild(modalContent);

        // Append the modal to the body
        document.body.appendChild(modal);
        
        // Display the modal
        modal.style.display = "block";
    }

    // Call the display function to fetch and display the data
    display();
});
