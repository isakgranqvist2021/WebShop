class Product {
    constructor(product) {
        this.product = product;
    }

    template() {
        return `
        <a href="/product/${this.product._id}">
            <span class="product-price">€${this.product.price}</span>
            <div class="product-img">
                <img src="${this.product.variants[0].img.src}" alt="${this.product.variants[0].img.alt}">
            </div>
            <div class="product-body">
                <p class="product-title">${this.product.title}</p>
            </div>
        </a>`;
    }
}

export default Product;