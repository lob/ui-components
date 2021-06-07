import { createRouter } from "vue-router";
import "./assets/styles/main.scss";
import * as components from "./components";
import * as configs from "./config";

const ComponentLibrary = {
  install(Vue) {
    Vue.use(createRouter());
    Vue.use(configs.constants);

    // components
    for (const componentName in components) {
      const component = components[componentName];
      Vue.component(component.name, component);
    }
  },
};

export default ComponentLibrary;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(ComponentLibrary);
}
