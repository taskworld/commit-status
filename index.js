'use strict'
const validate = require('./validate')
exports.post = post

function post ({
  token = process.env.GH_STATUS_TOKEN || process.env.GH_TOKEN,
  sha = process.env.CIRCLE_SHA1 || process.env.TRAVIS_COMMIT,
  owner = process.env.CIRCLE_PROJECT_USERNAME || extractSlug(process.env.TRAVIS_REPO_SLUG, 0),
  repo = process.env.CIRCLE_PROJECT_REPONAME || extractSlug(process.env.TRAVIS_REPO_SLUG, 1),
  state,
  context,
  description,
  url,
  rootURL = process.env.GITHUB_API || undefined
}) {
  var validStates = ['pending', 'success', 'error', 'failure']

  validate(
    [token, 'GitHub token not configured (use GH_STATUS_TOKEN env var)'],
    [sha, 'Unable to detect current build’s SHA'],
    [owner, 'Unable to detect repository owner'],
    [repo, 'Unable to detect repository name'],
    [typeof state === 'string', 'state must be given'],
    [typeof context === 'string', 'context must be given'],
    [typeof description === 'string', 'description must be given'],
    [!url || typeof url === 'string', 'url must be a string'],
    [validStates.indexOf(state) >= 0, 'Invalid state (allowed: ' + state + ')']
  )

  const targetUrl = url
  var Octokat = require('octokat')
  var octo = new Octokat({ token: token, rootURL: rootURL })

  return octo.repos(owner, repo).statuses(sha).create({
    state: state,
    context: context,
    description: description,
    target_url: targetUrl || undefined
  })
}

function extractSlug (str, i) {
  return str && str.split('/')[i]
}
