import variantReducer from '../State/variant.reducer';
import Alerts from './Alerts';
import HTTP from '../Utils/HTTP';

class Create {
    constructor() {
        this.product = {
            title: '',
            price: 10,
            product_collection: '',
            description: [],
            on_sale: false,
            variants: []
        }
        this.sB = document.querySelector('.btn.btn-primary');
    }

    init() {
        this.sB.addEventListener('click', () => this.submit());

        variantReducer.subscribe(() => {
            this.product.variants.push(variantReducer.getState().data);
            let vC = document.getElementById('product-variants');
            vC.innerHTML = null;
            this.product.variants.forEach(v => {
                let img = document.createElement('img');
                img.src = '/uploads/' + v.img.src;
                img.alt = v.img.alt;
                vC.appendChild(img);
                img.addEventListener('click', () => {
                    this.product.variants.splice(this.product.variants.findIndex(v => v.img.src === img.src));
                    img.remove();
                });
            });
        });

    }

    async submit() {
        let data = {
            title: document.getElementById('title').value,
            price: document.getElementById('price').value,
            product_collection: document.getElementById('product_collection').value,
            description: [document.getElementById('description').value],
            on_sale: document.getElementById('on_sale').checked,
            variants: this.product.variants
        }

        try {
            const result = await HTTP.POST('/admin/add-product', JSON.stringify(data), { 'Content-Type': 'application/json' });
            document.querySelector('form').reset();
            document.getElementById('product-variants').innerHTML = null;

            new Alerts().displayAlert({
                type: 'success',
                message: result.message
            });
            let a = document.getElementById('view-product')
            a.textContent = 'View Product';
            a.href = '/product/' + result.data._id;

        } catch (err) {
            return Promise.reject(err);
        }
    }
}

export default Create;