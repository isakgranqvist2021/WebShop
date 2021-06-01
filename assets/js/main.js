import Clear from './Components/Clear';
import Form from './Components/Form';
import Products from './Components/Products';
import Select from './Components/Select';
import Sidenav from './Components/Sidenav';
import Slider from './Components/Slider';

// gets executed when the document has loaded
window.onload = () => {
    let currentURL = window.location.pathname;
    console.log(currentURL);

    new Clear().init();
    new Sidenav().init();

    if (currentURL === '/sign-in') {
        new Form().init();
    } else if (new RegExp(/(\/product\/[a-zA-Z0-9].*)/).test(currentURL)) {
        new Select().init();
        new Slider().init();
    } else if (currentURL === '/products') {
        new Products().init();
    }
}