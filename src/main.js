import './assets/styles/main.scss';
import * as components from './components';
import * as configs from './config';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

for (const configName in configs) {
  const config = configs[configName];
  config.configure();
}

const ComponentLibrary = {
  install (Vue) {
    Vue.component('font-awesome-icon', FontAwesomeIcon);

    // components
    for (const componentName in components) {
      const component = components[componentName];
      Vue.component(component.name, component);
    }
  }
};

export default ComponentLibrary;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ComponentLibrary)
}
