const { expect } = require("chai");
const request = require("supertest");
const getDB = require("../src/services/db");
const app = require("../src/app");

describe("update chore in the database", () => {
  let db;
  beforeEach(async () => (db = await getDB()));
  afterEach(async () => {
    await db.query("DELETE FROM Chores");
    await db.query("DELETE FROM Family");

    await db.close();
  });

  describe("/family/:familyID/chores/:choreID", () => {
    describe("PATCH", () => {
      it("updates a given chore (by ID) in the database,", async () => {
        await db.query(
          'INSERT INTO Family (familyID, familyName) VALUES (22, "Marcu")'
        );
        await db.query(
          `INSERT INTO Chores (choreID, name, price, status, familyID, owner) VALUES (1, "do dishes", 10, "active", 22, 2)`
        );

        const res = await request(app).patch("/family/22/chores/1").send({
          name: "walk dog",
          price: 15,
          status: "pending",
          owner: 7,
        });

        console.log(res.body + "<-- this is test log");

        expect(res.status).to.equal(200);

        const [[updatedChore]] = await db.query(
          "SELECT * FROM Chores WHERE choreID = 1"
        );

        expect(updatedChore.name).to.equal("walk dog");
        expect(updatedChore.price).to.equal(15);
        expect(updatedChore.status).to.equal("pending");
        expect(updatedChore.owner).to.equal(7);
      });
    });
  });
});
