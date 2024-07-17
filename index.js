const apiUrl = 'https://fakestoreapi.com/products';

// Function to fetch products
async function fetchProducts() {
    const response = await fetch(apiUrl);
    const products = await response.json();
    return products;
}

// Function to fetch product details
async function fetchProductDetails(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const product = await response.json();
    return product;
}

// Function to display products
function displayProducts(products) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.textContent = product.title;
        productCard.addEventListener('click', async () => {
            const productDetails = await fetchProductDetails(product.id);
            showProductDetails(productDetails);
        });
        productGrid.appendChild(productCard);
    });
}

// Function to show product details
function showProductDetails(product) {
    const productDetailsElem = document.getElementById('product-details');
    productDetailsElem.innerHTML = `
    <h2>${product.title}</h2>
    <img src="${product.image}" alt="${product.title}" style="max-width: 100px;">
    <p><strong>Price:</strong> $${product.price}</p>
    <p><strong>Description:</strong> ${product.description}</p>
    <p><strong>Category:</strong> ${product.category}</p>
  `;
}

// Initial load of products
fetchProducts().then(displayProducts);