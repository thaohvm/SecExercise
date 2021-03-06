process.env.NODE_ENV = "test";
const request = require("supertest");
const express = require('express');
const app = require("./app");
let items = require("./fakeDb");

let item = { name: "lollipop", price: 200 }

beforeEach(function() {
    items.push(item);
});

afterEach(function() {
    // make sure this *mutates*, not redefines, similar to items = []
    items.length = 0;
});

/** GET /items - returns `{items: [item, ...]}` */

describe('GET /items', function() {
    test('Get all items', async () => {
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);
        expect(items).toHaveLength(1);
        expect(resp.body).toEqual({items: [
            {name: 'lollipop', price: 200}
        ]});
    });
});
// end

/** POST /items - create item from data; return `{item: item}` */

describe("POST /items", async function () {
    test("Creates a new item", async function () {
      const response = await request(app)
        .post(`/items`)
        .send({
          name: "Taco",
          price: 0
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.item).toHaveProperty("name");
      expect(response.body.item).toHaveProperty("price");
      expect(response.body.item.name).toEqual("Taco");
      expect(response.body.item.price).toEqual(0);
    });
  });
// end


/** GET /items/[name] - return data about one item: `{item: item}` */

describe("GET /items/:name", async function () {
    test("Gets a single item", async function () {
      const response = await request(app).get(`/items/${item.name}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.item).toEqual(item);
    });

    test("Responds with 404 if can't find item", async function () {
      const response = await request(app).get(`/items/0`);
      expect(response.statusCode).toBe(404);
    });
  });
// end

/** PATCH /items/[name] - update item; return `{item: item}` */

describe("PATCH /items/:name", async function () {
    test("Updates a single item", async function () {
      const response = await request(app)
        .patch(`/items/${item.name}`)
        .send({
          name: "Troll"
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.item).toEqual({
        name: "Troll"
      });
    });

    test("Responds with 404 if can't find item", async function () {
      const response = await request(app).patch(`/items/0`);
      expect(response.statusCode).toBe(404);
    });
  });
// end


/** DELETE /items/[name] - delete item,
   *  return `{message: "item deleted"}` */

describe("DELETE /items/:name", async function () {
    test("Deletes a single a item", async function () {
      const response = await request(app)
        .delete(`/items/${item.name}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: "deleted" });
    });
});
  // end
