const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const api = require("./api.js")
    // \`\`\`npm run test\`\`\`
    // Promisify fs.writeFile
const writeFileAsync = util.promisify(fs.writeFile);

// Prompt user
promptUser()
    .then(
        // Use response
        async function(response) {
            try {
                // and get each separate response
                const { username, title, description, installation, usage, license, contributing, tests, questions } = response;
                // Call the getGitHubData function to get the avatar url
                const avatar = await getGitHubData(username);
                // Generate the readme using all the response data
                // let data = {

                // }
                return generateMarkdown(username, title, description, installation, usage, license, contributing, tests, questions, avatar); //when you call, turn all that 
                // If there's an error, log error
            } catch (err) {
                console.log(err);
            }
        })
    .then(function(text) {
        // Then use the result from the generateMarkdown function to write the README file
        writeFileAsync("README_GEN.md", text, "utf8");
        // Log to the console a success message
        console.log("Success!!! README_GEN.md is looking good.");
    })
    .catch(function(err) {
        console.log(err);
    });

// Create a function to prompt users for data
function promptUser() {
    return inquirer.prompt([{
            type: "input",
            message: "Enter your GitHub username:",
            name: "username"
        },
        {
            type: "input",
            message: "Give your project a title:",
            name: "title"
        },
        {
            type: "input",
            message: "Give your project a clear description:",
            name: "description"
        },
        {
            type: "input",
            message: "Provide users with the following command line for installation: npm install",
            name: "installation"
        },
        {
            type: "input",
            message: "What command will the user use to run the application? ",
            name: "usage"
        },
        {
            type: "input",
            message: "What license is associated with this application?",
            name: "license"
        },
        {
            type: "input",
            message: "What addition info, if any, does the user need to know in order to contribute to the application?",
            name: "contributing",

        },
        {
            type: "input",
            message: "Write tests for your application (separate using a comma):",
            name: "tests"
        },
        {
            type: "input",
            message: "Provide links with instruction and contact information so the users can find answers to questions they may have, such as opening an issue or emailing you directly:",
            name: "questions"
        }
    ])
}


function getGitHubData(username) {
    const queryUrl = `https://api.github.com/search/users?q=${username}`;
    api.getUser(username)
        .then(function(response) {
            const { avatar_url } = response.data.items[0];
            return avatar_url;
        });
}

// Create function to generate the template literate using data from the prompt and GitHub call
function generateMarkdown(username, title, description, installation, usage, license, contributing, tests, questions, avatar) {
    `\`\`\`npm run test\`\`\``
    return `
# ${title}  
  
## Description

${description}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Author](#author)

## Installation
    ${installation}

## Usage
    ${usage}

## License
    ${license}

## Contributing
    ${contributing}
  
## Tests
    ${tests}

## Questions
    ${questions}

## Author
Name: Jon Christie 
GitHub: github.com/${username}  
![Image of Me](${avatar})


![badge](https://img.shields.io/badge/License-MIT-orange/)

//three backticks to show code in markdwon, but bac its inside of node and have a function, so
---
© 2020 Jon Christie. All Rights Reserved.
`
}