const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressError');
const db = require('../db');
const { query } = require('express');

router.get('/', async (req, res, next) => {
    try {
        const results = await db.query(`
            SELECT id, comp_code
            FROM invoices
            ORDER by id`
        );
        return res.status(200).json({ "invoices": results.rows });
    } catch (err) {
        return next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        const results = await db.query(
            `SELECT i.id,
                    i.comp_code,
                    i.amt,
                    i.paid,
                    i.add_date,
                    i.paid_date,
                    c.name,
                    c.description
             FROM invoices AS i
               INNER JOIN companies AS c ON (i.comp_code = c.code)
             WHERE id = $1`,
            [id]);
        if (results.rows.length === 0) {
            throw new ExpressError(`Invoice ${id} cannot be found`, 404);
        }

        const data = results.rows[0];
        const invoice = {
            id: data.id,
            company: {
                code: data.comp_code,
                name: data.name,
                description: data.description,
            },
            amt: data.amt,
            paid: data.paid,
            add_date: data.add_date,
            paid_date: data.paid_date,
        };

        return res.json({ "invoice": invoice });
    } catch (err) {
        return next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { comp_code, amt } = req.body;
        const results = await db.query(`
        INSERT INTO invoices (comp_code, amt)
        VALUES ($1, $2)
        RETURNING id, comp_code, amt, paid, add_date, paid_date`,
            [comp_code, amt]);
        if (results.rows.length === 0) {
            throw new ExpressError(`Invalid data`, 404)
        }
        return res.json({ "invoice": results.rows[0] })
    } catch (err) {
        return next(err)
    }
})

module.exports = router;
