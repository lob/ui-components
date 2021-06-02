const constants = {
  lobAssetsUrl: 'https://s3-us-west-2.amazonaws.com/public.lob.com'
};

constants.install = function (Vue) {
  Vue.prototype.$getConst = (key) => {
    return constants[key];
  };
};

export default constants;
