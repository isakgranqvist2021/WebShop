const collections = [
    {
        label: 'Shirts',

    }
]

function template(req, res) {
    return res.render('pages/collections', {
        title: 'Collections',
        config: req.headers.config,
        signedIn: req.session.uid != undefined ? true : false
    });
}

export default { template };