import RadioGroup from './RadioGroup.vue';
import RadioButton from '../RadioButton/RadioButton.vue';
import mdx from './RadioGroup.mdx';

export default {
  title: 'Components/Radio Group',
  component: RadioGroup,
  subcomponents: { RadioButton },
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

