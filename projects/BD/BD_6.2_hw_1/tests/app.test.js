const {
  getAllEmployees, getEmployeeById, addNewEmployee
} = require("../index.js");

const { app } = require("../index.js");

const http = require("http");

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

  test("getAllEmployees should return a list of employees", () => {
    const mockEmployees = [
      { authorId: 1, name: "George Orwell", book: "1984" },
      { authorId: 2, name: "Aldous Huxley", book: "Brave New World" },
      { id: 3, name: "Sam Johnson", position: "Designer" },
    ];

    getAllEmployees.mockReturnValue(mockEmployees);

    let employees = getAllEmployees();
    expect(employees.length).toBe(3);
    expect(employees).toEqual(mockEmployees);
    expect(getAllEmployees).toHaveBeenCalled();
  });

  test("getEmployeeById should return employee details of specified Id", () => {
    let mockEmployee = {
      authorId: 2,
      name: "Aldous Huxley",
      book: "Brave New World",
    };

    getEmployeeById.mockReturnValue(mockEmployee);

    let employee = getEmployeeById(2);
    expect(employee).toEqual(mockEmployee);
    expect(getEmployeeById).toHaveBeenCalledWith(2);
  });

  test("getEmployeeById should return undefined if employee not found", () => {
    getEmployeeById.mockReturnValue(undefined);

    let employee = getEmployeeById(2000);
    expect(employee).toBeUndefined();
expect(getEmployeeById).toHaveBeenCalledWith(2000);
  });

  test("addNewEmployee should add a new employee", () => {
    const mockNewEmployee = {
      authorId: 4,
      name: "Atharva koli",
      book: "Whenever life get you down",
    };

    addNewEmployee.mockReturnValue(mockNewEmployee);

    let newEmployee = addNewEmployee(mockNewEmployee);
    expect(newEmployee).toEqual(mockNewEmployee);
    expect(addNewEmployee).toHaveBeenCalledWith(mockNewEmployee);
  });
});
