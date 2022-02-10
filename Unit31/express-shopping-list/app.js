const express = require('express');
const ExpressError = require('./expressError');
const itemRoutes = require("./itemRoutes");
const fakeDb = require("./fakeDb")
const app = express();


app.use(express.json());

app.use('/items', itemRoutes);

// 404 handler
app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not found", 404);
    return next(notFoundError)
});

// Error handler
app.use((err, req, res, next) => {
    let status = err.status || 500;
    let message = err.message;

    return res.status(status).json({
        error : {message, status}
    });
});

module.exports = app;
