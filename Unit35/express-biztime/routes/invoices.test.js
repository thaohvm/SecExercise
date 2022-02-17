process.env.NOVE_ENV = "test";

const request = require("supertest");
const app = require("../app")
const db = require("../db");

let testInvoice;
let testCompany;

beforeEach(async () => {
    const company = await db.query(`
    INSERT INTO companies
    (code, name, description)
    VALUES ('amz', 'Amazon', 'AWS and Online Shopping')
    RETURNING code, name, description`);
    testCompany = company.rows[0];

    const invoice = await db.query(`
    INSERT INTO invoices
    (comp_code, amt)
    VALUES ('amz', 120)
    RETURNING id, comp_code, amt, add_date, paid, paid_date`);
    testInvoice = invoice.rows[0];
    testInvoice.add_date = new Date(testInvoice.add_date).toJSON();
    testInvoice.company = testCompany;
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
        expect(response.body).toEqual({invoices: [{id: testInvoice.id, comp_code: testInvoice.comp_code}]});
    });
});

// describe('GET /companies/:code', () => {
//     test('Get a single company detail', async () => {
//         const response = await request(app).get(`/companies/${testCompany.code}`);
//         expect(response.statusCode).toEqual(200);
//         expect(response.body).toEqual({
//             company: {
//                 code: testCompany.code,
//                 name: testCompany.name,
//                 description: testCompany.description
//             }
//         });
//     })
//     test('Response 404 if cant find company', async () => {
//         const response = await request(app).get(`/companies/0`);
//         expect(response.statusCode).toEqual(404);
//     })
// })

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
