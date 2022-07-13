 const { expect } = require("chai");
 const request = require("supertest");
 const app = require("../src/app");

// describe("create family", () => {
//   describe("/family", () => {
//     describe("POST", () => {
//       it("creates a new family in the database", async () => {
//         const res = await request(app).post("/family").send({
//           name: "The Good Bunch",
//         });

//         expect(res.status).to.equal(201);
//       });
//     });
//   });
// });
