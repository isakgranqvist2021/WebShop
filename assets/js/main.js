const messages = [];
const navbar = document.querySelector('nav');

(function () {
    const query = new URLSearchParams(window.location.search);

    messages.push(...[{ // error messages will be removed from the url and moved into the messages array
        type: 'error',
        message: query.get('err')
    }, {
        type: 'success',
        message: query.get('success')
    }]);

    window.history.pushState({}, document.title, window.location.pathname);
})();

if (document.querySelector('.hero-section') != null) {
    VANTA.GLOBE({
        el: '.hero-section',
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xffffff,
        backgroundColor: 0x212529
    });
}

window.addEventListener('scroll', () =>
    window.scrollY > 0 ? navbar.classList.remove('isTop') : navbar.classList.add('isTop'));