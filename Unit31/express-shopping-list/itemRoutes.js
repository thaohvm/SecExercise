const express = require("express");
const router = new express.Router();
// const items = require("./fakeDb");
const ExpressError = require("./expressError")
const middleware = require("./middleware");

const ITEMS = [{"name": "popsicle", "price": 1.45}, {"name":"cheerios", "price": 3.40}]

router.get('/', (req, res) => {
    res.json({ items: ITEMS })
})

router.post('/', middleware.validateData, (req,res, next) => {
    try {
        items.forEach( (item) => {
            if (item.name == req.body.name) throw new ExpressError('Item name already exists',404);
        });
        items.push(req.body);
        res.status(201).json({added: req.body});
    } catch(e) {
        return next(e);
    };
});

module.exports = router;
