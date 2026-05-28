# visitorapi.js

The core JavaScript SDK for VisitorAPI. Published to npm as
**`visitorapi`**. Lets a browser fetch visitor information (IP,
location, currencies, languages, OS, browser, device) from a
single API call.

- **Product context:** see `https://www.visitorapi.com` and the
  product dashboard at `https://app.visitorapi.com` where users
  create projects and get a project ID.
- **Authorisation model:** VisitorAPI uses domain-allowlist auth
  (no API keys). The browser's referer/origin must match a domain
  the project owner has whitelisted, or the API returns 403.
- **API endpoint:** `https://api.visitorapi.com/api/?pid=<projectId>`

## What's in the repo

```
.
├── index.js        # the whole package — single CJS module
├── package.json
└── README.md
```

That's it. No build step, no dist folder — the source IS the published
artefact.

## The API surface

`index.js` exports a single function:

```js
const VisitorAPI = require("visitorapi");

// Promise form
VisitorAPI(projectId).then(data => {…}).catch(err => {…});

// Callback form
VisitorAPI(projectId, onSuccess, onFailure);
```

The function decides Promise vs callback by whether the second and
third args are `undefined`.

`data` shape (from `response.data.data`): `ipAddress`, `countryCode`,
`countryName`, `currencies[]`, `languages[]`, `region`, `city`,
`cityLatLong`, `browser`, `browserVersion`, `deviceBrand`,
`deviceModel`, `deviceFamily`, `os`, `osVersion`.

## Dependencies

- `axios ^0.27.2` (the only runtime dependency)
- No dev dependencies, no test framework

## Publishing

Standard npm flow:

1. Bump `version` in `package.json` (semver).
2. `npm publish` (requires npm auth as a `visitorapi` org member).

The npm package name is `visitorapi`, not `visitorapi.js` — the repo
name has the `.js` suffix but the published package does not.

## Editing rules

- Keep the package surface minimal. Both Promise and callback forms
  must keep working — `react-country-state-fields` and the GTM
  template depend on this SDK and would break if the signature
  changed.
- The GTM template loads a CDN-hosted build at
  `https://cdn.visitorapi.com/visitor-api.js`. If you change the
  entry point or module format, that CDN copy needs to be rebuilt
  and re-uploaded too (out-of-band — not part of this repo).
- No bundler, no transpilation — keep `index.js` as plain CommonJS
  that works in browsers via bundlers (webpack/vite/etc.) on the
  consumer side.
