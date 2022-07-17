const { expect } = require("chai");
const request = require("supertest");
const getDB = require("../src/services/db");
const app = require("../src/app");

describe("read users", () => {
  let db;
  beforeEach(async () => (db = await getDB()));
  afterEach(async () => {
    await db.query("DELETE FROM User");
    await db.query("DELETE FROM Family");

    await db.close();
  });

  describe("/family/:familyID/users", () => {
    describe("GET", () => {
      it("gets user by email", async () => {
        const familyRes = await request(app)
          .post("/family")
          .send({ familyName: "Obama" });

        const userRes = await request(app)
          .post(`/family/${familyRes.body.familyID}/users`)
          .send({ email: "cora@email.com", name: "Cora", role: "child" });

        const res = await request(app)
          .get(`/family/${familyRes.body.familyID}/users`)
          .send(userRes.body.userID);

        expect(res.status).to.equal(201);
        expect(res.body.userID).to.equal(userRes.body.userID);
      });
    });
  });
});
