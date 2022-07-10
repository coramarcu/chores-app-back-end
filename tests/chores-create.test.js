const { expect } = require("chai");
const request = require("supertest");
const app = require("../src/app");

describe("create chore", () => {
  describe("/chores", () => {
    describe("POST", () => {
      it("creates a new chore in the database", async () => {
        const res = await request(app).post("/chores").send({
          name: "Do dishes.",
          price: 5,
          status: true,
        });

        expect(res.status).to.equal(201);
        expect(res.body).to.equal({ result: "new chore is added!" });
      });
    });
  });
});
