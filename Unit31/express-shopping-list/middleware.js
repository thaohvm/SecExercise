const ExpressError = require("./expressError");

function validateData(req, res, next) {
    try {
        if ((!req.query.name) || (!req.query.price)) {
            throw new ExpressError("Invalid data", 402);
        } else {
            return next()
        }
    } catch (e) {
        return next(e)
    }
}

module.exports = { validateData }
