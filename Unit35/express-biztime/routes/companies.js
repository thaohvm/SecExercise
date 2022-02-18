const express = require('express');
const slugify = require("slugify");
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
        let code = slugify(name, {lower: true});

        const results = await db.query(`
            INSERT INTO companies
            (code, name, description)
            VALUES ($1, $2, $3)
            RETURNING code, name, description`, [code,name,description]);
        if (results.rows.length === 0 ) {
            throw new ExpressError('Invalid data', 404);
        };
        return res.status(201).json({"company": results.rows[0]});
    } catch (err) {
        return next(err);
    };
});

router.patch('/:code', async (req, res, next) => {
    try {
        let code = req.params.code;
        const { name, description } = req.body;

        const results = await db.query(
            `UPDATE companies SET name = $1, description = $2
            WHERE code = $3
            RETURNING name, description, code`,
            [name, description, code]);
        if (results.rows.length === 0) {
            throw new ExpressError(`Could not update companies ${code}`, 404)
        }
        return res.json({company: results.rows[0]});
    } catch (err) {
        return next(err);
    }
})

router.delete('/:code', async (req, res, next) => {
    try {
        let code = req.params.code;

        const results = await db.query(`DELETE FROM companies
            WHERE code = $1
            RETURNING code`,[code]);

        if (results.rows.length == 0) {
            throw new ExpressError(`Cannot delete companies ${code}`, 404)
        }
        return res.json({"status": "deleted"});
    } catch (err) {
        return next(err);
    }
})

// Export
module.exports = router;
