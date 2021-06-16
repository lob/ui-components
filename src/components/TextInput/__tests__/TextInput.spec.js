import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import TextInput from '../TextInput.vue';

const initialProps = {
  id: 'test',
  name: 'test',
  label: 'label',
  'v-model': ''
};

describe('Text input', () => {

  it('renders correctly', () => {
    const props = initialProps;
    const { getByLabelText } = render(TextInput, {
      props
    });
    const textInput = getByLabelText(props.label);

    expect(textInput).toBeInTheDocument();
  });

  it('requires the text when required prop is true', () => {
    const props = {
      ...initialProps,
      required: true
    };

    const { getByLabelText } = render(TextInput, {
      props
    });
    const textInput = getByLabelText(props.label);

    expect(textInput).toBeRequired();
  });

  it('disables the text input when disabled prop is true', () => {
    const props = {
      ...initialProps,
      disabled: true
    };

    const { getByLabelText } = render(TextInput, {
      props
    });
    const textInput = getByLabelText(props.label);

    expect(textInput).toBeDisabled();
  });

  it('adds an error class to the textInput when error prop is true', () => {
    const props = {
      ...initialProps,
      error: true
    };

    const { getByLabelText } = render(TextInput, {
      props
    });
    const textInput = getByLabelText(props.label);

    expect(textInput).toHaveClass('border-error');
  });

  it('updates the v-model on text input', async () => {
    const props = initialProps;
    const { getByLabelText } = render(TextInput, {
      props
    });
    const textInput = getByLabelText(props.label);

    await fireEvent.update(textInput, 'hello!');
    expect(textInput.value).toEqual('hello!');
  });

  it('fires the input event on text input', async () => {
    const props = initialProps;
    const { getByLabelText, emitted } = render(TextInput, {
      props
    });
    const textInput = getByLabelText(props.label);

    const updatedValue = 'hello!';
    await fireEvent.update(textInput, updatedValue);

    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('input');
    expect(emittedEvent.input[0]).toEqual([updatedValue]);
  });

  it('renders when withCopyButton prop is true', async () => {
    const props = {
      ...initialProps,
      withCopyButton: true
    };
    const { getByRole } = render(TextInput, {
      props
    });

    const button = getByRole('button', { name: /copy/i });
    expect(button).toBeInTheDocument();
  });

  it('renders the slot content', async () => {
    const slotContent = 'I\'m an icon';
    const slots = { iconLeft: [`${slotContent}`] };

    const props = initialProps;
    const { getByText } = render(TextInput, { props, slots });

    const slot = getByText(new RegExp(slotContent));
    expect(slot).toBeInTheDocument();
  });

});
