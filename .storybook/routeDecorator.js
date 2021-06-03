import Vue from 'vue';
import VueRouter from 'vue-router';

// abbreviated example of https://github.com/gvaldambrini/storybook-router/blob/master/packages/vue/vue.js

export default (path = '/') => {
  return (storyFn) => {
    Vue.use(VueRouter);
    const router = new VueRouter({ mode: 'history' });
    
    router.replace(path);

    const WrappedComponent = storyFn();

    return Vue.extend({
      router,
      components: { WrappedComponent },
      template: '<wrapped-component/>'
    });
  }
}
