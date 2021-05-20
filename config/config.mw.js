import siteConfig from './site-config';

function setupConfig(req, res, next) {
    console.log('Request incomming:', req.originalUrl);
    // console.log(req.body);

    req.headers.config = siteConfig(req.originalUrl);
    return next();
}

export default { setupConfig };