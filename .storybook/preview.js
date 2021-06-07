import Vue from 'vue';
import * as configs from '../src/config';

import '../src/assets/styles/main.scss';

Vue.use(configs.constants);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'centered'
}
