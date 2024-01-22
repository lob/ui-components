import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import SwitchItem from '../SwitchItem.vue';

const initialProps = {
  modelValue: '',
  name: 'test name',
  label: 'Test',
  value: 'test',
  disabled: false
};

describe('Switch Item', () => {
  it('does not check the input when the value does not match the modelValue', () => {
    const props = initialProps;
    const { getByLabelText } = render(SwitchItem, {
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
    const { getByLabelText } = render(SwitchItem, {
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

    const { getByLabelText } = render(SwitchItem, {
      props
    });

    const radio = getByLabelText(props.label);
    expect(radio).toBeDisabled();
  });

  it('fires the input and click events when the input is clicked', async () => {
    const props = initialProps;
    const { getByLabelText, emitted } = render(SwitchItem, {
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
