// Import necessary modules
const db = require('./db/connection.js');
const inquirer = require('inquirer');

// Define inquirer prompts using a switch case to call functions from db/index.js
const promptQuestions = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What action would you like to perform?',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Exit'
            ]
        }
    ])
    .then(answer => {
        switch (answer.options) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            default:
                db.end();
        }
    })
    .catch(err => {
        console.error(err);
    });
};

promptQuestions();

// Function to view all departments
const viewAllDepartments = () => {
    console.log('Here is a list of all departments:\n');
    const query = `SELECT department.id AS id, department.name AS department FROM department`;

    db.query(query, (err, result) => {
        if (err) throw err;
        console.table(result);

        promptQuestions();
    })
};

// Function to add a new department
const addDepartment = () => {
  console.log("Please provide the following information:");

  inquirer.prompt([
      {
          type: "input",
          name: "name",
          message: "What is the name of the new department? (Enter your answer)"
      }
  ])
  .then(answer => {
      const query = `INSERT INTO department (name) VALUES (?)`;
      
      db.query(query, answer.name, (err, result) => {
          if (err) throw err;
          console.log(`Department ${answer.name} has been successfully added with ID ${result.insertId}.`);

          promptQuestions();
      });
  })
};

// Function to view all roles
const viewAllRoles = () => {
  console.log('Here is a list of all roles:\n');
  const query = `SELECT role.id AS id, role.title AS title, salary, department.name AS department
  FROM role
  JOIN department ON role.department_id = department.id`;

  db.query(query, (err, result) => {
      if (err) throw err;
      console.table(result);

      promptQuestions();
  })
};

// Function to add a new role
const addRole = () => {
  db.query("SELECT * FROM department", (err, deptResult) => {
      if (err) throw err;

      const departments = deptResult.map(({ name, id }) => ({ name: name, value: id }));

      inquirer.prompt([
          {
              type: "input",
              name: "title",
              message: "What is the name of the new role you want to add?"
          },
          {
              type: "input",
              name: "salary",
              message: "What is the salary for this new role?"
          },
          {
              type: "list",
              name: "dept",
              message: "Which department does this new role belong to?",
              choices: departments
          }
      ])
      .then(answer => {
          const query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
          
          db.query(query, [answer.title, answer.salary, answer.dept], (err, result) => {
              if (err) throw err;
              console.log(`Role ${answer.title} has been successfully added with ID ${result.insertId}.`);

              promptQuestions();
          });
      })
  })
};