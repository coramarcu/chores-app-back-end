const { expect } = require("chai");
const request = require("supertest");
const getDB = require("../src/services/db");
const app = require("../src/app");

describe("fetch all the chores belonging to a familyID from the database", () => {
  let db;
  beforeEach(async () => (db = await getDB()));
  afterEach(async () => {
    await db.query("DELETE FROM Chores");
    await db.query("DELETE FROM Family");
    await db.query("DELETE FROM User");

    await db.close();
  });

  describe("/family/:familyID/chores", () => {
    describe("GET", () => {
      xit("gets all chores from the database", async () => {
        await db.query(
          'INSERT INTO Family (familyID, familyName) VALUES (22, "Marcu")'
        );
        await db.query(
          `INSERT INTO User (email, role, userID) VALUES ("email@email.com", "child", 2)`
        );
        await db.query(
          `INSERT INTO User (email, role, userID) VALUES ("email@email.com", "child", 1)`
        );
        await db.query(
          `INSERT INTO Chores (choreID, name, price, status, familyID, userID) VALUES (1, "do dishes", 10, "active", 22, 2)`
        );
        await db.query(
          `INSERT INTO Chores (choreID, name, price, status, familyID, userID) VALUES (2, "do laundry", 15, "pending", 22, 1)`
        );

        const res = await request(app).get("/family/22/chores").send({
          familyID: 22,
          userID: 11,
        });

        // what the hell is this test even doing?

        console.log(res.body);
        expect(res.status).to.equal(200);
      });
    });
  });
});
