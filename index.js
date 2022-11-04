const { prompt } = require("inquirer");
const db = require("./db");
require(console.table);

function loadPrompts() {
    prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          {
            name: "View All Employees",
            value: "VIEW_EMPLOYEES"
          },
          {
            name: "View All Employees By Department",
            value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
          },
          {
            name: "View All Employees By Manager",
            value: "VIEW_EMPLOYEES_BY_MANAGER"
          },
          {
            name: "Add Employee",
            value: "ADD_EMPLOYEE"
          },
          {
            name: "Remove Employee",
            value: "REMOVE_EMPLOYEE"
          },
          {
            name: "Update Employee Role",
            value: "UPDATE_EMPLOYEE_ROLE"
          },
          {
            name: "Update Employee Manager",
            value: "UPDATE_EMPLOYEE_MANAGER"
          },
          {
            name: "View All Roles",
            value: "VIEW_ROLES"
          },
          {
            name: "Add Role",
            value: "ADD_ROLE"
          },
          {
            name: "Remove Role",
            value: "REMOVE_ROLE"
          },
          {
            name: "View All Departments",
            value: "VIEW_DEPARTMENTS"
          },
          {
            name: "Add Department",
            value: "ADD_DEPARTMENT"
          },
          {
            name: "Remove Department",
            value: "REMOVE_DEPARTMENT"
          },
          {
            name: "View Total Utilized Budget By Department",
            value: "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT"
          },
          {
            name: "Quit",
            value: "QUIT"
          }
        ]
      }
    ])}

    function viewEmployees() {
        db.findAllEmployees()
          .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);
          })
          .then(() => loadMainPrompts());
      }

      function viewEmployeesByDepartment() {
        db.findAllDepartments()
          .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({ id, name }) => ({
              name: name,
              value: id
            }));
      
            prompt([
                {
                    type: 'list',
                    name: 'departments',
                    message: "Which department would you like to see employees for?",
                    choices: departmentChoices
                }
            ])
            .then(res => db.findAllEmployeesbyDepartment(res.departmentId))
            .then(([rows]) => {
                let employees = rows;
                console.log("\n");
                console.table(employees);
            })
            .then(() => loadMainPrompts())
        });
    }

    function viewEmployeesByManager() {
        db.findAllEmployees()
          .then(([rows]) => {
            let managers = rows;
            const managerChoices = managers.map(({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id
            }));
      
            prompt([
              {
                type: "list",
                name: "managerId",
                message: "Which employee do you want to see direct reports for?",
                choices: managerChoices
              }
            ])
              .then(res => db.findAllEmployeesByManager(res.managerId))
              .then(([rows]) => {
                let employees = rows;
                console.log("\n");
                if (employees.length === 0) {
                  console.log("The selected employee has no manager.");
                } else {
                  console.table(employees);
                }
              })
              .then(() => loadMainPrompts())
          });
      }
      