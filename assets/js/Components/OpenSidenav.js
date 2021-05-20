const nav = document.querySelector('nav');
const bars = document.querySelector('.open-sidenav');

function _openSidenav() {
    if (nav != null)
        _toggleClass(nav, 'isOpen');


    if (bars != null)
        _toggleClass(bars, 'isOpen');


    return;
}

function _toggleClass(element, className) {
    element.classList.contains(className) ?
        element.classList.remove(className) :
        element.classList.add(className);

    return;
}

export default function () {
    if (bars != null) {
        bars.addEventListener('click', (e) => {
            e.stopPropagation();
            _openSidenav();
        });
    }

    if (nav != null) {
        nav.addEventListener('click', (e) =>
            e.stopPropagation());
    }

    if (document != null) {
        document.addEventListener('click', () => {
            bars.classList.remove('isOpen');
            nav.classList.remove('isOpen');
        });
    }

    return;
};