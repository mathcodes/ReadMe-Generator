const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

// Promisify fs.writeFile
const writeFileAsync = util.promisify(fs.writeFile);

// Prompt user
promptUser()
    .then(
        // Use response
        async function (response) {
            try {
                // and get each separate response
                const { fullName, username, title, shortDescription, longDescription, screenshotUrl, installation, usage, credits, license, tests, badge } = response;
                // Call the getGitHubData function to get the avatar url
                const avatar = await getGitHubData(username);
                // Generate the readme using all the response data
                return generateREADME(fullName, username, title, shortDescription, longDescription, screenshotUrl, installation, usage, credits, license, tests, avatar, badge);
            // If there's an error, log error
            } catch (err) {
                console.log(err);
            }
    })
    .then(function (text) {
        // Then use the result from the generateREADME function to write the README file
        writeFileAsync("README_GENERATED.md", text, "utf8");
        // Log to the console a success message
        console.log("Success!!! README_GENERATED.md has been generated.");
    })
    .catch(function (err) {
        console.log(err);
    });

// Create a function to prompt users for data
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            message: "Enter your full name:",
            name: "fullName"
        },
        {
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
            message: "Give your project a short description:",
            name: "shortDescription"
        },
        {
            type: "input",
            message: "Give your project a long description:",
            name: "longDescription"
        },
        {
            type: "input",
            message: "Include a url of a screenshot:",
            name: "screenshotUrl"
        },
        {
            type: "input",
            message: "Provide a step-by-step description of how to install your project (separate using a comma):",
            name: "installation"
        },
        {
            type: "input",
            message: "Provide instructions and examples for use (separate using a comma):",
            name: "usage"
        },
        {
            type: "input",
            message: "List your collaborators, third-party assets, etc. if any (separate using a comma):",
            name: "credits"
        },
        {
            type: "list",
            message: "Choose a license for your project:",
            name: "license",
            choices: [
                "MIT License",
                "GNU AGPLv3",
                "GNU GPLv3",
                "GNU LGPLv3",
                "GNU GPLv2",
                "Mozilla Public License 2.0",
                "Apache License 2.0",
                "ISC License",
                "Boost Software License 1.0",
                "The Unlicense"
            ]
        },
        {
            type: "input",
            message: "Write tests for your application (separate using a comma):",
            name: "tests"
        },
        {
            type: "input",
            message: "Add a url for a badge for this application:",
            name: "badge"
        }
    ])
}

// Create function to call axios to get user's avatar url
function getGitHubData(username) {
    const queryUrl = `https://api.github.com/search/users?q=${username}`;

    return axios
        .get(queryUrl)
        .then(function (response) {
            const { avatar_url } = response.data.items[0];
            return avatar_url;
        });
}

// Create function to generate the template literate using data from the prompt and GitHub call
function generateREADME(fullName, username, title, shortDescription, longDescription, screenshotUrl, installation, usage, credits, license, tests, avatar, badge) {
    return `
# ${title}   [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md) ![User Badge](${badge})
> ${shortDescription}  


## Description

${longDescription}


![Screenshot](${screenshotUrl})


## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Author](#author)


## Installation

    ${installation}


## Usage

    ${usage}


## Credits

    ${credits}


## License

    ${license}


## Contributing

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.

[Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/)


## Tests

    ${tests}


## Author

Name: __${fullName}__  
GitHub: github.com/${username}  
![Image of Me](${avatar})

---
© 2020 ${fullName}. All Rights Reserved.
`
}