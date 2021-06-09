import './assets/styles/main.scss';
import * as components from './components';
import * as configs from './config';

const ComponentLibrary = {
  install (app) {
    app.use(configs.constants);

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
