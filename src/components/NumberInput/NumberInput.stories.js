import NumberInput from './NumberInput.vue';
import mdx from './NumberInput.mdx';
import { NumberInputMode } from './constants';

export default {
  title: 'Components/Number Input',
  component: NumberInput,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      table: {
        type: {
          summary: 'boolean'
        }
      }
    },
    id: {
      control: 'text',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    max: {
      control: 'number',
      table: {
        type: {
          summary: 'number'
        }
      }
    },
    maxFractionDigits: {
      control: 'number',
      table: {
        type: {
          summary: 'number'
        }
      }
    },
    min: {
      control: 'number',
      table: {
        type: {
          summary: 'number'
        }
      }
    },
    minFractionDigits: {
      control: 'number',
      table: {
        type: {
          summary: 'number'
        }
      }
    },
    mode: {
      options: Object.values(NumberInputMode),
      control: {
        type: 'select'
      },
      table: {
        type: {
          summary: Object.values(NumberInputMode).join('|')
        }
      }
    },
    placeholder: {
      control: 'text',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    readonly: {
      control: 'boolean',
      table: {
        type: {
          summary: 'boolean'
        }
      }
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
