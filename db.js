const { Pool } = require('pg');
const queries = require('./queries');

// Load the environment variables from .env file
require('dotenv').config();

// Create a connection pool for PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'employee_tracker',
  port: process.env.DB_PORT || 5432, 
  connectionTimeoutMillis: 10000, //timesout if connection takes longer than 10 seconds
  idleTimeoutMillis: 15000, // closes idle connections after 15 seconds
  max: 20, //Allows up to 20 connections at once.
  min: 4, //keeps at least 4 connections open for faster queries
});

// Query Execution Function
//connects to PSQL using the pool, executes SQL query and releases the connection back to the pool preventing connection leaks.
const executeQuery = async (query, params = []) => {
  const client = await pool.connect();
  try {
    const res = await client.query(query, params);
    return res.rows;
  } catch (error) {
    console.error('DATABASE QUERY ERROR:', error);
    throw error;
  } finally {
    client.release();
  }
};

// transaction handling functions
//adding an employeee to multiple tables
const executeTransaction = async (queriesWithParams) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const { query, params } of queriesWithParams) {
      await client.query(query, params);
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Transaction error:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Functions to interact with database
//Each func calls 'executeQuery' with a specific SQL statement from queries.js
const getAllDepartments = async () => {
  return await executeQuery(queries.viewAllDepartments);
};

const getAllRoles = async () => {
  return await executeQuery(queries.viewAllRoles);
};

const getAllEmployees = async () => {
  return await executeQuery(queries.viewAllEmployees);
};

const addDepartment = async (departmentName) => {
  return await executeQuery(queries.addDepartment, [departmentName]);
};

const addRole = async (title, salary, departmentId) => {
  return await executeQuery(queries.addRole, [title, salary, departmentId]);
};

const addEmployee = async (firstName, lastName, roleId, managerId) => {
  return await executeQuery(queries.addEmployee, [firstName, lastName, roleId, managerId]);
};

const updateEmployeeRole = async (roleId, employeeId) => {
  return await executeQuery(queries.updateEmployeeRole, [roleId, employeeId]);
};

// Closes all database connections cleanly to prevent data loss/corruption
process.on('SIGTERM', () => {
  pool.end(() => {
    console.log('Pool terminated');
  });
});

// Export functions so they can import them in server,js and be used in the application
module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  pool, 
  executeTransaction,
};
