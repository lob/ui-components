import './assets/styles/main.scss';
import 'primeicons/primeicons.css';
import * as components from './components';
import * as mixins from './mixins';
import * as configs from './config';
import { App } from 'vue';

const ComponentLibrary = {
  install(app: App) {
    app.use(configs.constants);
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
export * from './components/Badge';
export * from './components/ColorPicker';
export * from './components/Icon';
export * from './components/IconButton';
export * from './components/ImageFileUpload';
export * from './components/Modal';
export * from './components/Steps';

export default ComponentLibrary;

// @ts-ignore
if (typeof window !== 'undefined' && window.Vue) {
  // @ts-ignore
  window.Vue.use(ComponentLibrary);
}
