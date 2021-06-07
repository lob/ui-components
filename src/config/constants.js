const constants = {
  lobAssetsUrl: "https://s3-us-west-2.amazonaws.com/public.lob.com",
};

export default {
  get: (key) => constants[key],
};
