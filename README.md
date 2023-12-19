# UI Components
Lob's Vue component library. This repo is public. We are building our components in public to showcase the work that Lob is doing to create a consistent design system as well as follow best practices in modern web development and accessibility.

This component library can be found at [https://ui-components.lob.com/](https://ui-components.lob.com/).

- [To use in project](#to-use-in-project)
  - [Styling](#styling)
  - [Internationalization](#internationalization)
- [Development](#development)
  - [Conventions](#conventions)
    - [`src` alias](#src-alias)
    - [Atomic components](#atomic-components)
    - [Default to Slots](#default-to-slots)
    - [Styling](#styling-1)
    - [Storybook](#storybook)
      - [Naming](#naming)
      - [Use Decorators If You Need A Wrapper](#use-decorators-if-you-need-a-wrapper)
      - [Documentation](#documentation)
      - [Routing](#routing)
    - [Accessibility](#accessibility)
- [Unit testing](#unit-testing)
- [Lints and fixes files](#lints-and-fixes-files)
- [Contributing](#contributing)
  - [A Complete PR for a Component](#a-complete-pr-for-a-component)
- [Publish to NPM](#publish-to-npm)

## To use in project
```bash
npm install @lob/ui-components
```

Add the following code in your own project's entry file (e.g. `main.js`) This will allow you to use the components anywhere.

```javascript
import { createApp } from 'vue';
import components from '@lob/ui-components';

import '@lob/ui-components/dist/ui-components.css';

createApp(App)
  .use(components)
  .mount('#app');
```

### Styling
If you would like to use the same Tailwind configuration in your project as is used in this component library, you can install and configure it via a plugin in your `tailwind.config.js`. Note, you'll need to have already installed Tailwind.
```bash
npm install --save-dev tailwind-plugin-lob
```


```js
module.exports = {
  plugins: [require('tailwind-plugin-lob')]
  // If you need to specify other options, you can set other options
};
```

### Internationalization
This component library supports optional (though strongly encouraged 🙃) internationalization with [vue-i18n](https://vue-i18n.intlify.dev/).

Without vue-i18n in your application, labels and screen reader instructions will be in English. To provide different translations or translations in other languages, install vue-i18n and put the following code in your app's entry file (e.g. `main.js`)

```bash
npm install vue-i18n@next
```

```javascript
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import components from '@lob/ui-components';

import '@lob/ui-components/dist/ui-components.css';

// we recommend putting each locale object in its own file (i.e. in src/locales and exporting)
const messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  es: {
    message: {
      hello: 'hola mundo'
    }
  }
}

const i18n = VueI18n.createI18n({
  locale: 'es', // set locale, we recommend creating a function to get the user's default local
  fallbackLocale: 'en', // set fallback locale, we recommend putting this in your env vars
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
})

createApp(App)
  .use(i18n)
  .use(components)
  .mount('#app');
```

## Development
Before installing node modules, make sure you have the node and npm versions installed matching what's listed in the `engines` in `package.json`.

### Conventions
#### `src` alias
The path to the `src` directory is aliased as `@` so we can avoid relative paths in our imports. This makes our codebase more resilient as it grows because if we refactor and move files around, we won't have to spend as much time fixing relative path imports.

#### Atomic components
When applicable, split components up across multiple smaller components. For example, don't put every element of the nav bar into one component called `NavBar` - split them up into a `NavBarListItem` and the nav bar itself.

#### Default to Slots

When you're not sure how many children a parent component may have, default to using slots so that it's as extendable as possible.

#### Styling
We try to avoid custom scoped styles in our components and use the Tailwind classes everywhere possible.

If your designs are off by a pixel or two from Tailwind presets, we **highly recommend** using the Tailwind presets instead of creating one-off styles.

There are some minimal use cases where scoped styles are preferable

- When you need to style a `::before` or `::after` pseudo element
- When you need styles based on siblings (`+` or `~` selectors)
- When you have styles that truly don't appear anywhere else in the designs (this should happen extremely rarely thought we've seen it most often with box-shadows)

#### Storybook

##### Naming

If your component has a single Story, we use the default "Primary" naming convention.

If your component has multiple stories, we name each story semantically to describe the use case.

##### Use Decorators If You Need A Wrapper

If you need a wrapper container around your story (for example, because you have multiple elements, or you need to apply styling to the container), use a decorator.

See the [main navigation component story file](https://github.com/lob/ui-components/blob/main/src/components/MainNavigation/MainNavigation.stories.js#L79) for an example.

##### Documentation

We're using `.mdx` files for documentation for each component. This allows us to use markdown to write more detailed docs but also integrate with Storybook's docs add-on blocks (e.g. things like automatically generating a preview of your component, the props table, etc.).

At the minimum, each component's docs should have:

- A preview section
- An intro to the component - what it'd most commonly be used for
- How to use the component, with code examples
- A props section with the types and required fields complete

##### Routing

We've included Vue Router and a `routeDecorator` (`.storybook/routeDecorator.js`) so you can use dynamic routing in your components. If your component needs to be route-aware, either because it uses `router-link` or it checks `this.$route` in a computed prop or method, you'll need the route decorator in your Story.

See the [main navigation](https://github.com/lob/ui-components/blob/main/src/components/MainNavigation/MainNavigation.stories.js#L14) and [subnavigation component story](https://github.com/lob/ui-components/blob/main/src/components/Subnavigation/Subnavigation.stories.js#L20) files for examples.

#### Accessibility

While we're not strictly enforcing any particular WCAG standard (though we should strive for at least AA), we want to achieve a base-level of accessibility with our first iteration. This includes:

- Keyboard navigable
- Sensical for screen reader users
- Color contrast passes AA at least

## Running storybook locally
```bash
npm run storybook
```
## Unit testing
```bash
npm run test
```

## Lints and fixes files
```bash
npm run lint
```

## Contributing
### A Complete PR for a Component

We consider a component PR complete when it has the following:

- Storybook examples with the ability to trigger each state
- Clear Storybook documentation
- Base level of accessibility
- Tests added/updated for any code added/updated
- Existing tests & lint passes (integrated with GitHub Actions, but you can also run both locally)

### Adding new Icons

Our SVG Icons require a range of sizes from 14px to 24px. For convenience, you can use the following shell script to generate resized copies of an svg at the relevant sizes:

```bash
#!/bin/bash

SIZES=(14 16 18 20 24)

for FILENAME in "$@"
do
    echo "Processing $FILENAME"
    for SIZE in "${SIZES[@]}"
    do
      echo "Resizing to $SIZE"x"$SIZE"
      NEW="$(echo "$FILENAME" | sed -e "s/svg$/$SIZE.svg/")"
      rsvg-convert "$FILENAME" -w $SIZE -h $SIZE -f svg -o "$NEW"
    done
    echo "Done processing $FILENAME"
done

# e.g. ./ResizeIcons.sh arrow_icon.svg house_icon.svg
```
**Note:** You must have librsvg installed to use this script:
```
brew install librsvg
```


## Deploying Updates
When a PR is opened Amplify will automatically build and deploy a PR preview.  You will see the URL for the preview in a comment from the Amplify bot in the PR.

When the PR is merged to `main` Amplify will auto build and deploy to [https://ui-components.lob.com/](https://ui-components.lob.com/).

## Publish to NPM

We have a GitHub Action set up to publish this package automatically to NPM when the version number in `package.json` is incremented on the `main` branch.

If you need to publish manually, you can do:
```bash
npm run build
npm publish
```


