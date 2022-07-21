const { expect } = require("chai");
const request = require("supertest");
const getDB = require("../src/services/db");
const app = require("../src/app");

describe("create a user in the database", () => {
  let db;
  beforeEach(async () => (db = await getDB()));
  afterEach(async () => {
    await db.query("DELETE FROM User");
    await db.query("DELETE FROM Family");

    await db.close();
  });

  describe("/family/:familyID/users", () => {
    describe("POST", () => {
      it("first parent creates a user in the database (based on familyID)", async () => {
        await db.query(
          'INSERT INTO Family (familyID, familyName) VALUES (999, "Potter")'
        );

        const res = await request(app).post("/family/999/users").send({
          email: "parentOne@email.com",
          name: "Parent One",
        });

        expect(res.status).to.equal(201);

        const [[userEntries]] = await db.query(
          `SELECT * FROM User WHERE email = "parentOne@email.com"`
        );

        expect(userEntries.name).to.equal("Parent One");
      });
    });
  });
});
