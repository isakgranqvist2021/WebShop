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

    console.log(messages);
    window.history.pushState({}, document.title, window.location.pathname);
})();

(function () {
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

    let hsContent = document.querySelector('.content.container');
    if (hsContent != null)
        setTimeout(() => hsContent.classList.add('show'), 1000)

})();

(function () {
    if (window.location.pathname === '/sign-up') {
        const form_data = sessionStorage.getItem('form_data');

        let email = document.getElementById('email'),
            first_name = document.getElementById('first_name'),
            last_name = document.getElementById('last_name')

        if (form_data != null) {
            let form_data_parsed = JSON.parse(form_data);

            email.value = form_data_parsed.email,
                first_name.value = form_data_parsed.first_name,
                last_name.value = form_data_parsed.last_name
        }

        (function () {
            let submitBtn = document.querySelector('.btn-primary');
            submitBtn.addEventListener('click', function (e) {
                window.sessionStorage.setItem('form_data', JSON.stringify({
                    email: email.value,
                    first_name: first_name.value,
                    last_name: last_name.value
                }));

                document.querySelector('.row.g-3').submit();
            });
        })();

    } else if (window.location.pathname != '/sign-up') {

        (function () {
            try {
                sessionStorage.removeItem('form_data');
            } catch (err) {
                return;
            }

        })();
    }

})();

window.addEventListener('scroll', () =>
    window.scrollY > 0 ? navbar.classList.remove('isTop') : navbar.classList.add('isTop'));