import clearQuery from './Components/ClearQuery';
import saveForm from './Components/SaveForm';
// import toggleClass from './Components/ToggleClass';
import vantaSetup from './Components/VantaSetup';

// gets executed when the document has loaded
window.onload = function () {
    clearQuery(); // clear any queries in the address bar

    switch (window.location.pathname) {
        case '/sign-up': return saveForm();
        case '/': return vantaSetup();

        default: return;
    }
}