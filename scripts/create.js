const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');
const log = require('../tools/logger');

function createProject(projectName) {
  const cleanProjectName = projectName.toLowerCase().replace(/[^a-zA-Z]/g, '');
  const rootPath = path.resolve(__dirname, '../');
  const newProjectPath = `${rootPath}/projects/${cleanProjectName}`;
  const monthDirs = ['01-jan', '02-feb', '03-mar', '04-apr', '05-may', '06-jun', '07-jul', '08-aug', '09-sep', '10-oct', '11-nov', '12-dec'];
  const monthSubDirs = monthDirs.map(m => `templates/${m}`);
  const compiledSubDirs = monthDirs.map(m => `COMPILED_TEMPLATES/${m}`);
  const subDirs = [...monthSubDirs, ...compiledSubDirs];
  const directoriesToCreate = ['', 'templates', 'COMPILED_TEMPLATES', 'common', ...subDirs];

  if (fs.existsSync(newProjectPath)) {
    log.warning(`Sorry, ${cleanProjectName}, already exists.`);
    return;
  }

  try {
    directoriesToCreate.forEach(directory => {
      mkdirp(`${newProjectPath}/${directory}`, error => {
        if (error) {
          throw new Error('Issue Creating New Project');
        }
      });
    });
  } catch (error) {
    log.error(error);
    return;
  }

  log.ok(`${cleanProjectName} was successfully created.`);
  log.info(
    `Don't forget to add ${cleanProjectName} to projects in projects.config.js`
  );
}

module.exports = {
  createProject
};
