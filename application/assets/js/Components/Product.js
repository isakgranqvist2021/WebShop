class Product {
    constructor(product) {
        this.product = product;
    }

    onSalePrice() {
        let mb = (100 - this.product.on_sale_percentage) / 100;
        return this.product.price * mb;
    }

    price() {
        if (this.product.on_sale) {
            return `
                <div class="price">
                    <span class="green">€${Math.round(this.onSalePrice())}</span>
                    <span class="red">€${this.product.price}</span>
                </div>`;
        }

        return `
        <div class="price">
            <span class="green">€${this.product.price}</span>
        </div>`;
    }

    template() {
        if (this.product.variants.length > 0) {
            return `
            <a href="/product/${this.product._id}">
                ${this.price()}
                <div class="product-img" style="background-image:url('/uploads/${this.product.variants[0].img.src}')" data-alt="${this.product.variants[0].img.alt}"></div>
            
                <div class="product-body">
                    <p>${this.product.title}</p>
                </div>
            </a>`;
        }
    }
}

export default Product;