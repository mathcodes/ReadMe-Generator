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
        message: 'Give your project a clear description:'
    },
    // {
    //     type: 'checkbox',
    //     name: 'contents',
    //     message: 'What would you want in your Table of Contents?',
    //     choices: [
    //         "*[Installation](#installation)",
    //         "*[Usage](#usage)",
    //         "*[License](#license)",
    //         "*[Contributing](#contributing)",
    //         "*[Tests](#tests)",
    //         "*[Questions](#questions)"
    //     ]
    // },
    {
        type: 'input',
        name: 'installation',
        message: 'Specify all command lines need to run installations, i.e. "npm install":'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Specify the command line users will need to run the application, i.e. "index.js":'
    },
    {
        type: 'input',
        name: 'license',
        message: 'What license, if any, is associated with this application?'
    },
    {
        type: "input",
        message: "What addition info, if any, does the user need to know in order to contribute to the application?",
        name: "contributing",

    },
    {
        type: "input",
        message: "Provide links with instruction and contact information so the users can find answers to questions they may have, such as opening an issue or emailing you directly:",
        name: "questions"
    },
];


function promptUser() {
    return inquirer.prompt(questions);
}

promptUser()
    .then(function(answers) {
        let github = "";
        return api.getUser(answers.username)
            .then(function(githubData) {
                console.log(githubData);
                github = githubData;
                // return renderBadges(answers.badge);
            })
            .then(function(newbadges) {
                const md = generateMarkdown(answers, newbadges, github);
                return writeFileAsync('README.NEW.md', md);
            })
    }).then(function() {
        console.log("New Markdown file named README.NEW.md has been generated");
    })
    .catch(function(err) {
        console.log(err);
    })

// //function for rendering badges
// function renderBadges(badge) {
//     const badgeArr = badge.split(',');
//     let badgeTemplate = '';
//     for (let i = 0; i < badgeArr.length; i++) {
//         badgeTemplate += '![Badge](' + badgeArr[i] + ')';
//     }
//     return badgeTemplate
// }