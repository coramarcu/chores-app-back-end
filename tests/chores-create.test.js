const { expect } = require("chai");
const request = require("supertest");
const getDB = require("../src/services/db");
const app = require("../src/app");

describe("create chore", () => {
  let db;
  beforeEach(async () => (db = await getDB()));
  afterEach(async () => {
    await db.query("DELETE FROM Chores");
    await db.query("DELETE FROM Family");
    await db.query("DELETE FROM User");

    await db.close();
  });

  describe("/chores", () => {
    describe("POST", () => {
      it("creates a new chore in the database", async () => {
        await db.query(
          'INSERT INTO Family (familyID, familyName) VALUES (33, "Dickins")'
        );

        // actual test starts here
        const res = await request(app).post("/chores").send({
          name: "Chore 1",
          price: 5,
          status: "active",
          familyID: 33,
        });

        console.log(res.body);

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

    describe("GET", () => {
      it("gets all chores from the database", async () => {
        // make a Family so you can use familyID as FOREIGN KEY
        await db.query(
          'INSERT INTO Family (familyID, familyName) VALUES (22, "Marcu")'
        );
        await db.query(
          `INSERT INTO User (email, role, userID) VALUES ("email@email.com", "child", 2)`
        );
        await db.query(
          `INSERT INTO Chores (choreID, name, price, status, familyID, userID) VALUES (1, "do dishes", 10, "active", 22, 2)`
        );

        // actual test starts here
        const res = await request(app).get("/family/22/chores").send({
          familyID: 22,
          userID: 11,
        });

        console.log(res.body);
        expect(res.status).to.equal(200);

        // const [[choresEntries]] = await db.query(`SELECT * FROM Chores`);
      });
    });
  });
});
