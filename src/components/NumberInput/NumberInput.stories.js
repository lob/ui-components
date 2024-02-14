import NumberInput from './NumberInput.vue';
import mdx from './NumberInput.mdx';
import { NumberInputMode } from './constants';

export default {
  title: 'Components/Input Number',
  component: NumberInput,
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
      options: Object.values(NumberInputMode),
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

const numberInputModel = 5000;

const PrimaryTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { NumberInput },
  setup: () => ({ args }),
  data: () => ({ numberInputModel }),
  template: '<NumberInput v-bind="args" v-model="numberInputModel" />'
});

export const Primary = PrimaryTemplate.bind({});
Primary.args = {
  id: 'input-number',
  name: 'input-number',
  label: 'Input Number',
  helperText: 'Helper text',
  placeholder: 'Amount',
  mode: NumberInputMode.DECIMAL
};

const currencyInputModel = 5000;

const CurrencyTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { NumberInput },
  setup: () => ({ args }),
  data: () => ({ currencyInputModel }),
  template: '<NumberInput v-bind="args" v-model="currencyInputModel" />'
});

export const Currency = CurrencyTemplate.bind({});
Currency.args = {
  id: 'input-currency',
  name: 'input-currency',
  label: 'Input Currency',
  placeholder: 'Amount',
  mode: NumberInputMode.CURRENCY
};
