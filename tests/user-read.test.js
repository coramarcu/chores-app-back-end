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

  describe("/family/users", () => {
    describe("GET", () => {
      it("gets user by email", async () => {
        // create a family in database
        const familyRes = await request(app)
          .post("/family")
          .send({ familyName: "Obama" });

        // create a user in the new family
        const userRes = await request(app)
          .post(`/family/${familyRes.body.familyID}/users`)
          .send({ email: "cora@email.com", name: "Cora", role: "child" });

        // get the new user
        const res = await request(app)
          .get(`/family/users?email=${userRes.body[0].email}`)

        expect(res.status).to.equal(201);
        expect(res.body[0].userID).to.equal(userRes.body[0].userID);
      });

      it("gets user by role", async () => {
        const familyRes = await request(app)
          .post("/family")
          .send({ familyName: "Obama" });

        const userRes = await request(app)
          .post(`/family/${familyRes.body.familyID}/users`)
          .send({ email: "cora@email.com", name: "Cora", role: "child" });

        const res = await request(app)
          .get(`/family/users?familyID=${familyRes.body.familyID}&role=${userRes.body[0].role}`)

        expect(res.status).to.equal(201);
        expect(res.body[0].role).to.equal(userRes.body[0].role);
      });
    });
  });
});
