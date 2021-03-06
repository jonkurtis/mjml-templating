# Multi Project Workflow - MJML

This workflow will allow you to keep all of your MJML projects in one place if needed. You can work on projects individually or compile all of the projects at once. There is also a custom watch option so that you work on an individual project. There is a custom serve function to watch and serve an individual project in a live reloading browser with a server running at [localhost:3000](http:localhost:3000). For more info on how the project came about check this [blog post](https://www.garymeehan.ie/blog/emails-yes-emails)

**Powered by:**

 <a href="http://mjml.io" target="_blank">
    <img width="150" src="https://cloud.githubusercontent.com/assets/6558790/12672296/7b66d8cc-c675-11e5-805d-c6d196320537.png">
  </a>

## Getting started:

```
git clone git@github.com:garmeeh/mjml-multi-project.git
yarn install
```

This will initialize the project with a sample project (cuppas).

**To Remove Sample Project & Clean Git run:**

```
yarn clean-up
```

Running this will remove the sample project and git. You will need to manually remove `cuppas` from `projects.config.js`.

## Adding a new project

Run:

```
yarn create-project "newproject"
```

You will need to add your new project to `projects` in `projects.config.js`.

This will create the following folder structure inside the `projects` directory:

```
├── newproject/                     * new project
 |   ├── common                     * directory to hold partial includes for templates
 |   ├── COMPILED_TEMPLATES         * output folder for this projects templates (.html)
 |   ├── templates                  * mjml template files
```

## Commands available:

```
$ yarn compile
```

This will prompt you to pick a project that you would like to compile.

```
$ yarn compile-all
```

As the name suggests this will compile all of your projects. This is handy if you are integrating with a CI.

```
$ yarn watch
```

This will allow you to work on an individual project and it will auto compile your templates on file change/save.

```
$ yarn serve
```

This will start a live-reloading Browser-Sync server at localhost:3000, watch your project for changes, auto compile your templates on file change/save and reload the browser window.

```
$ yarn create-project "newproject"
```

This will scaffold out a new project directory.

```
$ yarn clean-up
```

Running this will remove the sample project and git.

**Project Structure**

```
mjml-multi-project/
 ├── projects/                      * projects directory
 |   ├── cuppas/                    * example project
 |       ├── common                 * directory to hold partial includes for templates
 |       ├── COMPILED_TEMPLATES     * output folder for this projects templates (.html)
 |       ├── templates              * mjml template files
 │
 ├── scripts/
 |   ├── index.js                   *
 |   ├── compile.js                 *
 │   ├── inquirer.js                *
 │   ├── publish.js                 *
 |   ├── watch.js                   *
 │   |── serve.js 
 |
 ├── tools/                         * helper tools for running the project
 |   ├── logger.js                  * adds a touch of colour to console logs
 |
 ├── .babelrc                       * https://babeljs.io/docs/usage/babelrc/
 ├── .editorconfig                  * http://editorconfig.org/
 ├── .eslintrc                      * https://eslint.org/docs/user-guide/configuring
 ├── .gitignore                     * https://git-scm.com/docs/gitignore
 ├── package.json                   * https://docs.npmjs.com/files/package.json
 ├── projects.config.js             * Configuration file for this project
 └──
```

## TODO

* Add publish script which will give options of uploading templates to API
* Add tests for scripts

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/13333582?v=4" width="100px;"/><br /><sub><b>Gary Meehan</b></sub>](https://github.com/garmeeh)<br />[💬](#question-garmeeh "Answering Questions") [📝](#blog-garmeeh "Blogposts") [💻](https://github.com/garmeeh/mjml-multi-project/commits?author=garmeeh "Code") [🎨](#design-garmeeh "Design") [📖](https://github.com/garmeeh/mjml-multi-project/commits?author=garmeeh "Documentation") [💡](#example-garmeeh "Examples") [🤔](#ideas-garmeeh "Ideas, Planning, & Feedback") [🚇](#infra-garmeeh "Infrastructure (Hosting, Build-Tools, etc)") [⚠️](https://github.com/garmeeh/mjml-multi-project/commits?author=garmeeh "Tests") [🔧](#tool-garmeeh "Tools") [✅](#tutorial-garmeeh "Tutorials") | [<img src="https://avatars3.githubusercontent.com/u/19523925?v=4" width="100px;"/><br /><sub><b>Jonathan Killian</b></sub>](https://github.com/jonkurtis)<br />[💻](https://github.com/garmeeh/mjml-multi-project/commits?author=jonkurtis "Code") [📖](https://github.com/garmeeh/mjml-multi-project/commits?author=jonkurtis "Documentation") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
