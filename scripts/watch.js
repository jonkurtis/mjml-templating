const watch = require('node-watch');
const path = require('path');
const log = require('../tools/logger');
const { pickProject, pickMonth } = require('./inquirer');
const { startCompileProcess } = require('./compile');

const startWatch = async () => {
  const { project } = await pickProject();
  const month = await pickMonth();
  const templatePath = `../projects/${project}/templates/${month}`;

  watch(path.resolve(__dirname, templatePath), {}, (evt, filePath) => {
    log.ok(`Recompiling: ${filePath}`);
    startCompileProcess(project, filePath);
  });
  log.info(`Watching ${project} ${month} templates...`);
};

module.exports = {
  startWatch
};
