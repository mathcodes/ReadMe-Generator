function generateMarkdown(answers, badges, response) {
    return `
# ${answers.title}

![badge](https://img.shields.io/badge/License-MIT-orange/)

## Description
${answers.description}

## Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
>>>>>>> 0ec7fc08fcdb55c89719f2b2e27730c993e068ee

## Installation
${answers.installation}
## Usage
${answers.usage}
## License
${answers.license}
## Contributing
${answers.contributing}
## Tests
${answers.tests}
## Questions
${answers.questions}

Name: __${response.data.name}__
GitHub: [${response.data.login}](https://github.com/${response.data.login})  
![Image of Me](${response.data.avatar_url})
`;
}

module.exports = generateMarkdown;