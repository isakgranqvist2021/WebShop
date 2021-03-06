import siteConfig from './site-config';
import userMethods from '../models/user.model';

function setupConfig(req, res, next) {
    req.headers.config = siteConfig(req.originalUrl);
    return next();
}

async function populateUser(req, res, next) {
    try {
        const user = await userMethods.findOneWithId(req.session.uid);
        req.session.user = user;
        return next();
    } catch (err) {
        req.session.destroy();
        return res.redirect('/');
    }
}

function isAdmin(req, res, next) {
    if (!req.session.user.admin) {
        return res.redirect('/');
    }

    return next();
}

export default { setupConfig, populateUser, isAdmin };