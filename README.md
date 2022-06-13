# VisitorAPI

## Features
- Detect IP addresses of website visitors
- Detect country, state and city of website visitors
- Detect currencies of website visitors
- Detect languages of website visitors
- Detect operating system and version of website visitors
- Detect browser and version of website visitors
- Detect device brand and model of website visitors

## Installing

using npm

```
npm install visitorapi
```

## Example

```
import VisitorAPI from "visitorapi";


VisitorAPI(
    "<my project id>",
    data => {
        console.log(data);
        setCountry(data.countryCode);
    },
    error => {
        console.log(error);
    }
);

```

You will need to create a project via the [VisitorAPI](https://www.visitorapi.com) interface and retrieve the project ID to replace `<my project id>` in the example code.

## Authentication

VisitorAPI doesn't require any API key or token. You will need to specify the domains that are allowed to call the API in the [Visitor API user interface](https://app.visitorapi.com), or the API will return a 403 error.

## Response Data

The response `data` is a JSON object with the following properties:

|    JSON Path   |                                                                      Description                                                                     |
|:--------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------:|
| ipAddress      | The IP address of the visitor.                                                                                                                       |
| countryCode    | Country from which the visitor is located in as an ISO 3166-1 alpha-2 country code.                                                                  |
| countryName    | The full name of the country which the visitor is located in.                                                                                        |
| currencies     | An array of the official currencies of the country which the visitor is located in.                                                                  |
| languages      | An array of the official languages of the country which the visitor is located in.                                                                   |
| region         | Name of the region, state or province which the visitor is located in. The complete list of valid region values is found in the ISO-3166-2 standard. |
| city           | Name of the city which the visitor is located in.                                                                                                    |
| cityLatLong    | Latitude and longitude of the city which the visitor is located in.                                                                                  |
| browser        | The browser name which the visitor uses.                                                                                                             |
| browserVersion | The browser version which the visitor uses.                                                                                                          |
| deviceBrand    | The brand of the device which the visitor uses. Only applicable to mobile devices.                                                                   |
| deviceModel    | The model of the device which the visitor uses. Only applicable to mobile devices.                                                                   |
| deviceFamily   | The family of the device which the visitor uses. Only applicable to mobile devices.                                                                  |
| os             | The operating system name of the device which the visitor uses.                                                                                      |
| osVersion      | The operating system version of the device which the visitor uses.                                                                                   |

