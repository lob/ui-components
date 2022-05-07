import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import MegaButton from '../MegaButton.vue';

const initialProps = {
  id: 'megabutton',
  modelValue: '',
  name: 'Chonky Boi',
  label: 'Megabutton',
  value: 'bigOlButton',
  disabled: false
};

describe('Megabutton', () => {

  it('disables the input when disabled prop is true', () => {
    const props = {
      ...initialProps,
      disabled: true
    };

    const { getByLabelText } = render(MegaButton, {
      props
    });

    const mega = getByLabelText(props.label);
    expect(mega).toBeDisabled();
  });

  it('checks the input when the value matches the modelValue', () => {
    const props = {
      ...initialProps,
      modelValue: initialProps.value
    };
    const { getByLabelText } = render(MegaButton, {
      props
    });

    const mega = getByLabelText(props.label);
    expect(mega).toBeChecked();
  });

  it('fires the input and click events when the input is clicked', async () => {
    const props = initialProps;
    const { getByLabelText, emitted } = render(MegaButton, {
      props
    });
    const mega = getByLabelText(props.label);

    await fireEvent.click(mega);
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('click');
    expect(emittedEvent).toHaveProperty('input');
    expect(emittedEvent.input[0]).toEqual([props.value]);
  });

  it('displays the strikethru line when disabled without banner', () => {
    const props = {
      ...initialProps,
      disabled: true
    };

    const { getByText } = render(MegaButton, {
      props
    });

    const label = getByText(props.label).closest('label');
    expect(label).toHaveClass('strikethru-line');
    expect(label).toHaveClass('cursor-not-allowed');
  });

  it('does not display the strikethru line when disabled with banner', () => {
    const props = {
      ...initialProps,
      disabled: true,
      disabledBanner: 'banner!'
    };

    const { getByText } = render(MegaButton, {
      props
    });

    const label = getByText(props.label).closest('label');
    expect(label).not.toHaveClass('strikethru-line');
  });

  it('shows the focus ring when focused', async () => {
    const props = initialProps;

    const { getByText } = render(MegaButton, {
      props
    });

    const label = getByText(props.label).closest('label');
    await userEvent.click(label);
    expect(label).toHaveClass('border');
  });

});
