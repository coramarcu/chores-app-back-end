const { expect } = require("chai");
const request = require("supertest");
const getDB = require("../src/services/db");
const app = require("../src/app");

describe("update user in the database", () => {
  beforeEach(async () => (db = await getDB()));
  afterEach(async () => {
    await db.query("DELETE FROM User");
    await db.query("DELETE FROM Family");

    await db.close();
  });

  describe("/family/:familyID/users/:userID", () => {
    describe("PATCH", () => {
      it("updates a user name in the database by userID", async () => {
        // create a family in database
        const familyRes = await request(app)
          .post("/family")
          .send({ familyName: "Obama" });

        // create a user in the new family
        const userRes = await request(app)
          .post(`/family/${familyRes.body.familyID}/users`)
          .send({ email: "cora@email.com", name: "Cora", role: "child" });

        // update the new user
        const res = await request(app)
          .patch(
            `/family/${familyRes.body.familyID}/users/${userRes.body[0].userID}`
          )
          .send({ name: "Pisoi" });

        expect(res.status).to.equal(201);

        const [[updatedUser]] = await db.query(
          `SELECT * FROM User WHERE userID = ${userRes.body[0].userID}`
        );

        expect(updatedUser.name).to.equal("Pisoi");
      });

      it("updates a user firebaseID in the database by userID", async () => {
        // create a family in database
        const familyRes = await request(app)
          .post("/family")
          .send({ familyName: "Obama" });

        // create a user in the new family
        const userRes = await request(app)
          .post(`/family/${familyRes.body.familyID}/users`)
          .send({ email: "cora@email.com", name: "Cora", role: "child" });

        // update the new user
        const res = await request(app)
          .patch(
            `/family/${familyRes.body.familyID}/users/${userRes.body[0].userID}`
          )
          .send({ firebaseID: "Firebase Pass" });

        expect(res.status).to.equal(201);

        const [[updatedUser]] = await db.query(
          `SELECT * FROM User WHERE userID = ${userRes.body[0].userID}`
        );

        expect(updatedUser.firebaseID).to.equal("Firebase Pass");
      });
    });
  });
});
