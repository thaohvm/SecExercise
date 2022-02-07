const express = require('express');
const ExpressError = require('./expressError');
const { calculateMean, calculateMedian, calculateMode } = require('./calculation');

const app = express();

app.get('/mean', function(req, res) {
    if (!res.query.nums) {
        throw new ExpressError("Query is incorrect")
    }
    let numsAsStrings = req.query.nums.split(',');

})

app.listen(3000, function() {
    console.log('App on port 3000');
})
