process.env.NOVE_ENV = "test";

const request = require("supertest");
const app = require("../app")
const db = require("../db");

let testInvoice;
let testCompany;

beforeEach(async () => {
    const company = await db.query(`
    INSERT INTO companies (code, name, description)
    VALUES ('apple', 'Apple', 'Maker of OSX.'),
    ('ibm', 'IBM', 'Big blue.')
           `);
    testCompany = company.rows[0];
    await db.query("SELECT setval('invoices_id_seq', 1, false)");
    const invoice = await db.query(
        `INSERT INTO invoices (comp_code, amt, paid, add_date, paid_date)
           VALUES ('apple', 100, false, '2022-02-15T08:00:00.000Z', null),
           ('ibm', 300, false, '2018-03-01', null)
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
                {
                    "id": 1,
                    "comp_code": 'apple'
                },
                { "id": 2, "comp_code": "ibm" },
            ]
        });
    });
});

describe('GET /invoices/1', () => {
    test('Gets invoice by id', async () => {
        const response = await request(app).get(`/invoices/1`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            "invoice": {
                "id": 1,
                "company": {
                    "code": 'apple',
                    "name": 'Apple',
                    "description": 'Maker of OSX.'
                },
                "amt": 100,
                "paid": false,
                "add_date": expect.any(String),
                "paid_date": null
            }
        });
    });
    test('Response 404 if cant find company', async () => {
        const response = await request(app).get(`/invoices/0`);
        expect(response.statusCode).toEqual(404);
    })
})

describe('POST / invoices', () => {
    test(`Create new invoices`, async () => {
        const response = await request(app)
            .post(`/invoices`)
            .send({
                comp_code: "apple",
                amt: 120,

            });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            "invoice": {
                id: 3,
                comp_code: "apple",
                amt: 120,
                add_date: expect.any(String),
                paid: false,
                paid_date: null,
            }
        });
    });
});

describe(`PUT /invoices/1`, () => {
    test(`Updates info of an invoice`, async () => {
        const response = await request(app)
        .put(`/invoices/1`)
        .send({"amt": 1000, "paid": false});
        // expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            "invoice": {
                id: 1,
                comp_code: 'apple',
                paid: false,
                amt: 1000,
                add_date: expect.any(String),
                paid_date: null,
            }
        });
    });
    test(`Response with 404 if cant find the invoice id`, async () => {
        const response = await request(app)
            .patch(`/invoices/99999`);
        expect(response.statusCode).toEqual(404);
    });
});

describe(`DELETE /invoices/1`, () => {
    test(`Deletes a single invoice`, async () => {
        const response = await request(app)
            .delete(`/invoices/1`);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            status: "deleted"
        });
    });
    test("Response with 404 for no invoices id", async () => {
        const response = await request(app)
            .delete("/invoices/999");
        expect(response.status).toEqual(404);
    });
})
