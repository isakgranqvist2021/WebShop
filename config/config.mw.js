import website from './website';

function setupConfig(req, res, next) {
    req.headers.config = website(req.originalUrl);

    return next();
}

export default { setupConfig };