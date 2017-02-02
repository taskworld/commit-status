'use strict'
module.exports = function validate () {
  var problems = [ ]
  for (var i = 0; i < arguments.length; i++) {
    if (!arguments[i][0]) {
      problems.push(arguments[i][1])
    }
  }

  if (problems.length) {
    console.error('Unable to run:')
    problems.forEach(function (problem) {
      console.error(' -', problem)
    })
    console.error('')
    process.exit(1)
  }
}
