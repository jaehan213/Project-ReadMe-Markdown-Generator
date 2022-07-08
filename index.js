const inquirer = require('inquirer');
const fs = require('fs');

// array for badges
var badges = {"Mac OS":"https://img.shields.io/badge/mac%20os-000000?style=for-the-badge&logo=macos&logoColor=F0F0F0",
"Windows":"https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white",
"Linux":"https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black",
"iOS":"https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white"}
// array for badge description
var badgeDescription = {"Mac OS":"Your use of Apple software or hardware products is based on the software license and other terms and conditions in effect for the product at the time of purchase. Your agreement to these terms is required to install or use the product. Please be aware that the software license that accompanies the product at the time of purchase may differ from the version of the license you can review here. Be certain to read the applicable terms carefully before you install the software or use the product.",
"Windows":"Properly licensed Microsoft operating systems have either a full operating system license or the combination of an upgrade operating system license and a pre-existing, full operating system license. Upgrade licenses require a Qualifying Operating System license.",
"Linux":"Linux is licensed with the GNU General Public License (GPL), a document devised for the GNU project by the Free Software Foundation. The GPL allows anybody to redistribute, and even sell, a product covered by the GPL, as long as the recipient is allowed to rebuild an exact copy of the binary files from source.",
"iOS":"Your use of Apple software or hardware products is based on the software license and other terms and conditions in effect for the product at the time of purchase. Your agreement to these terms is required to install or use the product. Please be aware that the software license that accompanies the product at the time of purchase may differ from the version of the license you can review here. Be certain to read the applicable terms carefully before you install the software or use the product."}

inquirer
  // asks for inputs in terminal to create output file
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
      choices: ['Mac OS', 'Windows', 'Linux', 'iOS'],
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
    // file = title + table of contents (toc) + main
    const filename = `${data.title.toLowerCase().split(' ').join('_')}.md`;
    let title = `# ${data.title}`;
    let toc = `\n\n### Table of Contents`;
    let main = ``;
    let i = 1;
    // add badges to the top of the md file under the title
    if(data.license.length > 0){
      title = title.concat("\n");
      for(let j = 0; j < data.license.length; j++){
        let badge = data.license[j];
        title = title.concat(`![${badge}](${badges[badge]})\n`);
      }
    }
    // for each input data, if not blank, it will add the section to main and create corresponding item in table of contents
    // condition if description is not blank
    if(data.description.length > 0){
      // add table of contents 
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
      toc = toc.concat(`\r${i}. [Usage Information](#usage)`)
      main = main.concat(`\n\n## Usage Information<a name="usage"></a>
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
      var licenseData = "";
      var k = "";
      for(let j = 0; j < data.license.length; j++){
        let badge = data.license[j];
        if(j > 0){
          k = "\r\t";
        }
        licenseData = licenseData.concat(`${k}${badge}: ${badgeDescription[badge]}`);
      }
      main = main.concat(`\n\n## License(s) <a name="license"></a>
      ${licenseData}`)
      i++;
    }
    if(data.github.length + data.email.length > 0){
      toc = toc.concat(`\r${i}. [Questions](#question)`)
      main = main.concat(`\n\n## Questions <a name="question"></a>\n`)
      i++;
    }
    if(data.github.length > 0){
      main = main.concat(`\t[Github @${data.github}](https://github.com/${data.github})\n`)
      i++;
    }
    if(data.email.length > 0){
      main = main.concat(`\tEmail: ${data.email}\n`)
      i++;
    }
    let final = title + toc + main
    fs.writeFile(filename, final, (err) =>
      err ? console.log(err) : console.log('Success!')
    );
  });
