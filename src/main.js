import './assets/styles/main.scss';
import * as components from './components';
import * as mixins from './mixins';
import * as configs from './config';
import PrimeVue from 'primevue/config';

const ComponentLibrary = {
  install(app) {
    app.use(configs.constants);
    app.use(PrimeVue, { unstyled: true });
    for (const mixinName in mixins) {
      const mixin = mixins[mixinName];
      app.mixin(mixin);
    }

    // components
    for (const componentName in components) {
      const component = components[componentName];
      app.component(component.name || componentName, component);
    }
  }
};

export default ComponentLibrary;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ComponentLibrary);
}
