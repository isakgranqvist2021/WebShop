import HTTP from '../Utils/HTTP';
import variantReducer from '../State/variant.reducer';

class Variants {
    constructor() {
        this.vc = document.getElementById('variant-color');
        this.sB = document.querySelector('.btn.btn-secondary');
        this.uI = document.getElementById('images');
        this.temp = {}
    }

    init() {
        this.uI.addEventListener('change', async (e) => {
            let fd = new FormData();
            fd.append('img', e.target.files[0]);

            const result = await HTTP.POST('/admin/add-product/upload-img', fd);
            this.temp["img"] = {
                src: result.data.filename,
                alt: 'Variant'
            };
        });

        this.sB.addEventListener('click', () => {
            variantReducer.dispatch({
                type: 'add',
                data: {
                    color: this.vc.value,
                    ...this.temp
                }
            });

            this.vc.value = null;
            this.uI.value = null;
            document.querySelector('#product_variant').classList.remove('active');
            document.querySelector('#product_information').classList.add('active');
            document.querySelector('#pi').classList.add('show', 'active');
            document.querySelector('#pv').classList.remove('show', 'active');
        });
    }
}

export default Variants;