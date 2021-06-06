const authScripts = [
    '/public/js/three.js',
    'https://apis.google.com/js/platform.js',
    '/public/js/google-auth.js',
    '/public/js/vanta.js',
    '/public/js/background.js'
];

function getScripts(url) {
    if (!url)
        return { scripts: [] }

    if (url.includes('?'))
        url = url.substring(0, url.indexOf('?'));

    if (new RegExp(/(\/product\/[a-zA-Z0-9].*)/).test(url))
        return { scripts: ['https://cdn.jsdelivr.net/npm/@splidejs/splide@latest/dist/js/splide.min.js'] };

    switch (url) {
        case '/sign-in': return { scripts: authScripts };
        case '/sign-up': return { scripts: authScripts };
        default: return { scripts: [] };
    }
}

export default getScripts;