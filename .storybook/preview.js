import { app } from '@storybook/vue3';
import * as configs from '@/config';

import '@/assets/styles/main.scss';

app.use(configs.constants);

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
