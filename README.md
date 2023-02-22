# Warehouse management system app (WMS)

This proyect requires an API in order to work: [https://github.com/PerezTedeschi/wms-api](https://github.com/PerezTedeschi/wms-api)

## Live demo
[https://aycron-wms-app.web.app/](https://aycron-wms-app.web.app/)

### Available test users
- admin@test.com (role admin)
- user@test.com

Any new account created from the app will not have manager-level privileges or access. They will be a regular user with standard permissions.

## Environmental Variables
The following environmental variables are required to run this application:

REACT_APP_API_URL: The URL to the API.
REACT_APP_MAPBOX_API_TOKEN: An API key from Mapbox that is used to display the map and for geocoding.

You can set these variables by creating a .env.development file in the root directory of the project and adding the following lines:

```
REACT_APP_API_URL=<YOUR_API_URL>
REACT_APP_MAPBOX_API_TOKEN=<YOUR_MAPBOX_API_KEY>
```

Replace <YOUR_API_URL> with the URL of the API and <YOUR_MAPBOX_API_KEY> with your API key from Mapbox.

Note that these environmental variables are only required during development. When you deploy your application to production, you should configure these variables using the appropriate mechanisms for your deployment environment.

## Available Scripts

In the project directory, you can run:

### `npm start`

To run the application, use the following command:

```
npm start
```

This will start a development server and open the application in your default browser.


