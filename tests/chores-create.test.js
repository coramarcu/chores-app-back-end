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
      it("creates a new chore in the database", async () => {
        // make a family post request so you can use familyID as FOREIGN KEY
        await db.query(`CREATE TABLE IF NOT EXISTS Family(
          familyID INT PRIMARY KEY AUTO_INCREMENT,
          familyName VARCHAR(25) NOT NULL
         )`);
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
  });
});
