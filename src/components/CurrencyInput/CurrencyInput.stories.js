import CurrencyInput from './CurrencyInput.vue';
import mdx from './CurrencyInput.mdx';

export default {
  title: 'Components/Currency Input',
  component: CurrencyInput,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    'v-model': {
      control: {
        type: null
      }
    }
  }
};

const currencyInputVModel = 5000;

const PrimaryTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CurrencyInput },
  setup: () => ({ args }),
  data: () => ({ currencyInputVModel }),
  template: '<currency-input v-bind="args" v-model="currencyInputVModel" />'
});

export const Primary = PrimaryTemplate.bind({});
Primary.args = {
  id: 'currency-input',
  label: 'Currency Input',
  helperText: 'Helper text',
  placeholder: 'Amount'
};

const WithMinAndMaxTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CurrencyInput },
  setup: () => ({ args }),
  data: () => ({ currencyInputVModel }),
  template: '<currency-input v-bind="args" :min="0" :max="10000" v-model="currencyInputVModel" />'
});

export const WithMinAndMax = WithMinAndMaxTemplate.bind({});
WithMinAndMax.args = {
  id: 'currency-input',
  label: 'Currency Input',
  min: 0,
  max: 100000
};
