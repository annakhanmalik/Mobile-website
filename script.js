
const products = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        brand: "Apple",
        price: 299999,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Samsung Galaxy S24",
        brand: "Samsung",
        price: 249999,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Xiaomi 14",
        brand: "Xiaomi",
        price: 199999,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Oppo Reno 11",
        brand: "Oppo",
        price: 159999,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=500&q=80"
    }
];

let cart = [];

const grid = document.getElementById("product-grid");
const searchInput = document.getElementById("search");
const brandFilter = document.getElementById("brand-filter");

// Display phones
function renderProducts() {
    const searchText = searchInput.value.toLowerCase();
    const selectedBrand = brandFilter.value;

    const filteredProducts = products.filter(function(phone) {
        const matchesName =
            phone.name.toLowerCase().includes(searchText);

        const matchesBrand =
            selectedBrand === "All" ||
            phone.brand === selectedBrand;

        return matchesName && matchesBrand;
    });

    if (filteredProducts.length === 0) {
        grid.innerHTML =
            '<p class="no-results">No phones found!</p>';
        return;
    }

    grid.innerHTML = filteredProducts.map(function(phone) {
        return `
            <article class="product-card">
                <img src="${phone.image}" alt="${phone.name}">

                <h3>${phone.name}</h3>
                <p>${phone.brand}</p>

                <div class="rating">★★★★★</div>

                <div class="price">
                    Rs. ${phone.price.toLocaleString("en-PK")}
                </div>

                <button
                    class="add-button"
                    onclick="addToCart(${phone.id})">
                    🛒 Add to Cart
                </button>
            </article>
        `;
    }).join("");
}

// Add phone to cart
function addToCart(id) {
    const phone = products.find(function(item) {
        return item.id === id;
    });

    const existingItem = cart.find(function(item) {
        return item.id === id;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...phone,
            quantity: 1
        });
    }

    updateCartCount();
    showMessage(phone.name + " added to cart!");
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce(function(total, item) {
        return total + item.quantity;
    }, 0);

    document.getElementById("cart-count").textContent =
        totalItems;
}

// Show cart and total
function showCart() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "YOUR CART\n\n";

    cart.forEach(function(item) {
        message += item.name + " x " + item.quantity +
            " = Rs. " +
            (item.price * item.quantity).toLocaleString("en-PK") +
            "\n";
    });

    const total = cart.reduce(function(sum, item) {
        return sum + item.price * item.quantity;
    }, 0);

    message += "\nTotal: Rs. " + total.toLocaleString("en-PK");
    message += "\n\nDemo only — no payment is processed.";

    alert(message);
}

// Show notification
function showMessage(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.style.display = "block";

    setTimeout(function() {
        toast.style.display = "none";
    }, 2000);
}

// Search and filter events
searchInput.addEventListener("input", renderProducts);
brandFilter.addEventListener("change", renderProducts);

// Load products when page opens
renderProducts();

