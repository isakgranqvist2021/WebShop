function action(req, res) {
    if (req.session.uid === undefined) return res.redirect('/sign-in');

    req.session.destroy(function (err) {
        if (err) return res.redirect('/');

        return res.redirect('/sign-in' + '?success=see you later!');
    });
}

export default { action };