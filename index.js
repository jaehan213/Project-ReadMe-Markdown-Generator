const inquirer = require('inquirer');
const fs = require('fs');

inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Title (Required):',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description:',
    },
    {
      type: 'input',
      name: 'install',
      message: 'Installation Instructions:',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Usage Information:',
    },
    {
      type: 'input',
      name: 'contribution',
      message: 'Contribution Guidelines:',
    },
    {
      type: 'input',
      name: 'test',
      message: 'Test Instructions:',
    },
    {
      type: 'checkbox',
      message: 'License(s):',
      name: 'license',
      choices: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
    },
    {
      type: 'input',
      name: 'github',
      message: 'Github Username:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Email Address:',
    },
  ])
  .then((data) => {
    const filename = `${data.title.toLowerCase().split(' ').join('_')}.md`;
    let title = `# ${data.title}`;
    let toc = `\n\n### Table of Contents`;
    let main = ``;
    let i = 1;
    if(data.description.length > 0){
      toc = toc.concat(`\r${i}. [Description](#description)`)
      main = main.concat(`\n\n## Description <a name="description"></a>
      ${data.description}`)
      i++;
    }
    if(data.install.length > 0){
      toc = toc.concat(`\r${i}. [Installation](#installation)`)
      main = main.concat(`\n\n## Installation <a name="installation"></a>
      ${data.install}`)
      i++;
    }
    if(data.usage.length > 0){
      toc = toc.concat(`\r${i}. [Usage Info](#usage)`)
      main = main.concat(`\n\n## Usage Info<a name="usage"></a>
      ${data.usage}`)
      i++;
    }
    if(data.contribution.length > 0){
      toc = toc.concat(`\r${i}. [Contributing Guidelines](#contrib)`)
      main = main.concat(`\n\n## Contributing Guidelines <a name="contrib"></a>
      ${data.contribution}`)
      i++;
    }
    if(data.test.length > 0){
      toc = toc.concat(`\r${i}. [Test Instructions](#test)`)
      main = main.concat(`\n\n## Test Instructions <a name="test"></a>
      ${data.test}`)
      i++;
    }
    if(data.license.length > 0){
      toc = toc.concat(`\r${i}. [License(s)](#license)`)
      main = main.concat(`\n\n## License(s) <a name="license"></a>
      ${data.license}`)
      i++;
    }
    if(data.github.length + data.email.length > 0){
      toc = toc.concat(`\r${i}. [Questions](#question)`)
      main = main.concat(`\n\n## Questions <a name="question"></a>`)
      i++;
    }
    if(data.github.length > 0){
      main = main.concat(`\n[Github @${data.github}](https://github.com/${data.github})`)
      i++;
    }
    if(data.email.length > 0){
      main = main.concat(`\nEmail: ${data.email}`)
      i++;
    }
    let final = title + toc + main
    fs.writeFile(filename, final, (err) =>
      err ? console.log(err) : console.log('Success!')
    );
  });
