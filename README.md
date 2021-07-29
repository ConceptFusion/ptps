# PartsTrader Technical Exercise

## Validate Part Number

Part numbers are validated as the user types, with the lookup button disabled until the format is correct. An error is displayed only if the user blurs out of the field and the error is only removed once the format is corrected. The isValidPartNumber method is unit tested.

## Check Exclusion List

On lookup the validated part number is checked against the exclusion list and if matched the user receives a toast notification informing them of the exclusion and no lookup occurs.

## Lookup Compatible Parts

The mock parts service api contains the following parts, including alternate part relationships.

- 1111-Door
- 1112-Door
- 1113-Door
- 1114-Door
- 2222-taillight_left
- 2223-taillight_left
- 2223-taillight_left
- 2224-taillight_left

<br>

# Getting started with the PartsTrader Parts Service Application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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
