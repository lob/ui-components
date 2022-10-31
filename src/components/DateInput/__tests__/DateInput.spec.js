import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { translate } from '@/mixins';
import DateInput from '../DateInput.vue';

const mixins = [translate];

const initialProps = {
  id: 'start',
  modelValue: new Date(2022, 5, 14),
  open: false,
  label: 'Start date'
};

const renderComponent = (options = {}) => render(DateInput, { global: { mixins }, ...options });

describe('DateInput', () => {

  it('renders an input', () => {
    const props = initialProps;
    const { getByLabelText } = renderComponent({ props });

    const textInput = getByLabelText(props.label);
    expect(textInput).toBeInTheDocument();
  });

  describe('when closed', () => {

    it('does not render a datepicker', () => {
      const props = initialProps;
      const { queryByRole } = renderComponent({ props });

      const dialog = queryByRole('dialog');
      expect(dialog).not.toBeInTheDocument();
    });

  });

  describe('when open', () => {

    it('renders a datepicker', () => {
      const props = { ...initialProps, open: true };
      const { queryByRole } = renderComponent({ props });

      const dialog = queryByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute('aria-hidden', 'false');

    });

  });

  it('emits an update:open event with value true when clicking the input', async () => {
    const props = initialProps;
    const { getByLabelText, emitted } = renderComponent({ props });

    const textInput = getByLabelText(props.label);

    await userEvent.click(textInput);
    const emittedEvent = emitted();

    expect(emittedEvent).toHaveProperty('update:open');
    const length = emittedEvent['update:open'].length;
    expect(emittedEvent['update:open'][length - 1][0]).toEqual(true); // last event should be an open event
  });

  describe('selecting a date', () => {

    let props;
    let component;
    let dateToSelect;

    beforeEach(() => {
      props = { ...initialProps, open: true };
      component = renderComponent({ props });
      const { queryByText } = component;
      dateToSelect = queryByText(23).closest('button');
    });

    it('emits an update:open event with value false', async () => {
      const { emitted } = component;

      await userEvent.click(dateToSelect);
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('update:open');

      expect(emittedEvent['update:open'][0][0]).toEqual(false);

    });

    it('emits an update:modelValue event', async () => {
      const { emitted } = component;

      await userEvent.click(dateToSelect);
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('update:modelValue');

      expect(emittedEvent['update:modelValue'][0][0]).toEqual(new Date(2022, 5, 23));
    });

  });

  describe('when it has an error and errorMessage', () => {

    it('shows the error state/red border and the error message', () => {
      const props = { ...initialProps, error: true, errorMessage: 'Date no longer valid' };
      const { getByText, getByTestId } = renderComponent({ props });

      const textInput = getByTestId('input-container');
      expect(textInput).toHaveClass('!border-coral-700');
      const errorMessage = getByText('Date no longer valid');
      expect(errorMessage).toBeVisible();
    });

  });

});
