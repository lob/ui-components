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

  it('updates', () => {
    const { getByTestId } = render(NumberInput, {
      props: { ...DEFAULT_PROPS, modelValue: 50 }
    });
    const numberInput = getByTestId('uic-input-number');

    expect(numberInput).toHaveValue('50');
    fireEvent.update(numberInput, '123');
    expect(numberInput).toHaveValue('123');
  });

  it('emits focus', () => {
    const { getByTestId, emitted } = render(NumberInput, {
      props: DEFAULT_PROPS
    });
    const numberInput = getByTestId('uic-input-number');

    fireEvent.focus(numberInput);
    expect(emitted()).toHaveProperty('focus');
  });

  it('emits blur', () => {
    const { getByTestId, emitted } = render(NumberInput, {
      props: DEFAULT_PROPS
    });
    const numberInput = getByTestId('uic-input-number');

    fireEvent.blur(numberInput);
    expect(emitted()).toHaveProperty('blur');
  });
});
