# UI Components
Lob's Vue component library

## To use in project
```bash
npm install @lob/ui-components
```

In your own project's entry file (eg. `main.js`) This will allow you to use the components anywhere.
```javascript
import components from '@lob/ui-components';

import '@lob/ui-components/dist/ui-components.css';

Vue.use(components);

```

## Development
This repo was initialized using npm v7 which changed the `package-lock.json` file format significantly. Before installing node modules, make sure you have npm v7 installed.

```bash
npm install -g npm@7.13.0
npm install
```

## Unit testing
```bash
npm run test:unit
```

### Lints and fixes files
```bash
npm run lint
```

## Publish to NPM
```bash
npm run build-bundle
npm publish
```
