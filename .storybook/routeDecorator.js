import { createMemoryHistory, createRouter } from "vue-router";
import { app } from "@storybook/vue3";

let routerInstalled = false;
let router;

export default (path = "/", routerProps = { routes: [] }) => {
  return (storyFn) => {
    if (!routerInstalled) {
      router = createRouter({
        history: createMemoryHistory(),
        ...routerProps,
      });
      app.use(router);
      routerInstalled = true;
    } else {
      routerProps.routes.forEach(r => router.addRoute(r));
    }

    router.replace(path);

    return storyFn();
  };
};
