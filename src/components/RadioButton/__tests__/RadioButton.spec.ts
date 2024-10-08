import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import RadioButton from '../RadioButton.vue';

const initialProps = {
  id: 'test',
  modelValue: '',
  name: 'test name',
  label: 'Test',
  value: 'test',
  error: false,
  disabled: false
};

describe('RadioButton', () => {
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

  it('fires the input and click events when the input is clicked', async () => {
    const props = initialProps;
    const { getByLabelText, emitted } = render(RadioButton, {
      props
    });
    const radio = getByLabelText(props.label);

    await userEvent.click(radio);
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('click');
    expect(emittedEvent).toHaveProperty('input');
    expect(emittedEvent.input[0]).toEqual([props.value]);
  });

  it('can accept content in the `helper` slot', async () => {
    const props = initialProps;
    const { getByText } = render(RadioButton, {
      props,
      slots: {
        helper: 'Helper text'
      }
    });
    const helperContent = getByText('Helper text');
    expect(helperContent).toBeInTheDocument();
  });
});
