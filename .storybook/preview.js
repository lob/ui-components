import { createApp } from "vue";
import * as configs from "../src/config";

import "../src/assets/styles/main.scss";

const app = createApp({});
app.config.globalProperties.$constants = configs.constants;

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "centered",
};
