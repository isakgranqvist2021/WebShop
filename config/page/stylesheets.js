function getStylesheets(url) {
    if (url.includes('?'))
        url = url.substring(0, url.indexOf('?'));

    switch (url) {
        case '/': return { stylesheets: ['hero-section.min.css'] };
        case '/sign-in': return { stylesheets: ['form.min.css'] };
        case '/sign-up': return { stylesheets: ['form.min.css'] };
        case '/collections': return { stylesheets: ['collections.min.css', 'page.min.css'] };
        case '/products': return { stylesheets: ['page.min.css'] }
        default: return { stylesheets: [] };
    }
}

export default getStylesheets;