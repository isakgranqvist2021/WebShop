function getStylesheets(url) {
    if (url.includes('?'))
        url = url.substring(0, url.indexOf('?'));

    if (new RegExp(/(\/product\/[a-zA-Z0-9].*)/).test(url))
        return { stylesheets: ['page.min.css'] };

    switch (url) {
        case '/': return { stylesheets: ['hero-section.min.css'] };
        case '/sign-in': return { stylesheets: ['form.min.css'] };
        case '/sign-up': return { stylesheets: ['form.min.css'] };
        case '/collections': return { stylesheets: ['page.min.css', 'collections.min.css'] };
        case '/products': return { stylesheets: ['page.min.css', 'products.min.css'] };
        case '/users/account': return { stylesheets: ['page.min.css'] };
        default: return { stylesheets: [] };
    }
}

export default getStylesheets;