'use strict'
module.exports = function validate () {
  var problems = [ ]
  for (var i = 0; i < arguments.length; i++) {
    if (!arguments[i][0]) {
      problems.push(arguments[i][1])
    }
  }

  if (problems.length) {
    const lines = [ ]
    const error = text => lines.push(text)
    error('Unable to run:')
    for (const problem of problems) {
      error(` - ${problem}`)
    }
    throw new Error(lines.join('\n'))
  }
}
