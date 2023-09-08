// Import connection to the database
const db = require('./connection.js');
const inquirer = require('inquirer');

// View All Department
const viewAllDept = () => {
    console.log('Below is all departments...\n');
    const query = `SELECT department.id AS id, department.name AS departments FROM department`;

    db.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);

        promptQuestions();
    })
};

// Add Department
const addNewDept = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the new department to add?"
        }
    ])
    .then(answer => {
        const query = `INSERT INTO department (name)
        VALUES (?)`;
        
        db.query(query, answer.name, (err, result) => {
            if (err) throw err;
            console.log(`Department ${answer.name} successfully added with id ${result.insertId}.`);

            promptQuestions();
        });
    })
};

// Delete Department
const deleteDept = () => {
    const deptQuery = `SELECT * FROM department`;
    
    db.query(deptQuery, (err, result) => {
        if (err) throw err;
        const departments = result.map(({ name, id }) => ({ name: name, value: id }));

        inquirer.prompt([
                {
                    type: "list",
                    name: "option",
                    message: "Which department do you wish to delete?",
                    choices: departments
                }
            ])
    })


    .then(answer => {
        const query = `DELETE FROM department
        WHERE id = ?`;
        
        db.query(query, answer.option, (err, result) => {
            if (err) throw err;
            console.log(`${result.affectedRow} successfully deleted!`);

            promptQuestions();
        })
    })
}

// View All Roles
const viewAllRoles = () => {
  console.log('Below is all roles...\n');
  const query = `SELECT role.id AS id, role.title AS title, salary, department.name as department
  FROM role
  JOIN department ON role.department_id = department.id`;

  db.query(query, (err, result) => {
      if (err) throw err;
      console.table(result);

      promptQuestions();
  })
};

// Add Role
const addRole = () => {
  // List of all departments to make choice for dept
  const deptQuery = `SELECT * FROM department`;
  
  db.query(deptQuery, (err, result) => {
      if (err) throw err;
      const departments = result.map(({ name, id }) => ({ name: name, value: id }));

      inquirer.prompt([
          {
              type: "input",
              name: "title",
              message: "What is the name of the new role you wish to add?"
          },
          {
              type: "input",
              name: "salary",
              message: "What is the salary of this new role?"
          },
          {
              type: "list",
              name: "dept",
              message: "Which department is this new role in?",
              choices: departments
          }
      ])
  })
  .then(answer => {
      const query = `INSERT INTO role (title, salary, department_id)
      VALUES (?, ?, ?)`;
      
      db.query(query, answer.title, answer.salary, answer.dept, (err, result) => {
          if (err) throw err;
          console.log(`Department ${answer.name} successfully added with id ${result.insertId}.`);

          promptQuestions();
      });
  })
};

// Delete Role
const deleteRole = () => {
  const roleQuery = `SELECT * FROM role`;
  
  db.query(roleQuery, (err, result) => {
      if (err) throw err;
      const roles = result.map(({ title, id }) => ({ name: title, value: id }));

      inquirer.prompt([
              {
                  type: "list",
                  name: "option",
                  message: "Which role do you wish to delete?",
                  choices: roles
              }
          ])
  })


  .then(answer => {
      const query = `DELETE FROM role
      WHERE id = ?`;
      
      db.query(query, answer.option, (err, result) => {
          if (err) throw err;
          console.log(`${result.affectedRow} successfully deleted!`);

          promptQuestions();
      })
  })
}

// ... other functions ...

module.exports = { viewAllDept, addNewDept, deleteDept, viewAllRoles, addRole, deleteRole, /* other functions... */ };
git 