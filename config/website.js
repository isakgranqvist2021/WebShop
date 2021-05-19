import getCollections from './page/collections';
import getGeneralConfig from './page/general-config';
import getHomePage from './page/home-page';
import getSiteLogo from './page/site-logo';
import getStylesheets from './page/stylesheets';

function websiteConfig(url) {
    let config = Object.assign({}, getSiteLogo(), getGeneralConfig(), getStylesheets(url));

    switch (url) {
        case '/':
            Object.assign(config, getHomePage());
            break;
        case '/collections':
            Object.assign(config, getCollections());
            break;

        default: Object.assign(config, { stylesheets: [] })
    }

    return config;
}

export default websiteConfig