const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
    //check to see if user is authenticated and the grant him/her access to modify the data
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send("Access Denied No token provided..");

    //decode to see whether the right user wants update data.
    try {
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
        req.user = decoded;
        next();

    } catch (error) {
        res.status(400).send("Invalid Token");
    }
}