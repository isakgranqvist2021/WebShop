import website from './website';

function setupConfig(req, res, next) {
    req.headers.config = website(req.originalUrl);

    console.log(req.headers.config);

    return next();
}

export default { setupConfig };