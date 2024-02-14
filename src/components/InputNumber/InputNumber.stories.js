import InputNumber from './InputNumber.vue';
import mdx from './InputNumber.mdx';
import { InputNumberMode } from './constants';

export default {
  title: 'Components/Input Number',
  component: InputNumber,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    disabled: {
      control: 'boolean'
    },
    id: {
      control: 'text'
    },
    max: {
      control: 'number'
    },
    maxFractionDigits: {
      control: 'number'
    },
    min: {
      control: 'number'
    },
    minFractionDigits: {
      control: 'number'
    },
    mode: {
      options: Object.values(InputNumberMode),
      control: {
        type: 'select'
      }
    },
    placeholder: {
      control: 'text'
    },
    readonly: {
      control: 'boolean'
    }
  }
};

const inputNumberModel = 5000;

const PrimaryTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { InputNumber },
  setup: () => ({ args }),
  data: () => ({ inputNumberModel }),
  template: '<InputNumber v-bind="args" v-model="inputNumberModel" />'
});

export const Primary = PrimaryTemplate.bind({});
Primary.args = {
  id: 'input-number',
  name: 'input-number',
  label: 'Input Number',
  helperText: 'Helper text',
  placeholder: 'Amount',
  mode: InputNumberMode.DECIMAL
};

const inputCurrencyModel = 5000;

const CurrencyTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { InputNumber },
  setup: () => ({ args }),
  data: () => ({ inputCurrencyModel }),
  template: '<InputNumber v-bind="args" v-model="inputCurrencyModel" />'
});

export const Currency = CurrencyTemplate.bind({});
Currency.args = {
  id: 'input-currency',
  name: 'input-currency',
  label: 'Input Currency',
  placeholder: 'Amount',
  mode: InputNumberMode.CURRENCY
};
