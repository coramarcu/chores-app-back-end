const { expect } = require("chai");
const request = require("supertest");
const getDB = require("../src/services/db");
const app = require("../src/app");

describe("create chore in the database", () => {
  let db;
  beforeEach(async () => (db = await getDB()));
  afterEach(async () => {
    await db.query("DELETE FROM Chores");
    await db.query("DELETE FROM Family");
    // await db.query("DELETE FROM User");

    await db.close();
  });

  describe("/chores", () => {
    describe("POST", () => {
      it("creates a new chore in the database", async () => {
        await db.query(
          'INSERT INTO Family (familyID, familyName) VALUES (33, "Dickins")'
        );

        const res = await request(app).post("/chores").send({
          name: "Chore 1",
          price: 5,
          status: "active",
          familyID: 33,
        });

        expect(res.status).to.equal(201);

        const [[choreEntries]] = await db.query(
          `SELECT * FROM Chores WHERE name = 'Chore 1'`
        );

        expect(choreEntries.name).to.equal("Chore 1");
        expect(choreEntries.price).to.equal(5);
        expect(choreEntries.status).to.equal("active");
        expect(choreEntries.familyID).to.equal(33);
      });
    });
  });
});
