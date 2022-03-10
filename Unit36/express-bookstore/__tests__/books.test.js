process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const db = require('../db');
const Book = require('../models/book');

beforeEach( async function() {
    await Book.create({
        "isbn": "0691161518",
        "amazon_url": "http://a.co/eobPtX2",
        "author": "Matthew Lane",
        "language": "english",
        "pages": 264,
        "publisher": "Princeton University Press",
        "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
        "year": 2017
    });
});

afterEach( async () => {
    await db.query(`DELETE FROM books`);
})

afterAll( async () => {
    db.end();
});

describe('Test GET /books to retrive all books', () => {
    test('GET all books', async () => {
        const response = await request(app).get('/books');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({books: [{
            "isbn": "0691161518",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Matthew Lane",
            "language": "english",
            "pages": 264,
            "publisher": "Princeton University Press",
            "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
            "year": 2017
        }]});
    });
});

describe('Test GET /books:id to retrieve book by isbn', () => {
    test('GET book my isbn', async () => {
        const response = await request(app).get('/books/0691161518');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            book: {
                "isbn": "0691161518",
                "amazon_url": "http://a.co/eobPtX2",
                "author": "Matthew Lane",
                "language": "english",
                "pages": 264,
                "publisher": "Princeton University Press",
                "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                "year": 2017
            }
            });
    });
});

describe('TEST POST /books to add book', () => {
    test('POST book to add book', async () => {
        const response = await request(app).post('/books')
        .send({
            "isbn": "1245167243",
            "amazon_url": "http://a.co/eobFtZ1def",
            "author": "F. Scott Fitzergald",
            "language": "spanish",
            "pages": 99,
            "publisher": "Penguin Press",
            "title": "The Great Gatsby",
            "year": 1928
        });
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({
            book: {
                "isbn": "1245167243",
                "amazon_url": "http://a.co/eobFtZ1def",
                "author": "F. Scott Fitzergald",
                "language": "spanish",
                "pages": 99,
                "publisher": "Penguin Press",
                "title": "The Great Gatsby",
                "year": 1928
            }
        });
    });
    test('Throws error for missing field isbn', async () => {
        const response = await request(app).post('/books')
        .send({
            "amazon_url": "http://a.co/eobFtZ1def",
            "author": "F. Scott Fitzergald",
            "language": "spanish",
            "pages": 99,
            "publisher": "Penguin Press",
            "title": "The Great Gatsby",
            "year": 1928
        });
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({
            "error": {
                message: ["instance requires property \"isbn\""],
                status: 404
            },
            "message": ["instance requires property \"isbn\""]
        });
    });
    test('Throws error for incorrect formats', async () => {
        const response = await request(app).post('/books')
        .send({
            "isbn": "1245167243",
            "amazon_url": "eobFtZ1def",
            "author": "F. Scott Fitzergald",
            "language": "spanish",
            "pages": -53,
            "publisher": "Penguin Press",
            "title": "The Great Gatsby",
            "year": 1928
        });
        console.log(response.body);
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({
            "error": {
                message: ["instance.pages must be greater than or equal to 0"],
                status: 404
            },
            "message": ["instance.pages must be greater than or equal to 0"]
        });
    });
});

describe('Test PUT "/books/:isbn', () => {
    test('Test PUT "/books/:isbn" to update a book', async () => {
        const response = await request(app).put("/books/0691161518")
        .send({
            "amazon_url": "http://a.co/eobFtZ1def",
            "author": "F. Scott Fitzergald",
            "language": "spanish",
            "pages": 99,
            "publisher": "Penguin Press",
            "title": "The Great Gatsby",
            "year": 1928
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            book: {
                "isbn": "0691161518",
                "amazon_url": "http://a.co/eobFtZ1def",
                "author": "F. Scott Fitzergald",
                "language": "spanish",
                "pages": 99,
                "publisher": "Penguin Press",
                "title": "The Great Gatsby",
                "year": 1928
            }
        });
    });
    test('Test throws error for missing field', async () => {
        const response = await request(app).put("/books/0691161518")
        .send({
            "amazon_url": "http://a.co/eobFtZ1def",
            "language": "spanish",
            "pages": 99,
            "publisher": "Penguin Press",
            "title": "The Great Gatsby",
            "year": 1928
        });
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({
            "error": {
                message: ["instance requires property \"author\""],
                status: 404
            },
            "message": ["instance requires property \"author\""]
        });
    });
});


describe('Test DELETE "/books/:isbn"', () => {
    test('Test DELETE "/books/:isbn" to delete a book', async () => {
        const response = await request(app).delete('/books/0691161518');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: 'Book deleted'});
    });
});
