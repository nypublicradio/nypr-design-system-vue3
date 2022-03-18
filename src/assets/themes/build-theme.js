const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

const baseThemePath = 'src/assets/themes';
const sassPath = path.join('node_modules', '.bin', 'node-sass');
const themeFileName = '_theme.scss';

// Iterate through directories within baseThemePath
fs.readdir(baseThemePath, (err, files) => {
  if (err) {
    console.error(`Error iterating over directory ${baseThemePath}; ${err}`);
    process.exit(1);
  }

  files.forEach((file, i) => {
    const pathToFile = path.join(baseThemePath, file);
    fs.stat(pathToFile, (err, stat) => {
      if (err) {
        console.error(`Error stating file ${pathToFile}; ${err}`);
      }

      if (stat.isDirectory()) {
        const themePath = path.join(pathToFile, themeFileName);
        fs.stat(themePath, (err, stat) => {
          if (!err && stat.isFile()) {
            const outputPath = path.join(pathToFile, `${file}.min.css`);
            console.log(`Compiling theme ${themePath} to ${outputPath}`);

            var cmd = `sass --style=compressed ${themePath} ${outputPath}`;
            execSync(cmd, {
              cwd: process.cwd()
            });
          }
        });
      }
    });
  });
});