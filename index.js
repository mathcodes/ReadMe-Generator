const api = require('./utils/api');
const generateMarkdown = require('./utils/generateMarkdown');
const util = require('util');
const fs = require('fs');
const inquirer = require('inquirer');

const writeFileAsync = util.promisify(fs.writeFile);


const questions = [{
        type: 'input',
        name: 'fullName',
        message: 'Enter your full name:'
    },
    {
        type: "input",
        message: "What the best email address for users to contact you with?",
        name: "email",
    },
    {

        type: 'input',
        name: 'username',
        message: 'Enter your Github username:'
    },
    {
        type: 'input',
        name: 'title',
        message: 'Give your project a title:'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please write a description of your project:'
    },
    {
        type: "input",
        name: "installation",
        message: "Specify the command users will need to install dependencies.",
        default: "npm install"
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Specify anything else the user needs to know to use your project.',
    },
    {
        type: "list",
        message: "Enter information about your licensing: ",
        name: 'license',
        choices: [
            "MIT",
            "GPL 3.0",
            "Apache 2.0",
            "BSD 3",
            "None"
        ]
    },
    {
        type: "input",
        message: "What addition info, if any, does the user need to know in order to contribute to the project?",
        name: "contributing",

    },
    {
        type: "input",
        name: "tests",
        message: "Specify the command users will need to run tests?",
        default: "npm run test"
    },
];



function promptUser() {
    return inquirer.prompt(questions);
}

promptUser()
    .then(function(answers) {
        return api.getUser(answers.username)
            .then(function(githubData) {
                const md = generateMarkdown(answers, githubData);
                return writeFileAsync('output/README.md', md)
                    .then(function() {
                        console.log("New Markdown file named README.md has been generated");
                    });
            }).catch(function(err) {
                console.log(err);
            });
    });
