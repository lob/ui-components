import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import * as configs from '../src/config';

import '../src/assets/styles/main.scss';

for (const configName in configs) {
  const config = configs[configName];
  config.configure();
}

Vue.component('font-awesome-icon', FontAwesomeIcon);

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
