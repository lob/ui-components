import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/vue';
import NumberInput from '../NumberInput.vue';
import { ExtractPropTypes } from 'vue';

describe('NumberInput', () => {
  const DEFAULT_PROPS: ExtractPropTypes<typeof NumberInput> = {
    label: 'Test Input Number',
    id: 'test-input-number',
    name: 'test',
    'data-testid': 'uic-input-number',
    helperText: 'Test helper text'
  };

  it('renders', () => {
    const { getByTestId } = render(NumberInput, { props: DEFAULT_PROPS });
    expect(getByTestId('uic-input-number-container')).toBeVisible();
    const label = getByTestId('uic-input-number-label');
    expect(label).toBeVisible();
    expect(label.textContent).toContain(DEFAULT_PROPS.label);
    expect(getByTestId('uic-input-number')).toBeVisible();
    const helperText = getByTestId('uic-input-number-helper');
    expect(helperText).toBeVisible();
    expect(helperText.textContent).toContain(DEFAULT_PROPS.helperText);
  });

  it('updates', async () => {
    const { emitted, getByTestId } = render(NumberInput, {
      props: { ...DEFAULT_PROPS }
    });
    const numberInput = getByTestId('uic-input-number');

    expect(numberInput).not.toHaveValue('123');
    expect(numberInput).not.toHaveAttribute('aria-valuenow', '123');

    await fireEvent.update(numberInput, '123');
    await fireEvent.blur(numberInput);

    expect(numberInput).toHaveValue('123');
    expect(numberInput).toHaveAttribute('aria-valuenow', '123');
    expect(emitted()).toHaveProperty('update:modelValue', [[123]]);
  });

  it('emits focus', async () => {
    const { getByTestId, emitted } = render(NumberInput, {
      props: DEFAULT_PROPS
    });
    const numberInput = getByTestId('uic-input-number');

    await fireEvent.focus(numberInput);
    expect(emitted()).toHaveProperty('focus');
  });

  it('emits blur', async () => {
    const { getByTestId, emitted } = render(NumberInput, {
      props: DEFAULT_PROPS
    });
    const numberInput = getByTestId('uic-input-number');

    await fireEvent.blur(numberInput);
    expect(emitted()).toHaveProperty('blur');
  });
});
