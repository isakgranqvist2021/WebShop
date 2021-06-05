import HTTP from '../Utils/HTTP';

class Admin {
    constructor() {
        this.deleteBtn = document.getElementById('delete-product');
        this.updateBtn = document.getElementById('save-updates');
        this.productId = document.getElementById('pid').value;
    }

    init() {
        if (this.deleteBtn != null) {
            this.deleteBtn.addEventListener('click', () => this.deleteProduct());
        }

        if (this.updateBtn != null) {
            this.updateBtn.addEventListener('click', () => this.updateProduct());
        }
    }

    async deleteProduct() {
        const response = await HTTP.GET('/admin/delete-product/' + this.productId)
        if (response.success) {
            window.location = '/admin/add-product' + '?success=' + response.message;
        } else {
            alert('error!');
        }
    }

    async updateProduct() {
        const response = await HTTP.POST('/admin/update-product/' + this.productId, JSON.stringify({
            title: document.querySelector('h1').textContent,
            description: [document.querySelector('.product-description').textContent.trim()],
            price: document.querySelector('.green').textContent.replace('€', '')
        }), { 'Content-Type': 'application/json' })

        if (response.success) {
            let url = new URLSearchParams(window.location.search);
            url.set('success', response.message);
            window.location.search = url;
        } else {
            alert('error!')
        }
    }
}

export default Admin;

