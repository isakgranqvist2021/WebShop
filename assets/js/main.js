import clearQuery from './Components/ClearQuery';
import saveForm from './Components/SaveForm';
// import toggleClass from './Components/ToggleClass';

// gets executed when the document has loaded
window.onload = function () {
    clearQuery(); // clear any queries in the address bar

    switch (window.location.pathname) {
        case '/sign-up': return saveForm();

        default: return;
    }
}