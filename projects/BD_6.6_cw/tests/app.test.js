const request = require("supertest");
const http = require("http");
const { getAllEmployees } = require("../controllers");
const { app } = require("../index");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllEmployees: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Controllers Function Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all employee", () => {
    let mockEmployees = [
      {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: "Ankit Verma",
        email: "ankit.verma@example.com",
        departmentId: 1,
        roleId: 3,
      },
    ];

    getAllEmployees.mockReturnValue(mockEmployees);

    let employee = getAllEmployees();
    expect(employee).toEqual(mockEmployees);
    expect(employee.length).toBe(3);
  });
});

describe("API Endpoint tests", () => {
  it("GET /employees should get all employees", async () => {
    let res = await request(server).get("/employees");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      employees: [
        {
          employeeId: 1,
          name: "Rahul Sharma",
          email: "rahul.sharma@example.com",
          departmentId: 1,
          roleId: 1,
        },
        {
          employeeId: 2,
          name: "Priya Singh",
          email: "priya.singh@example.com",
          departmentId: 2,
          roleId: 2,
        },
        {
          employeeId: 3,
          name: "Ankit Verma",
          email: "ankit.verma@example.com",
          departmentId: 1,
          roleId: 3,
        },
      ],
    });
    expect(res.body.employees.length).toBe(3);
  });

  it("GET /employees/details/:id should get and employee by ID", async () => {
    const res = await request(server).get("/employees/details/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      employee: {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
    });
  });
});
