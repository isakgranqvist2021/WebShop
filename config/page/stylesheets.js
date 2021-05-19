function getStylesheets(url) {
    switch (url) {
        case '/': return { stylesheets: ['hero-section.min.css'] };
        case '/sign-in': return { stylesheets: ['form.min.css'] };
        case '/sign-up': return { stylesheets: ['form.min.css'] };
        case '/collections': return { stylesheets: ['collections.min.css'] };
        default: return { stylesheets: [] };
    }
}

export default getStylesheets;