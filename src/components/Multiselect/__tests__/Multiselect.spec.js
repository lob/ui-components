import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { translate } from '@/mixins';
import en from '@/mixins/en';
import Multiselect from '../Multiselect.vue';

const mixins = [translate];

const initialProps = {
  id: 'country',
  label: 'Destination Country',
  placeholder: 'Country',
  options: [
    { label: 'Angola', value: 'AO' },
    { label: 'Egypt', value: 'EG' },
    { label: 'Lao PDR', value: 'LA' },
    { label: 'United States', value: 'US' },
    { label: 'Uruguay', value: 'UR' }
  ],
  modelValue: []
};

const renderComponent = (options) => render(Multiselect, { ...options, global: { mixins } });

describe('Multiselect', () => {

  it('renders correctly', async () => {
    const props = initialProps;
    const { findByLabelText } = renderComponent({ props });

    const input = await findByLabelText(props.label);
    expect(input).toBeInTheDocument();
  });

  describe('placeholder', () => {

    it('renders initially', async () => {
      const props = initialProps;
      const { findByPlaceholderText } = renderComponent({ props });

      const placeholder = await findByPlaceholderText(props.placeholder);
      expect(placeholder).toBeInTheDocument();
    });

  });

  describe('input click', () => {

    let props;
    let component;

    beforeEach(async () => {
      props = initialProps;
      component = renderComponent({ props });
      const { findByLabelText } = component;

      const input = await findByLabelText(props.label);
      userEvent.click(input);
    });

    it('should focus on input', async () => {
      const { findByLabelText } = component;

      const input = await findByLabelText(props.label);
      expect(input).toHaveFocus();
    });

    it('input container should have focus ring', async () => {
      const { findByTestId } = component;

      const inputContainer = await findByTestId('input-container');
      expect(inputContainer).toHaveClass('focus-within:ring-2 focus-within:ring-primary-100');
    });

    it('renders a dropdown of options', async () => {
      const { findAllByRole } = component;

      const options = await findAllByRole('option');
      expect(options).toHaveLength(props.options.length);
    });

  });

  describe('typing in the input', () => {

    it('renders a filtered dropdown of options based on what was typed', async () => {
      const props = initialProps;
      const { findByLabelText, findAllByRole } = renderComponent({ props });

      const input = await findByLabelText(props.label);
      userEvent.click(input);

      await userEvent.type(input, 'uni');
      expect(input).toHaveValue('uni');

      const options = await findAllByRole('option');
      expect(options).toHaveLength(1);
    });

    describe('should match on', () => {

      it('label only if \'label\' is passed in (or by default)', async () => {
        const props = { ...initialProps, matchOn: 'label' };
        const { findByLabelText, findAllByRole } = renderComponent({ props });

        const input = await findByLabelText(props.label);
        userEvent.click(input);

        await userEvent.type(input, 'ao');

        const options = await findAllByRole('option');
        expect(options).toHaveLength(1);
        expect(options[0]).toHaveTextContent('Lao PDR');
      });

      it('value only if \'value\' is passed in', async () => {
        const props = { ...initialProps, matchOn: 'value' };
        const { findByLabelText, findAllByRole } = renderComponent({ props });

        const input = await findByLabelText(props.label);
        userEvent.click(input);

        await userEvent.type(input, 'ao');

        const options = await findAllByRole('option');
        expect(options).toHaveLength(1);
        expect(options[0]).toHaveTextContent('Angola');
      });

      it('label and value if \'both\' is passed in', async () => {
        const props = { ...initialProps, matchOn: 'both' };
        const { findByLabelText, findAllByRole } = renderComponent({ props });

        const input = await findByLabelText(props.label);
        userEvent.click(input);

        await userEvent.type(input, 'ao');

        const options = await findAllByRole('option');
        expect(options).toHaveLength(2);
        expect(options[0]).toHaveTextContent('Angola');
        expect(options[1]).toHaveTextContent('Lao PDR');
      });

    });

  });

  describe('selecting an option', () => {

    let props;
    let component;

    beforeEach(async () => {
      props = initialProps;
      component = renderComponent({ props });
      const { findByLabelText, findAllByRole } = component;

      const input = await findByLabelText(props.label);
      userEvent.click(input);
      await userEvent.type(input, 'uni');

      const options = await findAllByRole('option');
      userEvent.click(options[0]);
    });

    it('closes the dropdown', () => {
      const { queryAllByRole } = component;

      const options = queryAllByRole('option');
      expect(options).toHaveLength(0);
    });

    it('emits an update:modelValue event with an array of selected options', () => {
      const { emitted } = component;

      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('update:modelValue');
      expect(emittedEvent['update:modelValue'][0][0]).toHaveLength(1);
      expect(emittedEvent['update:modelValue'][0][0][0].label).toEqual('United States');
    });

    it('clears the text in the input', async () => {
      const { findByLabelText } = component;

      const input = await findByLabelText(props.label);
      expect(input).toHaveValue('');
    });

    it('removes the option from the dropdown of options', async () => {
      const { queryByRole, findByLabelText } = component;

      const input = await findByLabelText(props.label);
      userEvent.click(input);

      const option = await queryByRole('option', { name: 'United States' });
      expect(option).not.toBeInTheDocument();
    });

  });

  describe('when options are selected', () => {

    let props;
    let component;

    beforeEach(async () => {
      props = { ...initialProps, modelValue: [{ label: 'United States', value: 'US' }] };
      component = renderComponent({ props });
    });

    it('renders a badge with the option\'s text', async () => {
      const { findByText } = component;

      const usText = await findByText('United States');
      expect(usText).toBeInTheDocument();
    });

    it('renders an \'x\' button in the badge', async () => {
      const { findByText } = component;

      const button = await findByText(en.multiselect.deselectLabel);
      expect(button).toBeInTheDocument();
    });

    it('placeholder no longer shows', () => {
      const { queryByPlaceholderText } = component;

      const placeholder = queryByPlaceholderText(props.placeholder);
      expect(placeholder).not.toBeInTheDocument();
    });

  });

  describe('deselecting an option', () => {

    it('removes the badge from the input', async () => {
      const props = { ...initialProps, modelValue: [{ label: 'United States', value: 'US' }] };
      const { findByText, findAllByText } = renderComponent({ props });

      const beforeText = await findAllByText('United States');
      expect(beforeText).toHaveLength(1); // in the badge

      const button = await findByText(en.multiselect.deselectLabel);
      userEvent.click(button);

      const afterText = await findAllByText('United States');
      expect(afterText).toHaveLength(1); // in the options list
    });

    it('adds the option back to the dropdown of options', async () => {
      const props = { ...initialProps, modelValue: [{ label: 'United States', value: 'US' }] };
      const { findByText, findByLabelText, findAllByRole } = renderComponent({ props });

      const button = await findByText(en.multiselect.deselectLabel);
      await userEvent.click(button);

      const input = await findByLabelText(props.label);
      userEvent.click(input);

      const options = await findAllByRole('option');
      expect(options).toHaveLength(props.options.length);
      expect(options[3]).toHaveTextContent(props.options[3].label);
    });

  });

});
