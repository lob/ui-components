# UI Components
Lob's Vue component library

## To use in project
```
npm install @lob/ui-components
```

In your own project's entry file (eg. `main.js`) This will allow you to use the components anywhere.
```javascript
import components from '@lob/ui-components';

import '@lob/ui-components/dist/ui-components.css';

Vue.use(components);

```

## Development
This repo was initialized using npm v7 which changes the `package-lock.json` file format changed significantly. Before installing node modules, make sure you have npm v7 installed.
```
npm install -g npm@latest
npm install
```

### Lints and fixes files
```
npm run lint
```

## Publish to NPM
```
npm run build-bundle
npm publish
```

## To-dos
- [ ] Implement story book
- [ ] Implement component testing
- [ ] Implement changelog practices

