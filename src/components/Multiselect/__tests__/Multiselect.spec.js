import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Multiselect from '../Multiselect.vue';

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
  ]
};

const renderComponent = (options, configure = null) => render(Multiselect, { ...options }, configure);

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

  // describe('selecting an option', () => {

  //   it('renders a badge with the option label', () => {

  //   });

  //   it('renders an \'x\' button in the badge', () => {

  //   });

  //   it('if there was text in the search box, clears the text', () => {

  //   });

  //   it('removes the option from the dropdown of options', () => {

  //   });

  //   describe('placeholder', () => {

  //     it('no longer renders', () => {

  //     });

  //   });

  // });

  // describe('deselecting an option', () => {

  //   it('removes the badge from the input', () => {

  //   });

  //   it('adds the option back to the dropdown of options', () => {

  //   });

  // });

});
