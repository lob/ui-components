import { createRouter } from "vue-router";
import "./assets/styles/main.scss";
import * as components from "./components";
import * as configs from "./config";
import { createRouter, createMemoryHistory } from "vue-router";

const ComponentLibrary = {
  install(app) {
    app.use(createRouter());
    app.config.globalProperties.$constants = configs.constants;

    // components
    for (const componentName in components) {
      const component = components[componentName];
      app.component(component.name, component);
    }
  },
};

export default ComponentLibrary;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(ComponentLibrary);
}
