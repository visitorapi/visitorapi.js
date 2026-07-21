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

- **None.** Uses the native `fetch` API. Previously depended on `axios`
  (bumped `^0.27.2` -> `^1.15.1` for a CVE fix, then dropped entirely),
  see "Editing rules" below for why.
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
- **Don't reintroduce axios (or any HTTP client library) without
  checking bundler compatibility first.** axios >=1.x's `package.json`
  "exports" map only offers `.cjs` entry points for `require()` (both
  the "default" and "browser" conditions), and there's no sanctioned
  `.js`-extension subpath to deep-import around it. Create React App's
  Webpack config (react-scripts 5, and likely other older/frozen
  bundler configs) only runs `babel-loader` on
  `/\.(js|mjs|jsx|ts|tsx)$/` — `.cjs` isn't in that list — so
  `require("axios")` silently resolves to a static asset URL string
  instead of the module in that context, breaking auto-detection with
  no error, just silently empty fields downstream. This is why the
  SDK uses native `fetch` instead: it sidesteps the entire class of
  bundler/package-export-resolution problem, and fetch is supported in
  every browser this package targets (and Node 18+, for direct/test
  usage). If a future dependency is ever needed, verify it works
  through an actual bundled consumer app (e.g. the
  `react-country-state-fields` demo), not just plain Node, plain
  `require()`/`node -e` can succeed while bundled usage silently
  breaks.
- The GTM template loads a CDN-hosted build at
  `https://cdn.visitorapi.com/visitor-api.js`. If you change the
  entry point or module format, that CDN copy needs to be rebuilt
  and re-uploaded too (out-of-band — not part of this repo).
- No bundler, no transpilation — keep `index.js` as plain CommonJS
  that works in browsers via bundlers (webpack/vite/etc.) on the
  consumer side.
