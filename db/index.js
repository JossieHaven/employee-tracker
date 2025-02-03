const pool = require('./connection.js'); // connection pool to manage databases connections without opening a new one every query.

//We are encapsulating all database-related operations.
class DB {
    constructor() {}

//async/await to avoid blocking the program
    async query(sql, args = []) {
        const client = await pool.connect();
        try {
            const result = await client.query(sql, args);
            return result;
        } finally {
            client.release();
        }

    }

    //Fetching all employee details.
    //LEFT JOIN combines data from multiple tables even if a record does not have a related entry.

    findAllEmployees() {
        return this.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;");
    }

    //Adding new employees to database
    //Added SQL injection prevention , using $1, $2, $3, $4 with the related values in the array which helps prevent SQL injection attacks.

    addOneEmployee(firstName, lastName, roleId, managerId) {
        return this.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1,$2,$3,$4)", [firstName, lastName, roleId, managerId]);
    }

    //Updating employee info based on employee ID.

    updateOneEmployee(employeeId, newData) {
        const { first_name, last_name, role_id, manager_id } = newData;
        return this.query("UPDATE employee SET first_name = $1, last_name = $2, role_id = $3, manager_id = $4 WHERE id = $5", [first_name, last_name, role_id, manager_id, employeeId]);
    }

    //Managing roles and departments. viewRole and ViewDepartment will fetch roles/departments. - addRoles and addDepratments will add new roles/departments

    viewRole() {
        return this.query("SELECT * FROM role");
    }

    addRoles(titleName, salaryAmount, departmentId) {
        return this.query("INSERT INTO role (title, salary, department_id) VALUES ($1,$2,$3)", [titleName, salaryAmount, departmentId]);
    }

    viewDepartment() {
        return this.query("SELECT * FROM department");
    }

    addDepartment(departmentName) {
        return this.query("INSERT INTO department (name) VALUES ($1)",[departmentName]);
    }

    //Terminate Node.js process. 

    quitNow() {
        return process.exit();
    }

}

//Exporting to be used on other modules
module.exports = new DB();
