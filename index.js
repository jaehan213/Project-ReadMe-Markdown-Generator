const inquirer = require('inquirer');
const fs = require('fs');

inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your project?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Please enter a description of your project:',
    },
    {
      type: 'input',
      name: 'install',
      message: 'Please enter the installation instructions of your project:',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Please enter the usage information of your project:',
    },
    {
      type: 'input',
      name: 'contribution',
      message: 'Please enter the contribution guidelines of your project:',
    },
    {
      type: 'input',
      name: 'test',
      message: 'Please enter the test instructions of your project:',
    },
    {
      type: 'checkbox',
      message: 'Which license is your application covered under?',
      name: 'license',
      choices: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
    },
    {
      type: 'input',
      name: 'github',
      message: 'What is your Github username?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email address?',
    },
  ])
  .then((data) => {
    const filename = `${data.title.toLowerCase().split(' ').join('_')}.md`;
    let mainTemplate = `${data.title} 
    \n\n# Table of Contents
    \n1. [Description](#description)
    \n2. [Installation](#installation)
    \n3. [Usage](#usage)
    \n4. [License](#license)
    \n5. [Contributing](#contrib)
    \n6. [Tests](#test)
    \n7. [Questions](#question)
    \n\n## Description <a name="description"></a>\n${data.description} 
    \n\n## Installation <a name="installation"></a>\n${data.install} 
    \n\n## Usage <a name="usage"></a>\n${data.usage}
    \n\n## License <a name="license"></a>\n${data.license}
    \n\n## Constributing <a name="contrib"></a>\n${data.contribution}
    \n\n## Tests <a name="test"></a>\n${data.test}
    \n\n## Questions <a name="question"></a>\nGithub @${data.github} [Link](https://github.com/${data.github})\n${data.email}`
    fs.writeFile(filename, mainTemplate, (err) =>
      err ? console.log(err) : console.log('Success!')
    );
  });
