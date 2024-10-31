let request = require("supertest");
let {
  getEmployees,
  getEmployeeById,
  getDepartmentById,
  getDepartments,
} = require("../employees");
let { app } = require("../index");
let http = require("http");

jest.mock("../employees", () => ({
  ...jest.requireActual("../employees"),
  getEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
  getDepartmentById: jest.fn(),
  getDepartments: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Employees Functions Error Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /api/employees should be able to return 404 if list not found", async () => {
    getEmployees.mockReturnValue([]);

    let response = await request(server).get("/api/employees");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("Employees, Not Found");
  });
  it("GET /api/employees/:id should be able to return 404 for non-existing id", async () => {
    getEmployeeById.mockReturnValue(null);

    let response = await request(server).get("/api/employees/777");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Employee not found");
  });
  it("GET /api/departments should be able to return 404 if list not found", async () => {
    getDepartments.mockReturnValue([]);

    let response = await request(server).get("/api/departments");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("departments, not found");
  });
  it("GET /api/departments/:id should be able to return 404 for non-existing id", async () => {
    getDepartmentById.mockReturnValue(null);

    let response = await request(server).get("/api/departments/88");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("department, not found");
  });
});
