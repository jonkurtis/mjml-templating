const fs = require('fs');
const path = require('path');
const glob = require('glob');
const mjml = require('mjml');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const log = require('../tools/logger');
const { projects } = require('../projects.config');
const { pickProject, pickMonth } = require('./inquirer');
let currentProject;

function compileMjml(mjmlRaw, project) {
  return new Promise((resolve, reject) => {
    const template = mjml(mjmlRaw, {
      validationLevel: 'strict',
      minify: true,
      filePath: path.join(__dirname, `../projects/${project}/templates/', '*.mjml`)
    });
    if (template.errors.length) {
      console.log(template.errors);
      reject(new Error('Issue Compiling'));
    }

    resolve(template);
  });
}

function injectVars(template, vars = {}) {
  return new Promise((resolve, reject) => {
    let compiled
     Object.keys(vars).forEach((key) => {
       const regex = new RegExp(`{{${key}}}`, 'g');
       template.html = template.html.replace(regex, vars[key]);
       compiled = template;
      });
     resolve(compiled);
   });
 };

  async function compileTemplate(mjmlRaw, project) {
    const template = await compileMjml(mjmlRaw, project);
    const compiled = await injectVars(template, {message: 'Hello George!'});
    return compiled;
  }

function getMjmlTemplatePaths(globString, options = {}) {
  return new Promise((resolve, reject) => {
    glob(globString, options, (error, filePaths) => {
      if (error) {
        log.error('getMjmlTemplatePaths error');
        reject(new Error(error));
      }
      resolve(filePaths);
    });
  });
}

function getMjmlRawTemplates(mjmlTemplatePaths = []) {
  return new Promise(async (resolve, reject) => {
    const rawMjmlTemplates = mjmlTemplatePaths.map(async templatePath => {
      const strings = templatePath.split('/');
      const project = strings.find(item => projects.includes(item));

      const templateName = strings[strings.length - 1];
      const fileName = templateName.replace(/(.+?)\.mjml/, '$1');
      try {
        const data = await readFileAsync(templatePath, 'utf8');
        return {
          name: fileName,
          project,
          body: data
        };
      } catch (error) {
        log.error('getMjmlRawTemplates error');
        reject(new Error(error));
      }
    });

    Promise.all(rawMjmlTemplates).then(data => {
      resolve(data);
    });
  });
}

function compileFiles(mjmlRawTemplates = []) {
  return new Promise(async (resolve, reject) => {
    const compiledFiles = mjmlRawTemplates.map(async template => {
      try {
        const compiled = await compileTemplate(template.body, template.project);
        return {
          name: template.name,
          project: template.project,
          body: compiled
        };
      } catch (error) {
        log.error('compileFiles error');
        reject(new Error(error));
      }
    });
    Promise.all(compiledFiles).then(data => {
      resolve(data);
    });
  });
}

function writeFiles(compiledFiles = [], pathToWriteTo) {
  return new Promise(async (resolve, reject) => {
    compiledFiles.map(async file => {
      try {
        await writeFileAsync(
          `projects/${file.project}/COMPILED_TEMPLATES/${file.name}.html`,
          file.body.html
        );
      } catch (error) {
        log.error('Issue Writing File');
        reject(new Error(error));
      }
    });

    Promise.all(compiledFiles).then(() => {
      resolve(true);
    });
  });
}

const startCompileProcess = async (
  project = null,
  singleTemplatePath = null
) => {
  currentProject = project;

  if (!currentProject) {
    const choice = await pickProject();
    currentProject = choice.project;
  } else if (project === 'all') {
    currentProject = '**';
  }
  const month = await pickMonth();
  log.info(
    `${
      currentProject !== '**' ? currentProject : 'All Projects'
    }: starting compile...`
  );

  try {
    const mjmlTemplatePaths = singleTemplatePath
      ? [singleTemplatePath]
      : await getMjmlTemplatePaths(`projects/${currentProject}/templates/${month}*.mjml`, {
        ignore: 'test-*/**' // ignore is for a test directory to be added later
      });
    const mjmlRawTemplates = await getMjmlRawTemplates(mjmlTemplatePaths);
    const compiledFiles = await compileFiles(mjmlRawTemplates);
    const filesWritten = await writeFiles(compiledFiles);

    if (filesWritten) {
      log.info('Compiling Complete');
    }
  } catch (error) {
    if (error) {
      log.error(error);
    } else {
      log.error('Unknown Error');
    }
  }
};

module.exports = {
  writeFiles,
  compileFiles,
  getMjmlRawTemplates,
  getMjmlTemplatePaths,
  compileTemplate,
  startCompileProcess
};
