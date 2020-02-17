# Intranet

This is a test project to represent all power of Angular! Live view can be found here [Intranet](https://intranet-shypat.firebaseapp.com/toolbox)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Jest](https://github.com/facebook/jest).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more info, please contact me directly

## Configuration

- Application supports multi-languages (EN, PL)
  - To add new language, you need to add it in configuration file first (LANGUAGES) and create translation file for it
  - To change default language, modify app-config.json DEFAULT_LANGUAGE
- Dynamic menu
  - To show, hide menu item in header, update HEADER_NAV array in app-config.json, by adding/removing option.
  - Note: To make it work properly new item should have route configured in app.module.ts and translation in translation file, othervise it will redirect, to not found page
- Search is started by default after 3 symbols beeng typed
  - It can be changed in NUMBER_OF_SYMBOLS_TO_START_SEARCH to different number
- App logos are also avaliable for configuration
  - To change header logo, upload new logo to assets/img folder and then provide just a file name in app-config.js LOGO property
  - To change footer logo, upload new logo to assets/img folder and then provide just a file name in app-config.js LOGO_INVERTED property
