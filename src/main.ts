import 'primeicons/primeicons.css';
import Tooltip from 'primevue/tooltip';
import { App } from 'vue';

import './assets/styles/main.scss';
import * as components from './components';
import * as mixins from './mixins';
import * as configs from './config';

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
    app.directive('tooltip', Tooltip);
  }
};

// TODO Utilize the components export but first we will have to remove global usage.
export * from './components/Badge';
export * from './components/Chip';
export * from './components/ColorPicker';
export * from './components/DataTable';
export { default as Column } from 'primevue/column';
export * from './components/Grid';
export * from './components/Icon';
export * from './components/IconButton';
export * from './components/ImageFileUpload';
export * from './components/KeyValueInput';
export * from './components/Menu';
export * from './components/Modal';
export * from './components/Overlay';
export * from './components/Panel';
export * from './components/Pagination';
export * from './components/RadioButton';
export * from './components/Skeleton';
export * from './components/Steps';
export * from './components/Table';
export * from './components/Textarea';
export * from './components/Tooltip';
export * from './components/Tile';
export * from './types';

export default ComponentLibrary;

// @ts-ignore
if (typeof window !== 'undefined' && window.Vue) {
  // @ts-ignore
  window.Vue.use(ComponentLibrary);
}
