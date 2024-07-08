const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {  
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}
if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}
// Encontrar ruta del archivo json

function getJsonPath() {
    const pathname = window.location.pathname;
    if (pathname.includes('index.html') || pathname === '/') {
        return 'products.json';
    } else if (pathname.includes('pages/shop.html') || pathname.includes('pages/sproducts.html')) {
        return '../products.json'; // Ruta relativa al estar en páginas dentro de la carpeta 'pages'
    }else if (pathname.includes('pages/cart.html')) {
        return '../products.json';
    }
    return '/products.json'; // Ruta por defecto
}


// Cargar productos desde JSON y definir métodos
fetch(getJsonPath())
    .then(response => response.json())
    .then(data => {
        const db = {
            items: data.items || [],
            methods: {
                find: (id) => {
                    return db.items.find(item => item.id == id);
                },
                remove: (items) => {
                    items.forEach(item => {
                        const product = db.methods.find(item.id);
                        if (product) {
                            product.qty = product.qty - item.qty;
                        }
                    });
                }
            }
        };
        // Renderizar la tienda
        const productContainer = document.querySelector('#product-container');
        function renderStore() {
            productContainer.innerHTML = '';
            db.items.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('pro', 'add');

                div.innerHTML = `
                    <img src="${item.img}" alt="${item.name}">
                    <div class="des" data-id="${item.id}">
                        <span>${item.tmark}</span>
                        <h5>${item.name}</h5>
                        <div class="star">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <h4>${item.price}</h4>
                    </div>
                    <a href="#"><i class="fa-solid fa-cart-shopping"></i></a>
                `;

                productContainer.append(div);

                div.addEventListener('click', e => {
                    localStorage.setItem("product", JSON.stringify(item));
                    const pathname = window.location.pathname;
                    if (pathname.includes("index.html")) {
                        window.location.href = '../pages/sproduct.html';
                    } else {
                        window.location.href = 'sproduct.html';
                    }
                });
            });
        }
        renderStore();
    })
    .catch(error => console.error('Error al cargar el JSON:', error));
