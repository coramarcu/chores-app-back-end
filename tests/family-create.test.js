const { expect } = require("chai");
const request = require("supertest");
const getDB = require("../src/services/db");
const app = require("../src/app");
const { type } = require("os");

describe("create family", () => {
  let db;
  beforeEach(async () => (db = await getDB()));
  afterEach(async () => {
    await db.query("DELETE FROM Family");
    await db.close();
  });

  describe("/family", () => {
    describe("POST", () => {
      it("creates a new family in the database", async () => {
        const res = await request(app).post("/family").send({
          familyName: "The Smiths",
        });

        const [[familyQuery]] = await db.query(
          `SELECT * FROM Family ORDER BY familyID DESC LIMIT 1`
        );

        expect(res.status).to.equal(201);

        expect(res.body.familyID).to.equal(familyQuery.familyID);
        expect(res.body.familyName).to.equal(familyQuery.familyName);
      });
    });
  });
});
