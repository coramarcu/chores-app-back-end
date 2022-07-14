const { expect } = require("chai");
const request = require("supertest");
const getDB = require("../src/services/db");
const app = require("../src/app");

describe("User logging in", () => {
    let db;
    beforeEach(async () => (db = await getDB()));
    afterEach(async () => {
      await db.query("DELETE FROM User");
      await db.close();
    });

  describe(".", () => {
    describe("POST", () => {
      it("signs a user in"));
        const res = await request(app).post("/login").send({
            email: "user@example.com",
            password: "password",
        });
        console.log(res.body);
        expect (res.body);
        expect (res.status).equal(201);

        const [[signInUser]] = await db.query(
            `SELECT * FROM User WHERE email = 'user@example.com'`
        );
        
        console.log(signInUser);
        expect (signInUser.email).to.equal("user@example.com");
        expect (signInUser.password).to.equal("password"); 
    });
     

describe("create User", () => {
  let db;
  beforeEach(async () => (db = await getDB()));
  afterEach(async () => {
    await db.query("DELETE FROM User");
    await db.close();
  });

  describe("/User", () => {
    describe("POST", () => {
      it("creates a new user in the database", async () => {
        const res = await request(app).post("/signup").send({
          email: "default@example.com",
          name: "Jez",
          Role: "Adult",
          status: "",
          familyID: "1",

        });
        console.log(res.body);
        expect(res.status).to.equal(201);

        const [[choreEntries]] = await db.query(
          `SELECT * User Chores WHERE name = 'Chore 1'`
        );

        console.log(choreEntries.price);
        expect(choreEntries.name).to.equal("Chore 1");
        expect(choreEntries.price).to.equal(5);
        expect(choreEntries.status).to.equal("active");
        expect(choreEntries.owner).to.equal(2);
        expect(choreEntries.familyID).to.equal(10);
      });
    });
  });
});