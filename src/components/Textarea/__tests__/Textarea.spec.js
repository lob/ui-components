import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import Textarea from '../Textarea.vue';

const initialProps = {
  name: 'test',
  label: 'label',
  'v-model': ''
};

const renderComponent = (options, configure = null) => render(Textarea, { ...options }, configure);

describe('Textarea', () => {

  it('renders correctly', () => {
    const props = initialProps;
    const { getByLabelText } = renderComponent({ props });

    const textarea = getByLabelText(new RegExp(props.label));
    expect(textarea).toBeInTheDocument();
  });

  it('requires the textarea when required prop is true', () => {
    const props = {
      ...initialProps,
      required: true
    };

    const { getByLabelText } = renderComponent({ props });
    const textarea = getByLabelText(new RegExp(props.label));

    expect(textarea).toBeRequired();
  });

  it('disables the textarea when disabled prop is true', () => {
    const props = {
      ...initialProps,
      disabled: true
    };

    const { getByLabelText } = renderComponent({ props });
    const textarea = getByLabelText(props.label);

    expect(textarea).toBeDisabled();
  });

  it('adds an error class to the textarea when error prop is true', () => {
    const props = {
      ...initialProps,
      error: true
    };

    const { getByLabelText } = renderComponent({ props });
    const textarea = getByLabelText(props.label);

    expect(textarea).toHaveClass('border-error');
  });

  it('updates the v-model on textarea input', async () => {
    const props = initialProps;
    const { getByLabelText } = renderComponent({ props });
    const textarea = getByLabelText(props.label);

    await fireEvent.update(textarea, 'hello!');
    expect(textarea.value).toEqual('hello!');
  });

  it('fires the input event on textarea input', async () => {
    const props = initialProps;
    const { getByLabelText, emitted } = renderComponent({ props });
    const textarea = getByLabelText(props.label);

    const updatedValue = 'hello!';
    await fireEvent.update(textarea, updatedValue);

    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('input');
    expect(emittedEvent.input[0]).toEqual([updatedValue]);
  });

  it('fires the change event on textarea input', async () => {
    const props = initialProps;
    const { getByLabelText, emitted } = renderComponent({ props });
    const textarea = getByLabelText(props.label);

    const updatedValue = 'hello!';
    await fireEvent.update(textarea, updatedValue);

    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('change');
  });

});
