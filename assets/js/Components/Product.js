class Product {
    constructor(product) {
        this.product = product;
    }

    template() {
        if (this.product.variants.length > 0) {
            return `
            <a href="/product/${this.product._id}">
                <span class="product-price">€${this.product.price}</span>
                <div class="product-img">
                    <img src="/uploads/${this.product.variants[0].img.src}" alt="${this.product.variants[0].img.alt}">
                </div>
                <div class="product-body">
                    <p class="product-title">${this.product.title}</p>
                </div>
            </a>`;
        }
    }
}

export default Product;