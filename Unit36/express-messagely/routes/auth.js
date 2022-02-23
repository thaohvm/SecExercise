const jwt = require("jsonwebtoken");
const Router = require("express").Router;
const router = new Router();

const User = require("../models/user");
const {SECRET_KEY, DB_URI} = require("../config");
const ExpressError = require("../expressError");
const { route } = require("../app");

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

route.post('/login', async (req, res, next) => {
    try {
        let { username, password } = req.body;
        if (!username || !password) {
            throw new ExpressError("Invalid credentials", 400);
        }
        const auth = await User.authenticate(username, password)
        if (auth) {
            let token = jwt.sign({username}, SECRET_KEY);
            User.updateLoginTimestamp(username);
            return res.json({token});
        } else {
            throw new ExpressError("Invalid username/password", 400);
        }
    } catch (err) {
        return next(err);
    };
});

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
