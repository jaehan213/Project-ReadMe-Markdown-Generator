const inquirer = require('inquirer');
const fs = require('fs');

// link for the most common open source and open data licenses
// https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba
const badges = {
  "Apache 2.0 License": "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
  "Boost Software License 1.0": "[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)",
  "BSD 3-Clause License": "[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)",
  "BSD 2-Clause License": "[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)",
  "CC0": "[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)",
  "Attribution 4.0 International": "[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)",
  "Attribution-ShareAlike 4.0 International": "[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC_BY--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)",
  "Attribution-NonCommercial 4.0 International": "[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC_BY--NC_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)",
  "Attribution-NoDerivates 4.0 International": "[![License: CC BY-ND 4.0](https://img.shields.io/badge/License-CC_BY--ND_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nd/4.0/)",
  "Attribution-NonCommmercial-ShareAlike 4.0 International": "[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)",
  "Attribution-NonCommercial-NoDerivatives 4.0 International": "[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC_BY--NC--ND_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)",
  "Eclipse Public License 1.0": "[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)",
  "GNU GPL v3": "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)",
  "GNU GPL v2": "[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)",
  "GNU AGPL v3": "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)",
  "GNU LGPL v3": "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)",
  "GNU FDL v1.3": "[![License: FDL 1.3](https://img.shields.io/badge/License-FDL_v1.3-blue.svg)](https://www.gnu.org/licenses/fdl-1.3)",
  "The Hippocratic License 2.1": "[![License: Hippocratic 2.1](https://img.shields.io/badge/License-Hippocratic_2.1-lightgrey.svg)](https://firstdonoharm.dev)",
  "The Hippocratic License 3.0": "[![License: Hippocratic 3.0](https://img.shields.io/badge/License-Hippocratic_3.0-lightgrey.svg)](https://firstdonoharm.dev)",
  "IBM Public License Version 1.0": "[![License: IPL 1.0](https://img.shields.io/badge/License-IPL_1.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)",
  "ISC License (ISC)": "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)",
  "The MIT License": "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
  "Mozilla Public License 2.0": "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)",
  "Attribution License (BY)": "[![License: Open Data Commons Attribution](https://img.shields.io/badge/License-ODC_BY-brightgreen.svg)](https://opendatacommons.org/licenses/by/)",
  "Open Database License (ODbL)": "[![License: ODbL](https://img.shields.io/badge/License-ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/)",
  "Public Domain Dedication and License (PDDL)": "[![License: ODbL](https://img.shields.io/badge/License-PDDL-brightgreen.svg)](https://opendatacommons.org/licenses/pddl/)",
  "The Perl License": "[![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)",
  "The Artistic License 2.0": "[![License: Artistic-2.0](https://img.shields.io/badge/License-Artistic_2.0-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)",
  "SIL Open Font License 1.1": "[![License: Open Font-1.1](https://img.shields.io/badge/License-OFL_1.1-lightgreen.svg)](https://opensource.org/licenses/OFL-1.1)",
  "The Unlicense": "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)",
  "The Do What the Fuck You Want to Public License": "[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)",
  "The zlib/libpng License": "[![License: Zlib](https://img.shields.io/badge/License-Zlib-lightgrey.svg)](https://opensource.org/licenses/Zlib)"
}
const badgeDescription = {
  "Apache 2.0 License": "https://opensource.org/licenses/Apache-2.0",
  "Boost Software License 1.0": "https://www.boost.org/LICENSE_1_0.txt",
  "BSD 3-Clause License": "https://opensource.org/licenses/BSD-3-Clause",
  "BSD 2-Clause License": "https://opensource.org/licenses/BSD-2-Clause",
  "CC0": "http://creativecommons.org/publicdomain/zero/1.0/",
  "Attribution 4.0 International": "https://creativecommons.org/licenses/by/4.0/",
  "Attribution-ShareAlike 4.0 International": "https://creativecommons.org/licenses/by-sa/4.0/",
  "Attribution-NonCommercial 4.0 International": "https://creativecommons.org/licenses/by-nc/4.0/",
  "Attribution-NoDerivates 4.0 International": "https://creativecommons.org/licenses/by-nd/4.0/",
  "Attribution-NonCommmercial-ShareAlike 4.0 International": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  "Attribution-NonCommercial-NoDerivatives 4.0 International": "https://creativecommons.org/licenses/by-nc-nd/4.0/",
  "Eclipse Public License 1.0": "https://opensource.org/licenses/EPL-1.0",
  "GNU GPL v3": "https://www.gnu.org/licenses/gpl-3.0",
  "GNU GPL v2": "https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html",
  "GNU AGPL v3": "https://www.gnu.org/licenses/agpl-3.0",
  "GNU LGPL v3": "https://www.gnu.org/licenses/lgpl-3.0",
  "GNU FDL v1.3": "https://www.gnu.org/licenses/fdl-1.3",
  "The Hippocratic License 2.1": "https://firstdonoharm.dev",
  "The Hippocratic License 3.0": "https://firstdonoharm.dev",
  "IBM Public License Version 1.0": "https://opensource.org/licenses/IPL-1.0",
  "ISC License (ISC)": "https://opensource.org/licenses/ISC",
  "The MIT License": "https://opensource.org/licenses/MIT",
  "Mozilla Public License 2.0": "https://opensource.org/licenses/MPL-2.0",
  "Attribution License (BY)": "https://opendatacommons.org/licenses/by/",
  "Open Database License (ODbL)": "https://opendatacommons.org/licenses/odbl/",
  "Public Domain Dedication and License (PDDL)": "https://opendatacommons.org/licenses/pddl/",
  "The Perl License": "https://opensource.org/licenses/Artistic-2.0",
  "The Artistic License 2.0": "https://opensource.org/licenses/Artistic-2.0",
  "SIL Open Font License 1.1": "https://opensource.org/licenses/OFL-1.1",
  "The Unlicense": "http://unlicense.org/",
  "The Do What the Fuck You Want to Public License": "http://www.wtfpl.net/about/",
  "The zlib/libpng License": "https://opensource.org/licenses/Zlib"
}

