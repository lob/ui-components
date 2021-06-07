import Vue from 'vue';
import { createRouter } from 'vue-router';

// abbreviated example of https://github.com/gvaldambrini/storybook-router/blob/master/packages/vue/vue.js

export default (path = '/', routerProps = {}) => {
  return (storyFn) => {
    const router = createRouter({ ...routerProps });
    Vue.use(router);
    
    router.replace(path);

    const WrappedComponent = storyFn();

    return Vue.extend({
      router,
      components: { WrappedComponent },
      template: '<wrapped-component/>'
    });
  }
}
