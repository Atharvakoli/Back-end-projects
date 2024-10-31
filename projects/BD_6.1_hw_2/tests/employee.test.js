const { describe } = require("node:test");
const { getAllEmployees, getEmployeeById, addNewEmployee } = require("../employee.controller");


describe("Employee Functions", () => {
  it("should be able to get all Employees", () => {
    let employees = getAllEmployees(); 
    expect(employees.length).toBe(4);
    expect(employees).toEqual([
                               { id: 1, name: 'John Doe', position: 'Software Engineer' },
                               { id: 2, name: 'Jane Smith', position: 'Product Manager' },
                               { id: 3, name: 'Sam Johnson', position: 'Designer' },
                               { id: 4, name: 'Lisa Brown', position: 'DevOps Engineer' }
                             ]);
  });

  it("should be able to get an employee by id", () => {
    let employee = getEmployeeById(4);
    expect(employee).toEqual({ id: 4, name: 'Lisa Brown', position: 'DevOps Engineer' });
  })

  it('should be able to find non-existing employee', () => {
    let employee = getEmployeeById(45);
    expect(employee).toBeUndefined();
  })

  it('should be able to add a new employee', () => {
    let newEmployee = {name: 'Atharva koli', position: 'Software Engineer'};

    let addEmployee = addNewEmployee(newEmployee);
    expect(addEmployee).toEqual({id: 5, name: 'Atharva koli', position: 'Software Engineer'});

    let employees = getAllEmployees();
    expect(employees.length).toBe(5);
    expect(employees).toEqual([
                                { id: 1, name: 'John Doe', position: 'Software Engineer' },
                                { id: 2, name: 'Jane Smith', position: 'Product Manager' },
                                { id: 3, name: 'Sam Johnson', position: 'Designer' },
                                { id: 4, name: 'Lisa Brown', position: 'DevOps Engineer' }, {id: 5, name: 'Atharva koli', position: 'Software Engineer'}
                              ]);
  })
  
})