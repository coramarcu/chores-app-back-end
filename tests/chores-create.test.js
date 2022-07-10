const { expect } = require("chai");
const request = require("supertest");
const getDB = require("../src/services/db");
const app = require("../src/app");

describe("create chore", () => {
  let db;
  beforeEach(async () => (db = await getDB()));
  afterEach(async () => {
    await db.query("DELETE FROM Chores");
    await db.close();
  });

  describe("/chores", () => {
    describe("POST", () => {
      console.log("Hello Test!");
      it("creates a new chore in the database", async () => {
        const res = await request(app).post("/chores").send({
          name: "Chore 1",
          price: 5,
        });

        expect(res.status).to.equal(201);

        const [[choreEntries]] = await db.query(
          `SELECT * FROM Chores WHERE name = 'Chore 1'`
        );

        expect(choreEntries.name).to.equal("Chore 1");
        expect(choreEntries.price).to.equal(5);
      });
    });
  });
});
