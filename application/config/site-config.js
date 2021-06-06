import getCollections from './page/collections';
import getGeneralConfig from './page/general-config';
import getHomePage from './page/home-page';
import getSiteLogo from './page/site-logo';
import getStylesheets from './page/stylesheets';
import getScripts from './page/scripts';

function siteConfig(url) {
    let config = Object.assign({},
        getSiteLogo(),
        getGeneralConfig(),
        getStylesheets(url),
        getScripts(url)
    );

    switch (url) {
        case '/':
            Object.assign(config, getHomePage());
            break;
        case '/collections':
            Object.assign(config, getCollections());
            break;
    }

    return config;
}

export default siteConfig