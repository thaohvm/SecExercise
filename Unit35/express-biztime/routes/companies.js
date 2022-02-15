const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressError');
const db = require('../db');

router.get('/', async (req ,res ,next) => {
    try {
        const results = await db.query(`SELECT * FROM companies`);
        return res.status(200).json({companies: results.rows});
    } catch (err) {
        return next(err);
    }
});

router.get('/:code', async (req, res, next) => {
    try {
        let code = req.params.code;
        const compResult = await db.query(`SELECT * FROM companies WHERE code = $1`, [code]);

        if (compResult.rows.length === 0) {
            throw new ExpressError(`Companies ${code} not found`, 404);
        }

        return res.json({ "company" : compResult.rows[0] })

    } catch (err) {
        return next(err);
    }
})

router.post('/', async (req,res,next) => {
    try {
        const {code, name, description} = req.body;
        const results = await db.query(`
            INSERT INTO companies
            (code, name, description)
            VALUES ($1, $2, $3)
            RETURNING code, name, description`, [code,name,description]);
        if (results.rows.length === 0 ) {
            throw new ExpressError('Error creating resource', 404);
        };
        return res.status(201).json({"company": results.rows[0]});
    } catch (err) {
        return next(err);
    };
});



// Export
module.exports = router;
