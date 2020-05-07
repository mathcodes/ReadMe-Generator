function generateMarkdown(answers, badges, response) {
    return `
# ${answers.title}

![badge](https://img.shields.io/badge/License-MIT-orange/)

## Description
<<<<<<< HEAD
${answers.description}

## Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
=======
${answers.descripton}

## Table of Contents

*[Installation](#installation),
*[Usage](#usage),
*[License](#license),
*[Contributing](#contributing),
*[Tests](#tests),
*[Questions](#questions)
>>>>>>> e2388141003bd3115b573c098241271b89f0c233

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