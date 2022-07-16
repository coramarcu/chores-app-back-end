const { expect } = require("chai");
const request = require("supertest");
const getDB = require("../src/services/db");
const app = require("../src/app");

describe("delete chore from the database", () => {
  let db;
  beforeEach(async () => (db = await getDB()));
  afterEach(async () => {
    // await db.query("DELETE FROM Chores");
    // await db.query("DELETE FROM Family");

    await db.close();
  });

  describe("/family/:familyID/chores/:choreID", () => {
    describe("DELETE", () => {
      it("deletes a given chore (by ID) from the database", async () => {
        await db.query(
          'INSERT INTO Family (familyID, familyName) VALUES (44, "Marcu")'
        );

        await db.query(
          `INSERT INTO Chores (choreID, name, price, status, familyID, owner) VALUES (1, "do dishes", 10, "active", 44, 2)`
        );

        const res = await request(app).delete("/family/44/chores/1").send();

        expect(res.status).to.equal(200);
      });
    });
  });
});
