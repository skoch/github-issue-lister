# Github Issue Lister 9000

## Setup
1. Install dependencies
```
$ npm i
```

1. Optionally, create `./config/.env` with a key/value pair in the format:
```
GITHUB_API_KEY=api_key
```

1. Start server
```
$ npm start
```

1. Either add a valid Github API Key or optionally, it will automatically load from the config file.

1. Click a repository which will display the issues for that repository.

1. Order by using the up/down buttons.

_NB: Should you decide not to create the above config file, the app will ask to enter a Github API Key_

## Requirements
* The interface should accept a Github API key when first accessed.
* The application should load all associated repositories for that API key, in a single
column layout.
* Selecting a repository should load all of the repositories associated issues.
* The loading of issues should change the interface from single column layout to a
two column interface. Repositories in a left column, issues for the selected
repository in a right column.
* Each issue should display the following: assignee avatar (40x40), title, created
time (format: dd/mm/yyyy), and last updated (example: 2 hours or 3 days ago)
* A user should be able to reorder issues in whatever priority they wish (overriding
the default sort order of the issues you get back).
* The customized order should be able to be persisted in a current client‐side
session so that if you refresh the page, the order will remain. (You do not need to sync this customized order back to the api)
