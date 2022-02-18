/** BizTime express application. */


const express = require("express");

const app = express();
const ExpressError = require("./expressError")

app.use(express.json());

const companyRoutes = require("./routes/companies");
const invoicesRoutes = require("./routes/invoices");
const industryRoutes = require("./routes/industry");

// Routes

app.use('/companies',companyRoutes);
app.use('/invoices',invoicesRoutes);
app.use('/industry',industryRoutes);

/** 404 handler */

app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});


module.exports = app;
