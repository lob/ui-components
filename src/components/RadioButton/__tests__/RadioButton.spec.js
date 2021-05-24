import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import RadioButton from '../RadioButton.vue';

const initialProps = {
  modelValue: '',
  name: 'test name',
  label: 'Test',
  value: 'test',
  error: false,
  disabled: false
};

describe('Radio Button', () => {

  it('does not check the input when the value does not match the modelValue', () => {
    const props = initialProps;
    const { getByLabelText } = render(RadioButton, {
      props
    });

    const radio = getByLabelText(props.label);
    expect(radio).not.toBeChecked();
  });

  it('checks the input when the value matches the modelValue', () => {
    const props = {
      ...initialProps,
      modelValue: initialProps.value
    };
    const { getByLabelText } = render(RadioButton, {
      props
    });

    const radio = getByLabelText(props.label);
    expect(radio).toBeChecked();
  });

  it('disables the input when disabled prop is true', () => {
    const props = {
      ...initialProps,
      disabled: true
    };

    const { getByLabelText } = render(RadioButton, {
      props
    });

    const radio = getByLabelText(props.label);
    expect(radio).toBeDisabled();
  });

  it('adds an error class to the input when error prop is true', () => {
    const props = {
      ...initialProps,
      error: true
    };

    const { getByLabelText } = render(RadioButton, {
      props
    });

    const radio = getByLabelText(props.label);
    expect(radio).toHaveClass('radio__input--error');
  });

  it('fires the input and click events when the input is clicked', async () => {
    const props = initialProps;
    const { getByLabelText, emitted } = render(RadioButton, {
      props
    });
    const radio = getByLabelText(props.label);

    await fireEvent.click(radio);
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('click');
    expect(emittedEvent).toHaveProperty('input');
    expect(emittedEvent.input[0]).toEqual([props.value]);
  });
});

