const { expect } = require("chai");
const request = require("supertest");
const getDB = require("../src/services/db");
const app = require("../src/app");
const { all } = require("../src/app");

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
      it("gets all chores from the database", async () => {
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
          `INSERT INTO Chores (choreID, name, price, status, familyID, owner) VALUES (1, "do dishes", 10, "active", 22, 2)`
        );
        await db.query(
          `INSERT INTO Chores (choreID, name, price, status, familyID, owner) VALUES (2, "do laundry", 15, "pending", 22, 1)`
        );

        const res = await request(app).get("/family/22/chores");

        expect(res.status).to.equal(200);

        const [allChores] = await db.query(
          `SELECT * FROM Chores WHERE familyID = 22`
        );

        console.log(`FROM GET CHORES TEST: ` + allChores);
        console.log(Array.isArray(allChores));

        expect(allChores[0].choreID).to.equal(1);
        expect(allChores[1].name).to.equal("do laundry");
      });
    });
  });
});
