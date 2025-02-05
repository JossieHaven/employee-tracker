# Employee Tracker

## Description

Module 10 Challenge - Employee Tracker 

An application that allows the user to view and manage departments, roles, and employees in a company so that they can organize and plan the business. Applications was created using node.js, inquirer, dotenv, and PSQL

## Table of Contents

- [Description](#description)
- [User Story](#user-story)
- [Installation](#installation)
- [Acceptance-Criteria](#acceptence-criteria)
- [Video Tutorial](#video-tutorial)
- [Github-repository](#github-repository)


## User Story

AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business



## Installation

1) Install PSQL. Make sure you have node.js, and install pg, inquirer, and dotenv.
2) Use node index.js command to run the application.
3) Answer the questions to view and edit your SQL employee tracker. 

## Acceptence Criteria

- GIVEN a command-line application that accepts user input
- WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
- WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
- WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
- WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
- WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
- WHEN I choose to add an employee
THEN I am prompted to enter the employee's first name, last name, role, and manager, and that employee is added to the database
- WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

## Video Tutorial
[Video Tutorial]()

## GitHub Repository
[Github-Repo](https://github.com/JossieHaven/employee-tracker)