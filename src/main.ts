import './assets/styles/main.scss';
import * as components from './components';
import * as mixins from './mixins';
import * as configs from './config';
import PrimeVue from 'primevue/config';
import { App } from 'vue';

const ComponentLibrary = {
  install(app: App) {
    app.use(configs.constants);
    app.use(PrimeVue, { unstyled: true });
    for (const mixinName in mixins) {
      // @ts-ignore
      const mixin = mixins[mixinName];
      app.mixin(mixin);
    }

    // components
    for (const componentName in components) {
      // @ts-ignore
      const component = components[componentName];
      app.component(component.name || componentName, component);
    }
  }
};

// TODO Utilize the components export but first we will have to remove global usage.
export * from './components/Icon';
export * from './components/Modal';

export default ComponentLibrary;

// @ts-ignore
if (typeof window !== 'undefined' && window.Vue) {
  // @ts-ignore
  window.Vue.use(ComponentLibrary);
}
