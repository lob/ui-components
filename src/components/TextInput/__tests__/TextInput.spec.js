import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import TextInput from '../TextInput.vue';
import userEvent from '@testing-library/user-event';

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
    const textInput = getByLabelText(new RegExp(props.label));

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

    const { getByTestId } = render(TextInput, {
      props
    });
    const textInput = getByTestId('input-container');

    expect(textInput).toHaveClass('!border-coral-700');
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
    expect(emittedEvent).toHaveProperty('change');
    expect(emittedEvent.input[0]).toEqual([updatedValue]);
  });

  it('selects on click when selectOnClick prop is true', async () => {
    const props = {
      ...initialProps,
      selectOnClick: true
    };
    const { getByLabelText } = render(TextInput, {
      props
    });

    const textInput = getByLabelText(props.label);
    const updatedValue = 'hello!';
    await fireEvent.update(textInput, updatedValue);

    await userEvent.click(textInput);
    expect(textInput.selectionStart).toEqual(0);
    expect(textInput.selectionEnd).toEqual(updatedValue.length);
  });

  it('renders the slot content', async () => {
    const slotContent = 'I\'m an icon';
    const slots = { iconLeft: [`${slotContent}`] };

    const props = initialProps;
    const { getByText } = render(TextInput, { props, slots });

    const slot = getByText(new RegExp(slotContent));
    expect(slot).toBeInTheDocument();
  });

  it('renders the helper text correctly', () => {
    const props = {
      ...initialProps,
      helperText: 'Helper text'
    };
    const { getByText } = render(TextInput, {
      props
    });

    const helperText = getByText('Helper text');
    expect(helperText).toBeInTheDocument();
  });

  it('clears the input when the clear button is clicked', async () => {
    const props = {
      ...initialProps,
      clearButton: true
    };
    const { getByRole, getByLabelText } = render(TextInput, { props });

    const textInput = getByLabelText(props.label);
    const updatedValue = 'hello!';
    await fireEvent.update(textInput, updatedValue);

    const clearButton = getByRole('button');
    await userEvent.click(clearButton);

    expect(textInput.value).toBe('');
  });

  describe('with tooltip', () => {

    const propsTooltip = {
      ...initialProps,
      label: 'company',
      tooltipContent: 'enter your company'
    };

    const propsTooltipLeading = {
      ...propsTooltip,
      tooltipPosition: 'leading'
    };

    it('the input can be selected by getByLabelText when the tooltip is trailing', async () => {
      const { getByLabelText, getByTestId } = render(TextInput, { props: propsTooltip });
      const companyInput = getByLabelText(propsTooltip.label);
      expect(companyInput).toBeInTheDocument();
      await userEvent.type(companyInput, 'lob');
      expect(companyInput).toHaveValue('lob');
      const tooltipTrailing = getByTestId('tooltip-trailing');
      expect(tooltipTrailing).toBeInTheDocument();
    });

    it('the input can be selected by getByLabelText when the tooltip is leading', () => {
      const { getByLabelText, getByTestId } = render(TextInput, { props: propsTooltipLeading });
      const companyInput = getByLabelText(propsTooltip.label);
      expect(companyInput).toBeInTheDocument();
      const tooltipLeading = getByTestId('tooltip-leading');
      expect(tooltipLeading).toBeInTheDocument();
    });

  });

  describe('with Copy Button', () => {

    let component;
    beforeEach(async () => {
      const props = {
        ...initialProps,
        withCopyButton: true
      };
      component = render(TextInput, {
        props
      });
    });

    it('renders the Copy button that emits \'copy\' event onClick', async () => {
      const { getByRole, emitted } = component;

      const button = getByRole('button', { name: /copy/i });
      expect(button).toBeInTheDocument();

      document.execCommand = vi.fn();
      await fireEvent.click(button);
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('copy');
    });

    it('shows the \'Copied\' tooltip when copied', async () => {
      const { getByRole, queryByTestId, findByTestId } = component;

      const notVisibleTip = queryByTestId('copiedTip');
      expect(notVisibleTip).not.toBeInTheDocument();

      const button = getByRole('button', { name: /copy/i });
      await userEvent.click(button);

      const visibleCopiedTip = await findByTestId('copiedTip');
      expect(visibleCopiedTip).toBeInTheDocument();
    });

  });

});
