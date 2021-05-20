import siteConfig from './site-config';

function setupConfig(req, res, next) {
    req.headers.config = siteConfig(req.originalUrl);
    return next();
}

export default { setupConfig };