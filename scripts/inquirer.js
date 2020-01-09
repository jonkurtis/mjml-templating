const inquirer = require('inquirer');
const fs = require('fs');
// const { projects = [] } = require('../projects.config');
const projects = fs.readdirSync('projects').map(dir => dir);
const monthDirs = ['01-jan', '02-feb', '03-mar', '04-apr', '05-may', '06-jun', '07-jul', '08-aug', '09-sep', '10-oct', '11-nov', '12-dec'];

module.exports = {
  pickProject: () => {
    return inquirer
      .prompt([
        {
          type: 'list',
          name: 'project',
          message: 'Pick project to work on?',
          choices: projects,
          filter(option) {
            return option.toLowerCase();
          }
        }
      ])
      .then(answers => answers);
  },
  confirm: () => {
    return inquirer
      .prompt([
        {
          type: 'list',
          name: 'confirmation',
          message: 'Are you sure?',
          choices: ['No', 'Yes'],
          filter(option) {
            return option.toLowerCase();
          }
        }
      ])
      .then(answer => answer);
  },
  pickMonth: () => {
    return inquirer
    .prompt([
      {
        type: 'list',
        name: 'Month',
        message: 'Pick month?',
        choices: monthDirs,
        filter(option) {
          return option.toLowerCase();
        }
      }
    ])
    .then(answers => answers);
  }
};
