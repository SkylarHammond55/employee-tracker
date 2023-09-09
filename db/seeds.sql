INSERT INTO department (name)
VALUES
    ('Human Resources'),
    ('Marketing'),
    ('Legal'),
    ('Engineering'),
    ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES 
    ('Software Developer', 90000, 4),
    ('HR Manager', 70000, 1),
    ('Sales Manager', 80000, 5),
    ('Lawyer', 220000, 3),
    ('Account Executive', 75000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Alice', 'Smith', 2, NULL),
    ('Bob', 'Johnson', 1, 1),
    ('Charlie', 'Brown', 4, NULL),
    ('David', 'Williams', 1, 3),
    ('Eva', 'Davis', 4, 3),
    ('Frank', 'Miller', 3, NULL),
    ('Grace', 'Wilson', 3, 6),
    ('Hannah', 'Moore', 5, NULL),
    ('Isaac', 'Taylor', 5, 8);