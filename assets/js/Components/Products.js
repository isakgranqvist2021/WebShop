import HTTP from '../Utils/HTTP';

class Products {
    constructor() {
        this.pC = document.querySelector('.products');
        this.data = null;
    }

    async loadProducts(q, p) {
        try {
            const result = await HTTP.GET(`/api/products?q=${q}&page=${p}`);
            return Promise.resolve(result);
        } catch (err) {
            Promise.reject(err);
        }
    }

    async init() {
        let s = new URLSearchParams(window.location.search);
        let args = [s.get('q') || 'all', s.get('page') || 1];

        this.data = await this.loadProducts(...args);

        this.render(this.data.result.docs.map(product => {
            return this.assemble(product);
        }));
    }

    assemble(product) {
        let a = document.createElement('a');
        let price = document.createElement('span');
        let pI = document.createElement('div');
        let img = document.createElement('img');
        let body = document.createElement('div');
        let pT = document.createElement('p');

        price.className = 'product-price';
        price.textContent = `€${product.price}`;
        pI.className = 'product-img';
        img.src = product.variants[0].img.src
        body.className = 'product-body';
        pT.className = 'product-title';
        pT.textContent = product.title;

        a.appendChild(price);
        pI.appendChild(img);
        a.appendChild(pI);
        body.appendChild(pT);
        a.appendChild(pT);

        return a;
    }

    render(products) {
        products.forEach(product => {
            this.pC.appendChild(product);
        });
    }
}

export default Products;

/*
<a href="/product/<%= product._id %>">
    <span class="product-price">€<%= product.price %></span>

    <div class="product-img">
        <img src="<%= product.variants[0].img.src %>" alt="<%= product.variants[0].img.alt %>" class="p-focused" id="<%= product._id %>" loading="lazy">
    </div>
    <div class="product-body">
        <p class="product-title"><%= product.title %></p>
    </div>
</a>
*/