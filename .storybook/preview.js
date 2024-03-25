import { setup } from '@storybook/vue3';
import * as mixins from '@/mixins';
import * as configs from '@/config';
import PrimeVue from 'primevue/config';

import '@/assets/styles/main.scss';
import 'primeicons/primeicons.css';

setup((app) => {
  app.use(configs.constants);
  app.use(PrimeVue, { unstyled: true });
  for (const mixinName in mixins) {
    const mixin = mixins[mixinName];
    app.mixin(mixin);
  }
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    },
    sort: 'requiredFirst'
  },
  layout: 'centered'
};
