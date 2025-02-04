--Drop tables if they exist to avoid potential conflicts--
DROP TABLE IF EXISTS role;
DROP DATABASE IF EXISTS employees_db;
DROP TABLE IF EXISTS department;


\c employee_tracker

CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER NOT NULL
);

CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL
  manager_id INTEGER,
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);