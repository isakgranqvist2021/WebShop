function template(req, res) {
    res.render('pages/home', {
        signedIn: req.session.uid != undefined ? true : false
    });
}

export default { template };