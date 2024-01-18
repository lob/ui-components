import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import CurrencyInput from '../CurrencyInput.vue';

describe('Currency input', () => {
  const initialProps = {
    id: 'test',
    'v-model': 50,
    inputProps: {
      name: 'test',
      label: 'label'
    }
  };

  it('renders correctly', () => {
    const props = initialProps;
    const { getByLabelText } = render(CurrencyInput, {
      props
    });
    const currencyInput = getByLabelText(props.inputProps.label);

    expect(currencyInput).toBeInTheDocument();
  });

  it('updates the input value on text input', async () => {
    const props = initialProps;
    const { getByLabelText } = render(CurrencyInput, {
      props
    });
    const currencyInput = getByLabelText(props.inputProps.label);

    await fireEvent.update(currencyInput, '$6.00');
    expect(currencyInput.value).toEqual('$6.00');
  });

  it('fires the input event with a numeric value on text input', async () => {
    const props = initialProps;
    const { getByLabelText, emitted } = render(CurrencyInput, {
      props
    });
    const currencyInput = getByLabelText(props.inputProps.label);

    const updatedValue = '$6.00';
    await fireEvent.update(currencyInput, updatedValue);

    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('input');
    expect(emittedEvent).toHaveProperty('change');
    expect(emittedEvent.input[0]).toEqual([6]);
  });

  it('renders the helper text correctly when passed as an input prop', () => {
    const props = {
      ...initialProps,
      inputProps: {
        helperText: 'Helper text'
      }
    };
    const { getByText } = render(CurrencyInput, {
      props
    });

    const helperText = getByText('Helper text');
    expect(helperText).toBeInTheDocument();
  });

  describe('if show dollar sign is false', () => {
    it('does not show the dollar sign', async () => {
      const props = { ...initialProps, showDollarSign: false };
      const { getByLabelText } = render(CurrencyInput, {
        props
      });
      const currencyInput = getByLabelText(props.inputProps.label);

      await fireEvent.update(currencyInput, '6.00');
      expect(currencyInput.value).toEqual('6.00');
    });
  });
});
