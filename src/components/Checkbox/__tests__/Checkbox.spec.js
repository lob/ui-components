import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import Checkbox from '../Checkbox.vue';

const initialProps = {
  modelValue: false,
  name: 'Test name',
  label: 'Test',
  error: false,
  disabled: false
};

describe('Checkbox', () => {

  it('does not check the input when the v-model is false', () => {
    const props = initialProps;
    const { getByLabelText } = render(Checkbox, {
      props
    });

    const checkbox = getByLabelText(props.label);
    expect(checkbox).not.toBeChecked();
  });

  it('checks the input when the v-model is true', () => {
    const props = {
      ...initialProps,
      modelValue: true
    };
    const { getByLabelText } = render(Checkbox, {
      props
    });

    const checkbox = getByLabelText(props.label);
    expect(checkbox).toBeChecked();
  });

  it('disables the input when disabled prop is true', () => {
    const props = {
      ...initialProps,
      disabled: true
    };

    const { getByLabelText } = render(Checkbox, {
      props
    });

    const checkbox = getByLabelText(props.label);
    expect(checkbox).toBeDisabled();
  });

  it('fires the input event when the input is clicked', async () => {
    const props = initialProps;
    const { getByLabelText, emitted } = render(Checkbox, {
      props
    });

    const checkbox = getByLabelText(props.label);

    await fireEvent.click(checkbox); // checks de checkbox
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('input');
    expect(emittedEvent.input[0]).toEqual([true]);
  });

});
