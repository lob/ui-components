const constants = {
  lobAssetsUrl: "https://s3-us-west-2.amazonaws.com/public.lob.com",
};

export default {
  install: (app, options) => {
    app.config.globalProperties.$getConst = (key) => constants[key];
  },
};
