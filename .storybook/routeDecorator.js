import { createMemoryHistory, createRouter } from 'vue-router';
import { getCurrentInstance } from 'vue';

let router;

export const routeTemplate = (name) => `<div>${name}</div>`;

export default (path = '/', routes = []) => {
  routes = [
    { path: '', component: { template: routeTemplate('default empty') } },
    { path: '', component: { template: routeTemplate('default /') } },
    ...routes
  ];
  return (storyFn) => {
    // It is not recommended to utilize getCurrentInstance in production code, we should find a way to stop doing this.
    const isVueRouterInstalled = Boolean(
      getCurrentInstance().appContext.config.globalProperties.$router
    );
    if (!isVueRouterInstalled) {
      const app = getCurrentInstance().appContext.app;
      router = createRouter({
        history: createMemoryHistory(),
        routes
      });
      app.use(router);
    } else {
      routes.forEach((r) => router.addRoute(r));
    }

    router.replace(path);

    return storyFn();
  };
};
