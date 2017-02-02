#!/usr/bin/env node
'use strict'
const validate = require('./validate')
const commitStatus = require('./index')
const usage = ' (Usage: commit-status <state> <context> <description> [<target_url>])'

validate(
  [process.argv.length >= 5, 'Not enough arguments.' + usage],
  [process.argv.length <= 6, 'Too many arguments.' + usage]
)

commitStatus.post({
  state: process.argv[2],
  context: process.argv[3],
  description: process.argv[4],
  url: process.argv[5]
}).catch(function (e) {
  setImmediate(function () {
    throw e
  })
})
