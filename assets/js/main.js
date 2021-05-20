import clearQuery from './Components/ClearQuery';
import saveForm from './Components/SaveForm';
import listenForClicks from './Components/OpenSidenav';

// import toggleClass from './Components/ToggleClass';

// gets executed when the document has loaded
window.onload = function () {
    clearQuery(); // clear any queries in the address bar
    listenForClicks();

    switch (window.location.pathname) {
        case '/sign-up': return saveForm();

        default: return;
    }
}