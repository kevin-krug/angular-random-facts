# RandomFactsApp

A responsive angular 19 app fetching random facts from https://uselessfacts.jsph.pl/ with a favorites section and a search input to filter favorites (persisted to local storage). No external libaries were used besides angular. No signals were used yet instead Rxjs.  

- UX improvements so far: add favorite button disables if favorite already exists, clear button disables if no favorites exist, generic error added for fact error, generic loader added for fact and favorites

- Further improvement ideas: fuzzy search for the favorites filter, ensure unique id vs. relying on api ids, add more unit tests

## Development server

```bash
npm run start
```

start dev server at `http://localhost:4200/`.

## Building

```bash
npm run build
```

builds project to `dist/`.

## Running unit tests


```bash
npm run test
```

runs unit tests with the [Karma](https://karma-runner.github.io) test runner
