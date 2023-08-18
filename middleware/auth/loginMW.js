/**
 * - If no POST data received, calls next.
 * - Receives 2 form fields (username and password).
 * - Asks the DB if this user exists.
 *     -  If the user exists, check if the input password matches the password in the DB.
 *         -  If the passwords are matching, store in session that user logged in, and redirect to /images.
 *         - Else show error message (res.locals error) and next()
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {

        //not enough parameter
        if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            return next();
        }

        //lets find the user
        userModel.findOne({
            email: req.body.email
        }, function (err, result) {
            if ((err) || (!result)) {
                res.tpl.error.push('Your email address is not registered!');
                return next();
            }

            //check password
            if (result.password !== req.body.password) {
                res.tpl.error.push('Wrong password!');
                return next();
            }

            //login is ok, save id to session
            req.session.userid = result._id;

            //redirect to / so the app can decide where to go next
            return res.redirect('/');
        });
    };

};