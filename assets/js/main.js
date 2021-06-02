import Clear from './Components/Clear';
import Form from './Components/Form';
import Products from './Components/Products';
import Select from './Components/Select';
import Sidenav from './Components/Sidenav';
import Slider from './Components/Slider';
import Controls from './Components/Controls';

// gets executed when the document has loaded
window.onload = () => {
    new Clear().init();
    new Sidenav().init();

    if (window.location.pathname === '/sign-in') {
        new Form().init();

    } else if (new RegExp(/(\/product\/[a-zA-Z0-9].*)/).test(window.location.pathname)) {
        new Select().init();
        new Slider().init();

    } else if (window.location.pathname === '/products') {
        let s = new URLSearchParams(window.location.search);

        new Products(new Controls()).init(
            s.get('q') || 'all',
            s.get('page') || 1
        );
    }
}