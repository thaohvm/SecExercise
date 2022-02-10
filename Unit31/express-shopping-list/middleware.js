const ExpressError = require("./expressError");

function validateData(req, res, next) {
    try {
        if ((!req.body.name) || (!req.body.price)) {
            throw new ExpressError("Invalid data", 404);
        } else {
            return next()
        }
    } catch (e) {
        return next(e)
    }
}

module.exports = { validateData }
