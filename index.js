import inquirer from 'inquirer';
const db = require('./db'); // Import functions from db.js which contains all database functions.

async function mainMenu() {
  let exit = false;
  while (!exit) { //will keep running until uer selects "Exit"
    try {
      const { action } = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do today?',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit',
          ],
        },
      ]);

      switch (action) {
        case 'View all departments':
          await viewAllDepartments();
          break;
        case 'View all roles':
          await viewAllRoles();
          break;
        case 'View all employees':
          await viewAllEmployees();
          break;
        case 'Add a department':
          await addDepartment();
          break;
        case 'Add a role':
          await addRole();
          break;
        case 'Add an employee':
          await addEmployee();
          break;
        case 'Update an employee role':
          await updateEmployeeRole();
          break;
        case 'Exit':
          console.log("Goodbye!");
          await db.pool.end(); // Close DB connection
          exit = true; // Stops loop
          break;
      }
    } catch (err) {
      console.error("OOPS! An error has occurred:", err);
    }
  }
}
//read operations: fetching data from psql and displaying the data in a table format inside the terminal.
async function viewAllDepartments() {
  try {
    const departments = await db.getAllDepartments();
    console.table(departments);
  } catch (err) {
    console.error('Error: Unable to fetch departments:', err);
  }
}

async function viewAllRoles() {
  try {
    const roles = await db.getAllRoles();
    console.table(roles);
  } catch (err) {
    console.error('Error: Unable to fetch roles:', err);
  }
}

async function viewAllEmployees() {
  try {
    const employees = await db.getAllEmployees();
    console.table(employees);
  } catch (err) {
    console.error('Error: Unable to fetch employees:', err);
  }
}

// Create operations/adding data.
//Prompts user to insert new data
async function addDepartment() {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the new department name:',
    },
  ]);

  try {
    await db.addDepartment(name);
    console.log(`Added ${name} to the database seccessfully!`);
  } catch (err) {
    console.error('Error adding new department:', err);
  }
}
//Add Role with department selection
async function addRole() {
  try {
    const departments = await db.getAllDepartments();
    const departmentChoices = departments.map((dept) => ({
      name: dept['Department Name'],
      value: dept['Department ID'],
    }));

    const { title, salary, department_id } = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the name of the new role:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter salary value for the new role:',
      },
      {
        type: 'list',
        name: 'department_id',
        message: 'Select the correct department for the new role:',
        choices: departmentChoices,
      },
    ]);

    await db.addRole(title, parseFloat(salary), department_id);
    console.log(`Added ${title} to the database successfully!`);
  } catch (err) {
    console.error('Error adding role:', err);
  }
}
//Add employee with role and manager selection.
async function addEmployee() {
  try {
    const roles = await db.getAllRoles();
    const roleChoices = roles.map((role) => ({
      name: role['Job Title'],
      value: role['Role ID'],
    }));

    const employees = await db.getAllEmployees();
    const managerChoices = employees.map((emp) => ({
      name: `${emp['First Name']} ${emp['Last Name']}`,
      value: emp['Employee ID'],
    }));
    managerChoices.unshift({ name: 'None', value: null });

    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "Enter employee's first name:",
      },
      {
        type: 'input',
        name: 'last_name',
        message: "Enter employee's last name:",
      },
      {
        type: 'list',
        name: 'role_id',
        message: "Select employee's role:",
        choices: roleChoices,
      },
      {
        type: 'list',
        name: 'manager_id',
        message: "Select employee's manager:",
        choices: managerChoices,
      },
    ]);

    await db.addEmployee(first_name, last_name, role_id, manager_id);
    console.log(`Added ${first_name} ${last_name} to the database successfully!`);
  } catch (err) {
    console.error('Error adding employee:', err);
  }
}
//Updating data and operations. Prompting user to select an employee and assign new roles.
async function updateEmployeeRole() {
  try {
    const employees = await db.getAllEmployees();
    const employeeChoices = employees.map((emp) => ({
      name: `${emp['First Name']} ${emp['Last Name']}`,
      value: emp['Employee ID'],
    }));

    const roles = await db.getAllRoles();
    const roleChoices = roles.map((role) => ({
      name: role['Job Title'],
      value: role['Role ID'],
    }));

    const { employee_id, role_id } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employee_id',
        message: 'Select the employee to be updated:',
        choices: employeeChoices,
      },
      {
        type: 'list',
        name: 'role_id',
        message: 'Select new role for the employee:',
        choices: roleChoices,
      },
    ]);

    await db.updateEmployeeRole(role_id, employee_id);
    console.log("Updated employee's role in the database successfully!");
  } catch (err) {
    console.error('Error updating employee role:', err);
  }
}

mainMenu();
