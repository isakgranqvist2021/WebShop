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
            Promise.reject(err);
        }
    }

    async refresh(q, p) {
        this.data = await this.loadProducts(q, p);
        this.render(this.data.result.docs);

        let url = new URL(window.location);
        url.searchParams.set('page', p);
        window.history.pushState({}, '', url);

        return await Promise.resolve({
            hasPrevPage: this.data.result.hasPrevPage,
            hasNextPage: this.data.result.hasNextPage,
            page: this.data.result.page,
            prevPage: this.data.result.prevPage,
            nextPage: this.data.result.nextPage
        });
    }

    async init(q, p) {
        this.data = await this.loadProducts(q, p);
        this.render(this.data.result.docs);

        this.cC.innerHTML = this.controls.template({
            hasPrevPage: this.data.result.hasPrevPage,
            hasNextPage: this.data.result.hasNextPage,
            page: this.data.result.page,
            prevPage: this.data.result.prevPage,
            nextPage: this.data.result.nextPage
        });
        this.controls.addEventListeners();
    }

    render(products) {
        this.pC.innerHTML = products.map(product =>
            new Product(product).template()).join('');
    }
}

export default Products;