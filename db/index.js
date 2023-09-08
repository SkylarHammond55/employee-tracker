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