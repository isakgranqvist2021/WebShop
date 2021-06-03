import HTTP from '../Utils/HTTP';
import Product from './Product';

class Products {
    constructor(controls) {
        this.pC = document.querySelector('#app-products');
        this.cC = document.querySelector('#app-controls');
        this.data = null;
        this.controls = controls;
    }

    async loadProducts(q, p) {
        try {
            const result = await HTTP.GET(`/api/products?q=${q}&page=${p}`);
            return Promise.resolve(result);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async refresh(q, p) {
        this.data = await this.loadProducts(q, p);
        this.render(this.data.result.docs);

        let url = new URL(window.location);
        url.searchParams.set('page', p);
        url.searchParams.set('q', q);

        window.history.pushState({}, '', url);

        return await Promise.resolve(this.data);
    }

    async init(q, p) {
        this.data = await this.loadProducts(q, p);
        this.render(this.data.result.docs);

        this.cC.innerHTML = this.controls.template(this.data);
        this.controls.addEventListeners();
    }

    render(products) {
        this.pC.innerHTML = products.map(product =>
            new Product(product).template()).join('');
    }
}

export default Products;