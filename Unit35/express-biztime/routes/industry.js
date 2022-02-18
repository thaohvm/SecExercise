const express = require('express');

const router = new express.Router();
const ExpressError = require('../expressError');
const db = require('../db');

router.get('/', async (req,res,next) => {
    try {
        const industryRes = await db.query(`
            SELECT *
            FROM industries`);

        const industryPromises = industryRes.rows.map(async (industry) => {
            const companies = await db.query(`
                SELECT comp_code
                FROM company_industries
                JOIN industries
                ON company_industries.ind_code = industries.code
                WHERE ind_code = $1`,[industry.code]
            );
            const compCodes = companies.rows.map(codeObj => {
                return codeObj.comp_code;
            })
            industry.companies = compCodes;
            return industry;
        });
        const industries = await Promise.all(industryPromises);
        console.log(industries);
        return res.status(200).json({industries: industries})
    } catch(err) {
        return next(err);
    };
});

module.exports = router;
