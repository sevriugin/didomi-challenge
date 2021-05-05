# DIDOME Challenge App

## Challenge description
Please read [Front-end engineering challenge](https://github.com/didomi/challenges/tree/master/frontend) to understand the task.

## Technical stack
React with Redux and a Material library

## Experimenting
    - Use `Symbol` datatype for consents type. Mapping  `Symbol` -- `string` for API calls was implemented;

    - Use `axios-mock-adapter` library to mock axios api calls;

    - Use different approach to manage state in `GiveConsent` component where sub-components are responsible for managing individual properties like `name`, `email` and `consents` and `GiveConsent` just provide `User` object using `useRef` hook;

    - Routing implemented by own `Route` component and `events`

## Scaffolding 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and then all created files in src were deleted.  

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!