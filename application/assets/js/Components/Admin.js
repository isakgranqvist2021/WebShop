class Admin {
    constructor() {
        this.form = document.querySelector('.update-product-form');
        this.osp = document.querySelector('.osp');
    }

    init() {
        let btn = document.querySelector('.toggle-edit-form');

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle()
        });

        this.form.addEventListener('click', (e) => e.stopPropagation());

        window.addEventListener('click', () => {
            if (this.form.classList.contains('show')) {
                this.toggle();
            }
        });

        document.querySelector('.form-check').addEventListener('change', (e) => {
            e.target.checked ?
                this.osp.classList.remove('d-none') :
                this.osp.classList.add('d-none')
        })
    }

    toggle() {
        this.form.classList.contains('show') ?
            this.form.classList.remove('show') :
            this.form.classList.add('show');
    }
}

export default Admin;

