process.env.NOVE_ENV = "test";

const request = require("supertest");
const { response } = require("../app");
const app = require("../app")
const db = require("../db");

let testCompany;

beforeEach(async () => {
    let company = await db.query(`
    INSERT INTO companies
    (code, name, description)
    VALUES ('amz', 'Amazon', 'AWS and Online Shopping')
    RETURNING code, name, description`);
    testCompany = company.rows[0];
});

afterEach(async () => {
    // delete any data created by test
    await db.query(`DELETE FROM companies`);
});

afterAll(async () => {
    // close db connection
    await db.end();
});

// Test company routes
describe('GET /companies', () => {
    test('Get all companies', async () => {
        const response = await request(app).get('/companies');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
            {companies: [{
                code: testCompany.code,
                name: testCompany.name,
                description: testCompany.description
            }]
        });
    });
});

describe('GET /companies/:code', () => {
    test('Get a single company detail', async () => {
        const response = await request(app).get(`/companies/${testCompany.code}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            company: {
                code: testCompany.code,
                name: testCompany.name,
                description: testCompany.description
            }
        });
    })
    test('Response 404 if cant find company', async () => {
        const response = await request(app).get(`/companies/0`);
        expect(response.statusCode).toEqual(404);
    })
})

describe('POST / companies', () => {
    test(`Create new company`, async () => {
        const response = await request(app)
        .post(`/companies`)
        .send({
            code: "apple",
            name: "Apple Computer",
            description: "Maker of OSX"
        });
        expect(response.statusCode).toEqual(201);
        expect(response.body).toEqual({
            company: {
                code: "apple",
                name: "Apple Computer",
                description: "Maker of OSX"
            }
        });
    });
});
