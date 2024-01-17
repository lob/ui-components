import ToggleButton from "./ToggleButton.vue";
import mdx from "./ToggleButton.mdx";

export default {
  title: "Components/Toggle Button",
  component: ToggleButton,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const vModel = true;

const SingleTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ToggleButton },
  setup: () => ({ args }),
  data: () => ({ vModel }),
  template: `
    <toggle-button 
      v-bind="args"
      v-model="vModel" 
    ></toggle-button>
    `,
});

export const Single = SingleTemplate.bind({});
Single.args = {
  label: "4 x 6",
  name: "4x6",
  value: "4x6",
};

const arrayVModel = [];

const GroupTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ToggleButton },
  setup: () => ({ args }),
  data: () => ({ arrayVModel }),
  template: `
  <div>
    <toggle-button
      v-model="arrayVModel"
      label="4 x 6"
      name="4x6"
      value="4x6"
    />
    <toggle-button
       v-model="arrayVModel"
      label="5 x 7"
      name="5x7"
      value="5x7"
    />
    <toggle-button
       v-model="arrayVModel"
      label="5.5 x 8.5"
      name="5.5x8.5"
      value="5.5x8.5"
    />
    <toggle-button
       v-model="arrayVModel"
      label="6 x 11"
      name="6x11"
      value="6x11"
    />
    <toggle-button
       v-model="arrayVModel"
      label="A5"
      name="A5"
      value="A5"
    />
  </div>
    `,
});

export const Group = GroupTemplate.bind({});
