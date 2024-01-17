import './assets/styles/main.scss';
import * as components from './components';
import * as mixins from './mixins';
import * as configs from './config';

const ComponentLibrary = {
  install(app) {
    app.use(configs.constants);
    for (const mixinName in mixins) {
      const mixin = mixins[mixinName];
      app.mixin(mixin);
    }

    // components
    for (const componentName in components) {
      const component = components[componentName];
      app.component(component.name, component);
    }
  }
};

export default ComponentLibrary;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ComponentLibrary);
}
