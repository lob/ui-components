import { app } from '@storybook/vue3';
import * as configs from '../src/config';
import { findLastIndex } from '../src/utils';

import '../src/assets/styles/main.scss';

app.use(configs.constants);

if (!Array.prototype.findLastIndex) {
  Array.prototype.findLastIndex = findLastIndex; //eslint-disable-line 
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  layout: 'centered'
};
