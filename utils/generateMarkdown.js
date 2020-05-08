function generateMarkdown(answers, response) {
    return `
# ${answers.title}
​
![badge](https://img.shields.io/badge/License-${answers.license}-orange)
​
## Description
${answers.description}
​
![Project GIF](assets.MMM.if)

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
 
## Installation
\`\`\` ${answers.installation} \`\`\` 
​
## Usage
\`\`\`  ${answers.usage} \`\`\` 
​
## License
${answers.license}
​
## Contributing
${answers.contributing}
​
## Tests
\`\`\` ${answers.tests} \`\`\`
​
## Questions
If you have any questions about the repo, open an issue or contact [${response.data.login}](https://github.com/${response.data.login}) directly to <a href="mailto :jonpchristie@gmail.com">my email</a>.



![Image of Me](${response.data.avatar_url})

__${response.data.name}__ ([${response.data.login}](https://github.com/${response.data.login}))
`;
}
module.exports = generateMarkdown;