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
Boolean.args = {
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
    <radio-group v-bind="args">
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
WithHelperText.args = {
  legend: 'Postcard Size',
  separateLines: false
};

const largeGroupModel = '4x6';

const LargeGroupTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RadioGroup, RadioButtonLarge },
  data: () => ({ largeGroupModel }),
  setup: () => ({ args }),
  template: `
    <radio-group large v-bind="args">
    <radio-button-large
    id="4x6"
    name="postcard-size"
    label="4x6"
    value="4x6"
    v-model="largeGroupModel"
    disabled
  />
  <radio-button-large
    id="5x7"
    name="postcard-size"
    label="5x7"
    value="5x7"
    v-model="largeGroupModel"
  />
  <radio-button-large
    id="big"
    name="postcard-size"
    label="Really Big"
    value="big"
    v-model="largeGroupModel"
  />
    </radio-group>
  `
});

export const LargeGroup = LargeGroupTemplate.bind({});
LargeGroup.args = {
  legend: 'Postcard Size',
  separateLines: false
};

const largeGroupWithFullHeightModel = '';

const LargeGroupWithFullHeightTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RadioGroup, RadioButtonLarge },
  data: () => ({ largeGroupWithFullHeightModel }),
  setup: () => ({ args }),
  template: `
    <radio-group large v-bind="args">
      <div style="width: 50%; margin-right: 10px">
        <radio-button-large
          id="4x6"
          name="postcard-size"
          label="4x6"
          value="4x6"
          v-model="largeGroupWithFullHeightModel"
          helper-text="This is a short description"
          full-width
          full-height
        />
      </div>
      <div style="width: 50%">
        <radio-button-large
          id="5x7"
          name="postcard-size"
          label="5x7"
          value="5x7"
          v-model="largeGroupWithFullHeightModel"
          helper-text="This is a very long description so we can see what happens when the text takes up two (or more) lines. All of the text should show inside the radio button, and not overflow outside of it."
          full-width
          full-height
        />
      </div>
    </radio-group>
  `
});

export const LargeGroupWithFullHeight = LargeGroupWithFullHeightTemplate.bind({});
LargeGroupWithFullHeight.args = {
  legend: 'Postcard Size',
  separateLines: false
};

