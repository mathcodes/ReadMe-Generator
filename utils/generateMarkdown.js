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
 

## Installation
${answers.installation}
## Usage
${answers.usage}
## License
${answers.license}
## Contributing
${answers.contributing}
## Tests
\`\`\` npm run test \`\`\` 
${answers.tests}
## Questions
Name: __${response.data.name}__
GitHub: [${response.data.login}](https://github.com/${response.data.login})
![Image of Me](${response.data.avatar_url})

If you have any questions about the repo, open an issue or contact [${response.data.login}](https://github.com/${response.data.login}) directly at [${response.data.login}](https://github.com/${response.data.id})
`;
}
module.exports = generateMarkdown;