#!/usr/bin/env node

var token = process.env.GH_STATUS_TOKEN || process.env.GH_TOKEN;
var sha   = process.env.CIRCLE_SHA1 || process.env.TRAVIS_COMMIT;
var owner = process.env.CIRCLE_PROJECT_USERNAME || extractSlug(process.env.TRAVIS_REPO_SLUG, 0);
var repo  = process.env.CIRCLE_PROJECT_REPONAME || extractSlug(process.env.TRAVIS_REPO_SLUG, 1);


var usage = ' (Usage: commit-status <state> <context> <description> [<target_url>])';

validate(
  [token, 'GitHub token not configured (use GH_STATUS_TOKEN env var)'],
  [sha,   'Unable to detect current build’s SHA'],
  [owner, 'Unable to detect repository owner'],
  [repo,  'Unable to detect repository name'],
  [process.argv.length >= 5, 'Not enough arguments.' + usage],
  [process.argv.length <= 6, 'Too many arguments.' + usage]
);


var state       = process.argv[2];
var context     = process.argv[3];
var description = process.argv[4];
var targetUrl   = process.argv[5];
var validStates = ['pending', 'success', 'error', 'failure'];

validate(
  [validStates.indexOf(state) >= 0, 'Invalid state (allowed: ' + state + ')']
);


var Octokat = require('octokat');
var octo    = new Octokat({ token: token });

octo.repos(owner, repo).statuses(sha).create({
  state:        state,
  context:      context,
  description:  description,
  target_url:   targetUrl || undefined,
}).catch(function (e) {
  setImmediate(function () {
    throw e;
  });
});


function extractSlug (str, i) {

  return str && str.split('/')[i];
}


function validate () {

  var problems = [ ];
  for (var i = 0; i < arguments.length; i++) {
    if (!arguments[i][0]) {
      problems.push(arguments[i][1]);
    }
  }

  if (problems.length) {
    console.error('Unable to run:');
    problems.forEach(function (problem) {
      console.error(' -', problem);
    });
    console.error('');
    process.exit(1);
  }
}
