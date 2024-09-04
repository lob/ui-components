import '@testing-library/jest-dom';
import { render, RenderOptions } from '@testing-library/vue';
import Textarea from '../Textarea.vue';
import userEvent from '@testing-library/user-event';

const initialProps = {
  id: 'test',
  name: 'test',
  label: 'label',
  modelValue: ''
};

const renderComponent = (options: RenderOptions) =>
  render(Textarea, { ...options });

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

  it('updates the v-model on textarea input', async () => {
    const props = initialProps;
    const { emitted, getByLabelText } = renderComponent({ props });
    const textarea = getByLabelText(props.label) as HTMLTextAreaElement;

    await userEvent.type(textarea, 'hello!');
    expect(emitted()).toHaveProperty('update:modelValue', [
      ['h'],
      ['he'],
      ['hel'],
      ['hell'],
      ['hello'],
      ['hello!']
    ]);
  });

  it('fires the input event on textarea input', async () => {
    const props = initialProps;
    const { getByLabelText, emitted } = renderComponent({ props });
    const textarea = getByLabelText(props.label);

    const updatedValue = 'hello!';
    await userEvent.type(textarea, updatedValue);
    expect(emitted()).toHaveProperty('input');
  });
});
