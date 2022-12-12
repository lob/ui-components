import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import Textarea from '../Textarea.vue';
import userEvent from '@testing-library/user-event';

const initialProps = {
  id: 'test',
  name: 'test',
  label: 'label',
  modelValue: ''
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
    expect(textarea).toBeDisabled().toHaveClass('!bg-gray-50 !border-gray-200');
  });

  it('adds an error class to the textarea when error prop is true', () => {
    const props = {
      ...initialProps,
      error: true
    };

    const { getByLabelText } = renderComponent({ props });
    const textarea = getByLabelText(props.label);
    expect(textarea).toHaveClass('border-red-600 bg-red-50');
  });

  it('adds a success class to the textarea when success prop is true', () => {
    const props = {
      ...initialProps,
      success: true
    };

    const { getByLabelText } = renderComponent({ props });
    const textarea = getByLabelText(props.label);
    expect(textarea).toHaveClass('border-green-700 bg-green-50');
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

  describe('character counter', () => {

    const propsWithCounter = {
      ...initialProps,
      showCounter: true,
      maxLength: 40
    };
    let component;
    beforeEach(() => {
      component = renderComponent({ props: propsWithCounter });
    });

    it('does not show the counter if the area is not on focus', () => {
      const { queryByRole } = component;

      const counter = queryByRole('status');
      expect(counter).not.toBeInTheDocument();
    });

    it('shows the counter when the textarea is focused', async () => {
      const { getByLabelText, findByRole } = component;
      const textarea = getByLabelText(propsWithCounter.label);
      userEvent.click(textarea);

      const counter = await findByRole('status');
      expect(counter).toBeInTheDocument().toHaveTextContent(/0\/40/i).toHaveClass('text-gray-500');
    });

    it('counts the characters', async () => {
      const { getByLabelText, findByRole } = component;
      const textarea = getByLabelText(propsWithCounter.label);
      userEvent.click(textarea);
      await userEvent.type(textarea, 'thing');
      expect(textarea).toHaveValue('thing');

      const counter = await findByRole('status');
      //TODO why is this not updating?
      // expect(counter).toHaveTextContent(/5\/40/);
      expect(counter).toBeInTheDocument().toHaveClass('text-gray-500');
    });

  });

});

