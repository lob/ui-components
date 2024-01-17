import { createMemoryHistory, createRouter } from "vue-router";
import { app } from "@storybook/vue3";

let routerInstalled = false;
let router;

export const routeTemplate = (name) => `<div>${name}</div>`;

export default (path = "/", routes = []) => {
  routes = [
    { path: "", component: { template: routeTemplate("default empty") } },
    { path: "", component: { template: routeTemplate("default /") } },
    ...routes,
  ];
  return (storyFn) => {
    if (!routerInstalled) {
      router = createRouter({
        history: createMemoryHistory(),
        routes,
      });
      app.use(router);
      routerInstalled = true;
    } else {
      routes.forEach((r) => router.addRoute(r));
    }

    router.replace(path);

    return storyFn();
  };
};
