class Sidenav {
    constructor() {

    }

    init() {
        this.nav = document.querySelector('nav');
        this.bars = document.querySelector('.open-sidenav');

        if (this.bars != null) {
            this.bars.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openSidenav();
            });
        }

        if (this.nav != null) {
            this.nav.addEventListener('click', (e) =>
                e.stopPropagation());
        }

        if (document != null) {
            document.addEventListener('click', () => {
                this.bars.classList.remove('isOpen');
                this.nav.classList.remove('isOpen');
            });
        }
    }

    toggleClass(element, className) {
        element.classList.contains(className) ?
            element.classList.remove(className) :
            element.classList.add(className);
    }

    openSidenav() {
        if (this.nav != null)
            this.toggleClass(this.nav, 'isOpen');


        if (this.bars != null)
            this.toggleClass(this.bars, 'isOpen');
    }
}

export default Sidenav;