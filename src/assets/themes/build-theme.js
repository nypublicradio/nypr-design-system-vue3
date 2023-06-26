const execSync = require('child_process').execSync
// process.argv.forEach((value, index) => {
//   console.log(index, value)
// })
// console.log('process.argv[2]', process.argv[2])
var cmd = `sass --style=compressed src/assets/themes/${process.argv[2]}/_theme.scss src/assets/themes/${process.argv[2]}/${process.argv[2]}.min.css`
console.log(`Compiling theme ${process.argv[2]}...`)
execSync(cmd, {
  cwd: process.cwd()
})
