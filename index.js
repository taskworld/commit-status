'use strict'
const validate = require('./validate')
const {GITHUB_TOKEN, BUILD_COMMIT, PROJECT_OWNER, PROJECT_NAME} = require('cross-ci').vars;
exports.post = post

function post ({
  token = GITHUB_TOKEN,
  sha = BUILD_COMMIT,
  owner = PROJECT_OWNER,
  repo = PROJECT_NAME,
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
