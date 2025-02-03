INSERT INTO department (name)
VALUES  ('Sales'),
        ('Finance'),
        ('Legal'),
        ('Operations');

INSERT INTO role (title, salary, department_id)
VALUES  ('Salesperson', 75000, 1),
        ('Sales Lead', 90000, 1),
        ('Lawyer', 110000, 3),
        ('Lead Engineer', 115000, 4),
        ('Software Engineer', 90000, 4),
        ('Junior Developer', 70000, 4),
        ('Accountant', 75000, 2);

INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES  (1, 'Morty', 'Mart', 2),
        (2, 'Jacob', 'Jacobson', NULL),
        (3, 'Jim', 'John', NULL),
        (4, 'Philip', 'Philler', NULL),
        (5, 'Katie', 'Kateson', 5),
        (6, 'Dan', 'Danielson', 5),
        (7, 'Jefrey', 'Jefferson', 5),
        (8, 'Halland', 'Matterson', NULL);        