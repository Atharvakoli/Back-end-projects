const request = require("supertest");
let {
  app,
  getAllEmployees,
  getEmployeeById,
  addNewEmployee,
} = require("../index.js");

let http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAllEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
  addNewEmployee: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Employees Functions Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should be able to return all employees", async () => {
    let mockEmployees = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        department: "Engineering",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        department: "Marketing",
      },
    ];

    getAllEmployees.mockResolvedValue(mockEmployees);

    let employees = await request(server).get("/employees");
    expect(employees.statusCode).toEqual(200);
    expect(employees.body).toEqual(mockEmployees);
  });

  it("should be able to return employee details by specified id", async () => {
    let mockEmployee = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      department: "Engineering",
    };

    getEmployeeById.mockResolvedValue(mockEmployee);

    let employee = await request(server).get("/employees/details/1");
    expect(employee.statusCode).toEqual(200);
    expect(employee.body).toEqual(mockEmployee);
  });

  it("should be able to return null, if specified id not found", async () => {
    getEmployeeById.mockResolvedValue(null);

    let employee = await request(server).get("/employees/details/666");
    expect(employee.statusCode).toEqual(404);
    expect(employee.body).toEqual({ message: "Employee, NOT FOUND...!" });
  });

  it("should be able to return added employee", async () => {
    let mockEmployee = {
      id: 3,
      name: "Atharva koli",
      email: "atharva.koli@example.com",
      department: "Software Engineer",
    };

    addNewEmployee.mockResolvedValue(mockEmployee);

    let employee = await request(server).post("/employees/new").send({
      name: "Atharva koli",
      email: "atharva.koli@example.com",
      department: "Software Engineer",
    });

    expect(employee.statusCode).toEqual(201);
    expect(employee.body).toEqual(mockEmployee);
  });
});
