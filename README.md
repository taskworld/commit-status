# commit-status

A simple CLI tool to post [commit statuses](https://developer.github.com/v3/repos/statuses/) to GitHub from CI.


## About

At Taskworld, we want to have fine-grain status report for each commit.
This is a perfect use case for GitHub’s commit status API.


## Usage

### Configure CI to expose GitHub access token

`commit-status` will look for GitHub access from these environment variables, in this order:

- `GH_STATUS_TOKEN`
- `GH_TOKEN`

That token should have `repo:status` scope.

You can create a bot account and obtain a token at https://github.com/settings/tokens/new.


## CLI

### Install

Inside your CI deps script, install `commit-status` there:

```
npm install -g commit-status
```


### Post commit status

Whenever you want to post a commit status from CI, invoke the command:

```
commit-status <state> <context> <description> [<url>]
```

- `state` — Either `pending`, `success`, `error`, `failure`
- `context` — “A string label to differentiate this status from the status of other systems.”
- `description` — “A short description of the status.”
- `url` — The URL to display.

Example CircleCI setup:

```yaml
    - |
      if gulp lint
      then commit-status success lint/eslint "Linting successful."
      else commit-status failure lint/eslint "There are lint errors."
      fi
```

## API

```js
const commitStatus = require('commit-status')

commitStatus.post({
  state: 'success',
  context: 'lint/eslint',
  description: 'Linting successful.'
})
```
