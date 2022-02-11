const express = require("express");
const router = new express.Router();
const items = require("./fakeDb");
const ExpressError = require("./expressError")
const middleware = require("./middleware");
const { request } = require("express");

// const ITEMS = [{"name": "popsicle", "price": 1.45}, {"name":"cheerios", "price": 3.40}]

router.get('/', (req, res) => {
    res.json({ items: items })
})

router.post('/', middleware.validateData, (req, res, next) => {
    try {
        if (req.body.name === items.name) {
            throw new ExpressError("Items have been existed", 404)
        }
        items.push(req.body);
        res.json({ added: req.body })
    } catch (e) {
        return next(e);
    }
});

router.get('/:name', (req, res, next) => {
    const requestedItem = items.find(item => item.name === req.params.name);
    try {
        if (!requestedItem) {
            throw new ExpressError("Item is not exist!", 404);
        } else {
            return res.json({ requestedItem })
        };
    } catch(e) {
        return next(e)
    }
});

router.patch('/:name', (req, res, next) => {
    let requestedItem = items.find(item => item.name === req.params.name);
    try {
        if (!requestedItem) {
            throw new ExpressError("Item is not exist!", 404);
        } else {
            requestedItem.name = req.body.name;
            requestedItem.price = req.body.price;
            return res.json({ updated: req.body })
        }
    } catch(e) {
        return next(e)
    }
})

router.delete('/:name', (req, res, next) => {
    let itemIndex = items.findIndex(item => item.name === req.params.name);
    try {
        if (itemIndex === -1)  {
            throw new ExpressError("Item is not exist!", 404);
        } else {
            items.splice(itemIndex, 1)
            return res.json({ message: "deleted" });
        }
    } catch(e) {
        return next(e);
    }
})

module.exports = router;
