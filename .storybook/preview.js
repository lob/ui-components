import { app } from '@storybook/vue3';
import * as mixins from '@/mixins';
import * as configs from '@/config';

import '@/assets/styles/main.scss';

app.use(configs.constants);
for (const mixinName in mixins) {
  const mixin = mixins[mixinName];
  app.mixin(mixin);
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
