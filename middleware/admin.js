
// Check the decoded user object to see if user is an Admin.
module.exports = function (req, res, next) {

    if (!req.user.isAdmin) return res.status(403).send("Access Denied");

    next();
}