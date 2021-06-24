import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import { translate } from '@/mixins';
import userEvent from '@testing-library/user-event';
import Datepicker from '../Datepicker.vue';

const mixins = [translate];

const modelValue = new Date(2021, 5, 14);
const open = false;
const initialProps = {
  id: 'test',
  localization: {
    keyboardInstruction: 'You can use arrow keys to navigate dates',
    calendarHeading: 'Calendar',
    closeLabel: 'Close',
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec'
    ],
    monthSelectLabel: 'Choose month',
    yearSelectLabel: 'Choose year',
    prevMonthLabel: 'Previous',
    nextMonthLabel: 'Next'
  },
  modelValue,
  open
};

const renderComponent = (options) => render(Datepicker, { ...options, global: { mixins } });

describe('Datepicker', () => {

  describe('when closed', () => {

    it('renders correctly', () => {
      const props = initialProps;
      const { queryByRole } = renderComponent({ props });

      const dialog = queryByRole('dialog');
      expect(dialog).not.toBeInTheDocument();
    });

  });

  describe('when open', () => {

    let props;

    beforeEach(() => {
      props = { ...initialProps, open: true };
    });

    it('renders a dialog', () => {
      const { queryByRole } = renderComponent({ props });

      const dialog = queryByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute('aria-hidden', 'false');
    });

    it('renders a close button', () => {
      const { queryByText } = renderComponent({ props });

      const button = queryByText(props.localization.closeLabel);
      expect(button).toBeInTheDocument();
    });

    it('renders a previous month button', () => {
      const { queryByText } = renderComponent({ props });

      const button = queryByText(props.localization.prevMonthLabel);
      expect(button).toBeInTheDocument();
    });

    it('renders a next month button', () => {
      const { queryByText } = renderComponent({ props });

      const button = queryByText(props.localization.nextMonthLabel);
      expect(button).toBeInTheDocument();
    });

    it('renders text for the current month and year', () => {
      const { queryByText } = renderComponent({ props });

      const monthText = queryByText('June 2021');
      expect(monthText).toBeInTheDocument();
    });

    it('emits an update:open event with value false when typing Esc', async () => {
      const { queryByRole, emitted } = renderComponent({ props });

      const dialog = queryByRole('dialog');

      await fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' });
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('update:open');
      expect(emittedEvent['update:open'][0][0]).toEqual(false);
    });

    it('emits an update:open event with value false when clicking close button', async () => {
      const { queryByText, emitted } = renderComponent({ props });

      const close = queryByText(props.localization.closeLabel).closest('button');
      // enter to close datepicker
      await fireEvent.click(close);
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('update:open');
      expect(emittedEvent['update:open'][0][0]).toEqual(false);
    });

    it('focuses on the close button when typing Tab and the calendar was focused', async () => {
      const { queryByText } = renderComponent({ props });

      // tab to close button
      userEvent.tab();
      const close = queryByText(props.localization.closeLabel).closest('button');
      expect(close).toHaveFocus();
    });

    it('focuses on prev button when typing Tab from close button', async () => {
      const { queryByText } = renderComponent({ props });

      // tab to close button
      userEvent.tab();
      // tab to prev button
      userEvent.tab();

      const prev = queryByText(props.localization.prevMonthLabel).closest('button');
      expect(prev).toHaveFocus();
    });

    it('focuses on next button when typing Tab from previous button', async () => {
      const { queryByText } = renderComponent({ props });

      // tab to close button
      userEvent.tab();
      // tab to prev button
      userEvent.tab();
      // tab to next button
      userEvent.tab();

      const next = queryByText(props.localization.nextMonthLabel).closest('button');
      expect(next).toHaveFocus();
    });

    it('focuses back inside calendar on focused day when typing Tab from next button', async () => {
      const { queryByText } = renderComponent({ props });

      // tab to close button
      userEvent.tab();
      // tab to prev button
      userEvent.tab();
      // tab to next button
      userEvent.tab();
      // tab back to focused date
      userEvent.tab();

      const focusedDate = queryByText(modelValue.getDate()).closest('button');
      expect(focusedDate).toHaveFocus();
    });

    it('goes to the previous month when clicking previous month button', async () => {
      const { queryByText } = renderComponent({ props });

      const button = queryByText(props.localization.prevMonthLabel);
      await fireEvent.click(button);

      const monthText = queryByText('May 2021');
      expect(monthText).toBeInTheDocument();
    });

    it('goes to the next month when clicking next month button', async () => {
      const { queryByText } = renderComponent({ props });

      const button = queryByText(props.localization.nextMonthLabel);
      await fireEvent.click(button);

      const monthText = queryByText('July 2021');
      expect(monthText).toBeInTheDocument();
    });

    it('typing ArrowRight, it focuses on the next non-disabled date', async () => {
      const { queryByText, emitted } = renderComponent({ props });
      let focusedDate = queryByText(modelValue.getDate()).closest('button');

      await fireEvent.keyDown(focusedDate, { key: 'ArrowRight', code: 'ArrowRight' });
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('keydown');

      focusedDate = queryByText(modelValue.getDate() + 1).closest('button');
      expect(focusedDate).toHaveFocus();
    });

    it('typing ArrowLeft, it focuses on the next non-disabled date', async () => {
      const { queryByText, emitted } = renderComponent({ props });
      let focusedDate = queryByText(modelValue.getDate()).closest('button');

      await fireEvent.keyDown(focusedDate, { key: 'ArrowLeft', code: 'ArrowLeft' });
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('keydown');

      focusedDate = queryByText(modelValue.getDate() - 1).closest('button');
      expect(focusedDate).toHaveFocus();
    });

    it('typing ArrowDown, it focuses on the next non-disabled date', async () => {
      const { queryByText, emitted } = renderComponent({ props });
      let focusedDate = queryByText(modelValue.getDate()).closest('button');

      await fireEvent.keyDown(focusedDate, { key: 'ArrowDown', code: 'ArrowDown' });
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('keydown');

      focusedDate = queryByText(modelValue.getDate() + 7).closest('button');
      expect(focusedDate).toHaveFocus();
    });

    it('typing ArrowUp, it focuses on the next non-disabled date', async () => {
      const { queryByText, emitted } = renderComponent({ props });
      let focusedDate = queryByText(modelValue.getDate()).closest('button');

      await fireEvent.keyDown(focusedDate, { key: 'ArrowUp', code: 'ArrowUp' });
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('keydown');

      focusedDate = queryByText(modelValue.getDate() - 7).closest('button');
      expect(focusedDate).toHaveFocus();
    });

    it('typing PageUp (without shift key), it focuses on the same date one month previously', async () => {
      const { queryByText, emitted } = renderComponent({ props });
      let focusedDate = queryByText(modelValue.getDate()).closest('button');

      await fireEvent.keyDown(focusedDate, { key: 'PageUp', code: 'PageUp' });
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('keydown');

      const monthText = queryByText('May 2021');
      expect(monthText).toBeInTheDocument();

      focusedDate = queryByText(modelValue.getDate()).closest('button');
      expect(focusedDate).toHaveFocus();
    });

    it('typing PageUp with shift key, it focuses on the same date one year previously', async () => {
      props = { ...initialProps, open: true, min: new Date(new Date().setMonth(new Date().getMonth() - 13)) };
      const { queryByText, emitted } = renderComponent({ props });
      let focusedDate = queryByText(modelValue.getDate()).closest('button');

      await fireEvent.keyDown(focusedDate, { key: 'PageUp', code: 'PageUp', shiftKey: true });
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('keydown');

      const monthText = queryByText('June 2020');
      expect(monthText).toBeInTheDocument();

      focusedDate = queryByText(modelValue.getDate()).closest('button');
      expect(focusedDate).toHaveFocus();
    });

    it('typing PageDown (without shift key), it focuses on the same date one month in the future', async () => {
      const { queryByText, emitted } = renderComponent({ props });
      let focusedDate = queryByText(modelValue.getDate()).closest('button');

      await fireEvent.keyDown(focusedDate, { key: 'PageDown', code: 'PageDown' });
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('keydown');

      const monthText = queryByText('July 2021');
      expect(monthText).toBeInTheDocument();

      focusedDate = queryByText(modelValue.getDate()).closest('button');
      expect(focusedDate).toHaveFocus();
    });

    it('typing PageDown with shift key, it focuses on the same date one year in the future', async () => {
      const { queryByText, emitted } = renderComponent({ props });
      let focusedDate = queryByText(modelValue.getDate()).closest('button');

      await fireEvent.keyDown(focusedDate, { key: 'PageDown', code: 'PageDown', shiftKey: true });
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('keydown');

      const monthText = queryByText('June 2022');
      expect(monthText).toBeInTheDocument();

      focusedDate = queryByText(modelValue.getDate()).closest('button');
      expect(focusedDate).toHaveFocus();
    });

    it('typing Home, it focuses on the day at the start of the current week', async () => {
      const { queryByText, emitted } = renderComponent({ props });
      let focusedDate = queryByText(modelValue.getDate()).closest('button');

      await fireEvent.keyDown(focusedDate, { key: 'Home', code: 'Home' });
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('keydown');

      focusedDate = queryByText(13).closest('button');
      expect(focusedDate).toHaveFocus();
    });

    it('typing End, it focuses on the day at the end of the current week', async () => {
      const { queryByText, emitted } = renderComponent({ props });
      let focusedDate = queryByText(modelValue.getDate()).closest('button');

      await fireEvent.keyDown(focusedDate, { key: 'End', code: 'End' });
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('keydown');

      focusedDate = queryByText(19).closest('button');
      expect(focusedDate).toHaveFocus();
    });

    describe('when a date is disabled', () => {

      it('using arrow keys skips over that date', async () => {
        props = { ...initialProps, open: true, isDateDisabled: (date) => date.getDate() === 15 };
        const { queryByText, emitted } = renderComponent({ props });
        let focusedDate = queryByText(modelValue.getDate()).closest('button');

        await fireEvent.keyDown(focusedDate, { key: 'ArrowRight', code: 'ArrowRight' });
        const emittedEvent = emitted();
        expect(emittedEvent).toHaveProperty('keydown');

        focusedDate = queryByText(modelValue.getDate() + 2).closest('button');
        expect(focusedDate).toHaveFocus();
      });

    });

    describe('selecting a date', () => {

      let component;
      let dateToSelect;

      beforeEach(() => {
        component = renderComponent({ props });
        const { queryByText } = component;
        dateToSelect = queryByText(23).closest('button');
      });

      it('emits an update:open event with value false', async () => {
        const { emitted } = component;

        await fireEvent.click(dateToSelect);
        const emittedEvent = emitted();
        expect(emittedEvent).toHaveProperty('update:open');

        expect(emittedEvent['update:open'][0][0]).toEqual(false);

      });

      it('emits an input event', async () => {
        const { emitted } = component;

        await fireEvent.click(dateToSelect);
        const emittedEvent = emitted();
        expect(emittedEvent).toHaveProperty('input');

        expect(emittedEvent.input[0][0]).toEqual(new Date(2021, 5, 23));
      });

      it('emits an update:modelValue event', async () => {
        const { emitted } = component;

        await fireEvent.click(dateToSelect);
        const emittedEvent = emitted();
        expect(emittedEvent).toHaveProperty('update:modelValue');

        expect(emittedEvent['update:modelValue'][0][0]).toEqual(new Date(2021, 5, 23));
      });

    });

    it('closes the datepicker when clicking outside the component', async () => {
      props = { ...initialProps, open: true };

      const { emitted } = renderComponent({ props });
      await fireEvent.click(document);

      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('update:open');

      expect(emittedEvent['update:open'][0][0]).toEqual(false);
    });

  });

});
