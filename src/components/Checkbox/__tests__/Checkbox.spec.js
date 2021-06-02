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

  it('renders correctly', () => {
    const props = {
      ...initialProps,
      disabled: true
    };

    const { queryByText, queryByLabelText } = render(Checkbox, {
      props
    });

    const label = queryByText(props.label);
    expect(label).toBeInTheDocument();
    const checkbox = queryByLabelText(props.label);
    expect(checkbox).toBeInTheDocument();
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

  it('requires the input when required prop is true', () => {
    const props = {
      ...initialProps,
      required: true
    };

    const { getByLabelText } = render(Checkbox, {
      props
    });

    const checkbox = getByLabelText(`${props.label}*`);
    expect(checkbox).toBeRequired();
  });

  it('adds an error class when error prop is true', () => {
    const props = {
      ...initialProps,
      error: true
    };

    const { getByTestId } = render(Checkbox, {
      props
    });

    const checkmark = getByTestId('checkmark');
    expect(checkmark).toHaveClass('border-error');
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

  describe('when the v-model is a simple boolean', () => {

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

  });

  describe('when the v-model is an array', () => {

    it('does not check the input when the v-model does not contain the value', () => {
      const props = {
        ...initialProps,
        value: 'test',
        modelValue: ['not test', 'also not test']
      };

      const { getByLabelText } = render(Checkbox, {
        props
      });

      const checkbox = getByLabelText(props.label);
      expect(checkbox).not.toBeChecked();
    });

    it('checks the input when the v-model does contain the value', () => {
      const props = {
        ...initialProps,
        value: 'test',
        modelValue: ['not test', 'test']
      };
      const { getByLabelText } = render(Checkbox, {
        props
      });

      const checkbox = getByLabelText(props.label);
      expect(checkbox).toBeChecked();
    });

  });

});
