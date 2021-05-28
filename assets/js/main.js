import clearQuery from './Components/ClearQuery';
import saveForm from './Components/SaveForm';
import listenForClicks from './Components/OpenSidenav';

// import toggleClass from './Components/ToggleClass';

// gets executed when the document has loaded
window.onload = function () {
    clearQuery(); // clear any queries in the address bar
    listenForClicks();

    if (document.querySelector('.splide') != null) {
        new Splide('.splide', {
            type: 'loop',
            perPage: 3,
            perMove: 1,
        }).mount();

    }

    switch (window.location.pathname) {
        case '/sign-up': return saveForm();

        default: return;
    }
}