let { app, validateEmployee, validateCompany } = require("../index");
let request = require("supertest");
let http = require("http");

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});
afterAll((done) => {
  server.close(done);
});

describe("Employees Endpoint Testing", () => {
  it("POST /api/employees should be able to return null if input employee details are VALID", async () => {
    let res = await request(server)
      .post("/api/employees")
      .send({ name: "Atharva koli", companyId: 1 });
    expect(res.status).toEqual(201);
    expect(res.body).toEqual({ id: 1, name: "Atharva koli", companyId: 1 });
  });

  it("POST /api/employees should be able to return 400 status if input employee details are INVALID", async () => {
    let res = await request(server)
      .post("/api/employees")
      .send({ name: 1, companyId: 1 });
    expect(res.status).toEqual(400);
    expect(res.text).toEqual("Name is required and it should be string");
    expect(res.body).toEqual({});
  });

  it("POST /api/companies should be able to return null if input companies details are VALID", async () => {
    let res = await request(server)
      .post("/api/companies")
      .send({ name: "Atharva koli IT SERVICES pvt ltd" });
    expect(res.status).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      name: "Atharva koli IT SERVICES pvt ltd",
    });
  });

  it(" POST /api/companies should be able to return 400 status if input companies details are INVALID", async () => {
    let res = await request(server).post("/api/companies").send({ name: 1111 });
    expect(res.status).toEqual(400);
    expect(res.text).toEqual(
      "Company name is required and it should be string"
    );
    expect(res.body).toEqual({});
  });
});

describe("Validation Functions Testing", () => {
  it("should be able to return null for employees VALID input", () => {
    expect(validateEmployee({ name: "Atharva koli", companyId: 1 })).toBeNull();
  });

  it("should be able to return error message for input employee details are in INVALID", () => {
    expect(validateEmployee({ name: "Atharva koli" })).toEqual(
      "Company Id is required and it should be string"
    );
    expect(validateEmployee({ companyId: 1 })).toEqual(
      "Name is required and it should be string"
    );
  });

  it("should be able to return null for companies valid input", () => {
    expect(
      validateCompany({ name: "Atharva koli IT SERVICES pvt ltd" })
    ).toBeNull();
  });

  it("should be ablr to return error  message for input company details are in INVALID", () => {
    expect(validateCompany({ name: 786 })).toEqual(
      "Company name is required and it should be string"
    );
  });
});
