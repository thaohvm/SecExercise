process.env.NOVE_ENV = "test";

const request = require("supertest");
const app = require("../app")
const db = require("../db");

let testInvoice;
let testCompany;

beforeEach(async () => {
    const company = await db.query(`
    INSERT INTO companies (code, name, description)
    VALUES ('apple', 'Apple', 'Maker of OSX.')
           `);
    testCompany = company.rows[0];

    const invoice = await db.query(
        `INSERT INTO invoices (comp_code, amt, paid, add_date, paid_date)
           VALUES ('apple', 100, false, '2022-02-15T08:00:00.000Z', null)
           RETURNING id`);
    testInvoice = invoice.rows[0];
});

afterEach(async () => {
    // delete any data created by test
    await db.query(`DELETE FROM companies`);
    await db.query(`DELETE FROM invoices`);
});

afterAll(async () => {
    // close db connection
    await db.end();
});

// // Test invoices routes
describe('GET /invoices', () => {
    test('Get all invoices', async () => {
        const response = await request(app).get('/invoices');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            invoices: [
                {"id": testInvoice.id,
                "comp_code": 'apple'}
            ]
        });
    });
});

describe('GET /invoices/:id', () => {
    test('Gets invoice by id', async () => {
        const response = await request(app).get(`/invoices/${testInvoice.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            "invoice": {
                "id": testInvoice.id,
                "company": {
                    "code": 'apple',
                    "name": 'Apple',
                    "description": 'Maker of OSX.'
                },
                "amt": 100,
                "paid": false,
                "add_date": "2022-02-15T08:00:00.000Z",
                "paid_date": null
            }
        });
    });
    test('Response 404 if cant find company', async () => {
        const response = await request(app).get(`/invoices/0`);
        expect(response.statusCode).toEqual(404);
    })
})

// describe('POST / companies', () => {
//     test(`Create new company`, async () => {
//         const response = await request(app)
//             .post(`/companies`)
//             .send({
//                 code: "apple",
//                 name: "Apple Computer",
//                 description: "Maker of OSX"
//             });
//         expect(response.statusCode).toEqual(201);
//         expect(response.body).toEqual({
//             company: {
//                 code: "apple",
//                 name: "Apple Computer",
//                 description: "Maker of OSX"
//             }
//         });
//     });
// });

// describe(`PATCH /companies/:code`, () => {
//     test(`Updates part of info of a single company`, async () => {
//         const response = await request(app)
//             .patch(`/companies/amz`)
//             .send({ name: 'Amazon', description: 'NewDescrip' });
//         expect(response.statusCode).toEqual(200);
//         expect(response.body).toEqual({
//             company: {
//                 code: 'amz',
//                 name: 'Amazon',
//                 description: 'NewDescrip'
//             }
//         });
//     });
//     test(`Response with 404 if cant find the company`, async () => {
//         const response = await request(app)
//             .patch(`/companies/notACompany`);
//         expect(response.statusCode).toEqual(404);
//     });
// });

// describe(`DELETE /companies/:code`, () => {
//     test(`Deletes a single company`, async () => {
//         const response = await request(app)
//             .delete(`/companies/amz`);
//         expect(response.statusCode).toEqual(200);
//         expect(response.body).toEqual({
//             status: "deleted"
//         });
//     });
// })
