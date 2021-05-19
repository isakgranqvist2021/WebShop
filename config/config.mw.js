import website from './website';

function setupConfig(req, res, next) {
    req.headers.config = { ...website(req.url) };

    return next();
}

export default { setupConfig };