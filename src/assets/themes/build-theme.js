var fs = require('fs');
var path = require('path');
var execSync = require('child_process').execSync;
var themeName = process.argv[2]

// Error when no filename argument provided.
if (!themeName) {
  console.log('\x1b[31mERR!\x1b[0m Trailing filename arg must be provided.');
  process.exit(1);
}
var themePath = 'src/assets/themes/'+themeName;
var srcPath = themePath+'/_theme.scss';

// Check source .scss file exists.
if (!fs.existsSync(srcPath)) {
  console.log('\x1b[31mERR!\x1b[0m Path cannot be found: %s', srcPath);
  process.exit(1);
}

// Path to node-sass executable in node_modules directory.
var executablePath = path.join('node_modules', '.bin', 'node-sass');

// Destimation path for resultant .css file.
var destPath = themePath +'/'+themeName+'.min.css';

// The command to be invoked.
var cmd = 'sass --style=compressed' + ' ' + srcPath + ' ' + destPath;

// Execute the command.
execSync(cmd, {
  cwd: process.cwd()
});