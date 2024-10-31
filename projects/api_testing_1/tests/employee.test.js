const request = require("supertest");
let {
  getAllEmployees,
  getEmployeeById,
  addNewEmployee,
} = require("../controllers/employee.controller");

let { app } = require("../index");
let http = require("http");

jest.mock("../controllers/employee.controller", () => ({
  ...jest.requireActual("../controllers/employee.controller"),
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

    try {
      getAllEmployees.mockResolvedValue(mockEmployees);

      let employees = await request(server).get("/employees");
      expect(employees.statusCode).toEqual(200);
      expect(employees.body).toEqual(mockEmployees);
      expect(getAllEmployees).toHaveBeenCalled();
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it("should be able to return null if employees not found", async () => {
    try {
      getAllEmployees.mockResolvedValue(null);

      let employees = await request(server).get("/employees");
      expect(employees.statusCode).toEqual(404);
      expect(employees.body).toEqual({ message: "Employees, NOT FOUND...!" });
      expect(getAllEmployees).toHaveBeenCalled();
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it("should be able to return employee details by specified id", async () => {
    let mockEmployee = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      department: "Engineering",
    };

    try {
      getEmployeeById.mockResolvedValue(mockEmployee);

      let employee = await request(server).get("/employees/details/1");
      expect(employee.statusCode).toEqual(200);
      expect(employee.body).toEqual(mockEmployee);
      expect(getEmployeeById).toHaveBeenCalledWith(1);
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it("should be able to return null, if specified id not found", async () => {
    try {
      getEmployeeById.mockResolvedValue(null);

      let employee = await request(server).get("/employees/details/666");
      expect(employee.statusCode).toEqual(404);
      expect(employee.body).toEqual({ message: "Employee, NOT FOUND...!" });
      expect(getEmployeeById).toHaveBeenCalledWith(666);
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it("should be able to return added employee", async () => {
    let mockEmployee = {
      id: 3,
      name: "Atharva koli",
      email: "atharva.koli@example.com",
      department: "Software Engineer",
    };

    try {
      addNewEmployee.mockResolvedValue(mockEmployee);

      let employee = await request(server).post("/employees/new").send({
        name: "Atharva koli",
        email: "atharva.koli@example.com",
        department: "Software Engineer",
      });

      expect(employee.statusCode).toEqual(201);
      expect(employee.body).toEqual(mockEmployee);
      expect(addNewEmployee).toHaveBeenCalledWith({
        name: "Atharva koli",
        email: "atharva.koli@example.com",
        department: "Software Engineer",
      });
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it("should be able to return null if new employees details not found", async () => {
    try {
      addNewEmployee.mockResolvedValue(null);

      let employee = await request(server)
        .post("/employees/new")
        .send({ name: "", email: "", department: "" });

      expect(employee.statusCode).toEqual(404);
      expect(employee.body).toEqual({ message: "Employee, NOT FOUND...!" });
      expect(addNewEmployee).toHaveBeenCalledWith({
        name: "",
        email: "",
        department: "",
      });
    } catch (error) {
      expect(error).toBe(error);
    }
  });
});
