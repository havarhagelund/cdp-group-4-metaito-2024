## A guide to running tests in our project

### Unit Testing
As mentioned before, to run our unit tests, write

```bash
npm run test
```

in the terminal.
You will then see that all tests are passing.
![Jest tests run](/docs/misc/jest_test.png)

### E2E Testing
For the E2E testing, you will need to have two terminals open, one for running the application and one for running the tests.

Make sure you have administrator rights to run the tests.

First, run the application by writing

```bash
npm run dev
npm run cypress:open
```

in the terminal.

This will open the Cypress test runner, which will look like this:
![Cypress Open](/docs/misc/cypress_open.png)

Then click "E2E Testing" which is to the left. This will prompt you to choose a web browser.
![Cypress Choose Browser](/docs/misc/cypress_browser.png)

Choose the browser you want to run the tests in. Now the browser will open, and you can choose to run tests.
![Cypress Run tests](/docs/misc/cypress_run_tests.png)

Clicking on "splatFlow.cy.ts" spec, will then run the splatFlow test.
![Cypress Run Splat Flow test](/docs/misc/cypress_run_splatFlow.png)

You can now choose to run any of the other tests, and they should pass.
