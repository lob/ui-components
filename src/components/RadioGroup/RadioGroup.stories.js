import RadioGroup from './RadioGroup.vue';
import RadioButton from '../RadioButton/RadioButton.vue';
import RadioButtonLarge from '../RadioButtonLarge/RadioButtonLarge.vue';
import mdx from './RadioGroup.mdx';

export default {
  title: 'Components/Radio Group',
  component: RadioGroup,
  subcomponents: { RadioButton, RadioButtonLarge },
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const radioModel = '4x6';

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RadioGroup, RadioButton },
  data: () => ({ radioModel }),
  setup: () => ({ args }),
  template: `
    <radio-group v-bind="args">
      <radio-button
        id="4x6"
        name="postcard-size"
        label="4x6"
        value="4x6"
        v-model="radioModel"
      />
      <radio-button
        id="5x7"
        name="postcard-size"
        label="5x7"
        value="5x7"
        v-model="radioModel"
      />
      <radio-button
        id="big"
        name="postcard-size"
        label="Really Big"
        value="big"
        v-model="radioModel"
      />
    </radio-group>
  `
});

export const Primary = Template.bind({});
Primary.args = {
  legend: 'Postcard Size',
  separateLines: false
};

const booleanModel = '';

const BooleanTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RadioGroup, RadioButton },
  data: () => ({ booleanModel }),
  setup: () => ({ args }),
  template: `
    <radio-group v-bind="args">
      <radio-button
        id="included"
        name="returnEnvelope"
        label="Included"
        :value="true"
        v-model="booleanModel"
      />
      <radio-button
        id="notIncluded"
        name="returnEnvelope"
        label="Not included"
        :value="false"
        v-model="booleanModel"
      />
    </radio-group>
  `
});

export const Boolean = BooleanTemplate.bind({});
Primary.args = {
  legend: 'Postcard Size',
  separateLines: false
};

const withHelperTextModel = '';

const WithHelperTextTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RadioGroup, RadioButton },
  data: () => ({ withHelperTextModel }),
  setup: () => ({ args }),
  template: `
    <radio-group v-bind="args" :separate-lines="true">
    <radio-button
    id="4x6"
    name="postcard-size"
    label="4x6"
    value="4x6"
    v-model="withHelperTextModel"
    helper-text="This is helper text"
  />
  <radio-button
    id="5x7"
    name="postcard-size"
    label="5x7"
    value="5x7"
    v-model="withHelperTextModel"
    helper-text="This is helper text"
  />
  <radio-button
    id="big"
    name="postcard-size"
    label="Really Big"
    value="big"
    v-model="withHelperTextModel"
    helper-text="This is helper text"
  />
    </radio-group>
  `
});

export const WithHelperText = WithHelperTextTemplate.bind({});
Primary.args = {
  legend: 'Postcard Size',
  separateLines: false
};

const largeGroupModel = '';

const LargeGroupTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RadioGroup, RadioButtonLarge },
  data: () => ({ largeGroupModel }),
  setup: () => ({ args }),
  template: `
    <radio-group v-bind="args">
    <radio-button-large
    id="4x6"
    name="postcard-size"
    label="4x6"
    value="4x6"
    v-model="largeGroupModel"
    helper-text="This is helper text"
  />
  <radio-button-large
    id="5x7"
    name="postcard-size"
    label="5x7"
    value="5x7"
    v-model="largeGroupModel"
    helper-text="This is helper text"
  />
  <radio-button-large
    id="big"
    name="postcard-size"
    label="Really Big"
    value="big"
    v-model="largeGroupModel"
    reveal-text="Reveal text"
  />
    </radio-group>
  `
});

export const LargeGroup = LargeGroupTemplate.bind({});
Primary.args = {
  legend: 'Postcard Size',
  separateLines: false
};
