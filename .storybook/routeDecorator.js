import { createMemoryHistory, createRouter } from "vue-router";
import { app } from "@storybook/vue3";

// abbreviated example of https://github.com/gvaldambrini/storybook-router/blob/master/packages/vue/vue.js

export default (
  path = "/",
  routerProps = { routes: [{ path: "" }, { path: "/" }] }
) => {
  return (storyFn, x) => {
    const router = createRouter({
      history: createMemoryHistory(),
      ...routerProps,
    });
    app.use(router);
    router.replace(path);

    return storyFn();
  };
};
