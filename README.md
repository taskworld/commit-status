# commit-status

A simple CLI tool to post [commit statuses](https://developer.github.com/v3/repos/statuses/) to GitHub from CI.


## About

At Taskworld, we want to have fine-grain status report for each commit.
This is a perfect use case for GitHub’s commit status API.


## Usage

### setup your GitHub token

Configure your CI to expose a `GH_STATUS_TOKEN` environment variable with your personal access token with `repo:status` scope.
You can generate a token at https://github.com/settings/tokens/new.


### install

Inside your CI deps script, install `commit-status` there.

```
npm install -g commit-status
```


### post

Whenever you want to post a commit status from CI, invoke the command:

```
commit-status <state> <context> <description> [<url>]
```

Example CircleCI setup:

```yaml
    - |
      if gulp lint
      then commit-status success lint/eslint "Linting successful."
      else commit-status failure lint/eslint "There are lint errors."
      fi
```
