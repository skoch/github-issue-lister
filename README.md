# Chegg Code Challenge

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