// prompts input from user and saves to variables
inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Welcome to the Professional Project README.md Generator! Please input the title of your project below to get started.\nTitle (Required):',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Fill out the section below and press ENTER when finished. (If left blank, the section will be excluded from the final markdown file.)\nDescription:',
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
      message: 'Which license(s) did you use for your project?\nLicense(s):',
      name: 'license',
      choices: Object.keys(badges),
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
    // create markdown file name
    const filename = `README_${data.title.toLowerCase().split(' ').join('_')}.md`;

    // title + main = main string from inputs
    // will add to these strings in the following code
    let title = `# ${data.title}`;
    var main = ``;

    // toc: string for table of contents section
    // i: table of content numbers
    var toc = `\n\n### Table of Contents`;
    var i = 1;

    // if input in terminal is empty, skip section
    if(data.license.length > 0){
      title = title.concat("\n");
      for(let j = 0; j < data.license.length; j++){
        title = title.concat(`${badges[data.license[j]]}\n`);
      }
    }
    if(data.description.length > 0){
      toc = toc.concat(`\r${i}. [Description](#description)`)
      // if input in terminal is not empty, add section to table of contents
      // and add section to main template
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
        if(j > 0){
          licenseData = licenseData.concat(`\t${data.license[j]}: ${badgeDescription[data.license[j]]}\r`);
        }else{
          licenseData = licenseData.concat(`${data.license[j]}: ${badgeDescription[data.license[j]]}\r`);
        }
      }
      main = main.concat(`\n\n## License(s) <a name="license"></a>\r\t${licenseData}`)
      i++;
    }
    if(data.github.length + data.email.length > 0){
      toc = toc.concat(`\r${i}. [Questions](#question)`)
      main = main.concat(`\n\n## Questions <a name="question"></a>\n`)
      i++;
    }
    if(data.github.length > 0){
      main = main.concat(`\tGithub: @${data.github}\n`)
      i++;
    }
    if(data.email.length > 0){
      main = main.concat(`\tEmail: ${data.email}\n`)
      i++;
    }

    // after all sections are collapsed, add collapse strings to create final string
    // string for final file = title + table of contents + main string
    let final = title + toc + main
    
    // write to file
    fs.writeFile(filename, final, (err) =>
      err ? console.log(err) : console.log('Success!')
    );
  });
