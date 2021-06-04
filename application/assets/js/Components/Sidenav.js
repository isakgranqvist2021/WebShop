class Sidenav {
    constructor() {
        this.enableDropdowns();
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

    enableDropdowns() {
        window.addEventListener('click', () => {
            document.querySelectorAll(`[data-dropdown]`)
                .forEach(dd => dd.classList.remove('open'));
        });

        document.querySelectorAll('[data-toggle]').forEach(dt => {
            dt.addEventListener('click', (e) => {
                let dd = document.querySelector(`[data-dropdown=${dt.getAttribute('data-toggle')}]`);
                dd.classList.contains('open') ? dd.classList.remove('open') : dd.classList.add('open');

                let toClose = document.querySelectorAll(`[data-dropdown]`);
                toClose.forEach(tc => {
                    if (tc.getAttribute('data-dropdown') != dd.getAttribute('data-dropdown')) {
                        tc.classList.remove('open');
                    }
                })
            });
        });
    }
}

export default Sidenav;