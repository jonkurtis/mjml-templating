const watch = require('node-watch');
const path = require('path');
const log = require('../tools/logger');
const { pickProject, pickMonth } = require('./inquirer');
const { startCompileProcess } = require('./compile');
const bs = require('browser-sync').create();

const startServe = async () => {
  const hrstart = process.hrtime();
  const { project } = await pickProject();
  const month = await pickMonth();
  const templatePath = `../projects/${project}/templates/${month}`;
  const projectPath = `projects/${project}/COMPILED_TEMPLATES/${month}`;
  bs.init({
    server: {
      baseDir: projectPath,
      index: "hello-world.html"
    }
  });

  watch(path.resolve(__dirname, templatePath), {}, (evt, filePath) => {
    log.ok(`Recompiling: ${filePath}`);
    startCompileProcess(project, filePath);
    bs.reload()
  });
  log.info(`Watching ${project} templates...`);
};

  module.exports = {
    startServe
  };
