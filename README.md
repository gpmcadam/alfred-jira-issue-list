# Alfred JIRA Issue List

- 🔎 Quickly look-up tickets from your JIRA board
- 📋 Copy JIRA ticket numbers
- 🌍 Instantly open tickets in your browser

## Setup

> **NOTE** Ensure you're using Alfred v5 or later and that Alfred has access to a version of Node (>=12)

1. Install the workflow from npm: `npm install --global alfred-jira-issue-list`
2. Configure the workflow 'Workflows' -> 'JIRA Issue List' -> 'Configure Workflow'

## Running

- Within alfred, use the `JIRA` keyword to bring up results
- Filter results by key, status or description
- Cmd-C to copy the highlighted issue key
- Enter to open the issue in the browser

## Troubleshooting

In general you may find it useful to use the Alfred Debugger for most issues.

See: https://www.alfredapp.com/help/workflows/advanced/debugger/

### "Library not loaded" error

You may see an error when running the workflow, similar to the following:

```
Code 134: dyld: Library not loaded: /usr/local/opt/icu4c/lib/libicui18n.62.dylib
  Referenced from: /usr/local/bin/node
  Reason: image not found
./node_modules/.bin/run-node: line 49: 69016 Abort trap: 6           ESM_OPTIONS='{"await":true}' node --require esm "$@"
```

Ensure Alfred has access to a version of NodeJS by installing one through Brew, or upgrading to a compatible version:

```
brew upgrade nodejs
```
