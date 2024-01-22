import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/vue';
import { translate } from '@/mixins';
import en from '@/mixins/en';
import userEvent from '@testing-library/user-event';
import Datepicker from '../Datepicker.vue';

const mixins = [translate];

// June 14, 2021
const modelValue = new Date(2021, 5, 14);

const initialProps = {
  id: 'test',
  modelValue,
  open: false
};

const renderComponent = (options) =>
  render(Datepicker, { ...options, global: { mixins } });

describe('Datepicker', () => {
  const user = userEvent.setup({ delay: null });

  describe('when closed', () => {
    it('renders correctly', () => {
      const { queryByRole } = renderComponent({ props: { ...initialProps } });

      const dialog = queryByRole('dialog');
      expect(dialog).not.toBeInTheDocument();
    });
  });

  describe('when open', () => {
    let component;

    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(modelValue);

      component = renderComponent({ props: { ...initialProps, open: false } });
      const { rerender } = component;

      // immediately use real timers as soon as the component has been rendered as there are issues
      // with using fake timers with event handler emulators (i.e. fireEvent and userEvent)
      // but we need the fake timers just long enough to render the component with the mocked system time
      // which ensures the minDate and maxDate default values are set correctly
      vi.useRealTimers();

      rerender({ open: true });
    });

    it('renders a dialog', () => {
      const { queryByRole } = component;

      const dialog = queryByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute('aria-hidden', 'false');
    });

    it('renders a close button', () => {
      const { queryByText } = component;

      const button = queryByText(en.datepicker.closeLabel);
      expect(button).toBeInTheDocument();
    });

    it('renders a previous month button', () => {
      const { queryByText } = component;

      const button = queryByText(en.datepicker.prevMonthLabel);
      expect(button).toBeInTheDocument();
    });

    it('renders a next month button', () => {
      const { queryByText } = component;

      const button = queryByText(en.datepicker.nextMonthLabel);
      expect(button).toBeInTheDocument();
    });

    it('renders text for the current month and year', () => {
      const { queryByText } = component;

      const monthText = queryByText('June 2021');
      expect(monthText).toBeInTheDocument();
    });

    it('emits an update:open event with value false when typing Esc', async () => {
      const { emitted } = component;

      await user.keyboard('{Escape}');
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('update:open');
      expect(emittedEvent['update:open'][0][0]).toEqual(false);
    });

    it('emits an update:open event with value false when clicking close button', async () => {
      const { queryByText, emitted } = component;

      const close = queryByText(en.datepicker.closeLabel).closest('button');
      // enter to close datepicker
      await user.click(close);
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('update:open');
      expect(emittedEvent['update:open'][0][0]).toEqual(false);
    });

    it('focuses on the close button when typing Tab and the calendar was focused', async () => {
      const { queryByText } = component;

      // tab to close button
      await user.keyboard('{Tab}');
      const close = queryByText(en.datepicker.closeLabel).closest('button');
      expect(close).toHaveFocus();
    });

    it('focuses on prev button when typing Tab from close button', async () => {
      const { queryByText } = component;

      // tab to close button
      // tab to prev button
      await user.keyboard('{Tab}{Tab}');

      const prev = queryByText(en.datepicker.prevMonthLabel).closest('button');
      expect(prev).toHaveFocus();
    });

    it('focuses on next button when typing Tab from previous button', async () => {
      const { queryByText } = component;

      // tab to close button
      // tab to prev button
      // tab to next button
      await user.keyboard('{Tab}{Tab}{Tab}');

      const next = queryByText(en.datepicker.nextMonthLabel).closest('button');
      expect(next).toHaveFocus();
    });

    it('focuses back inside calendar on focused day when typing Tab from next button', async () => {
      const { queryByText } = component;

      // tab to close button
      // tab to prev button
      // tab to next button
      // tab back to focused date
      await user.keyboard('{Tab}{Tab}{Tab}{Tab}');

      const focusedDate = queryByText(modelValue.getDate()).closest('button');
      expect(focusedDate).toHaveFocus();
    });

    it('goes to the previous month when clicking previous month button', async () => {
      const { queryByText } = component;

      const button = queryByText(en.datepicker.prevMonthLabel);
      await user.click(button);

      const monthText = queryByText('May 2021');
      expect(monthText).toBeInTheDocument();
    });

    it('goes to the next month when clicking next month button', async () => {
      const { queryByText } = component;

      const button = queryByText(en.datepicker.nextMonthLabel);
      await user.click(button);

      const monthText = queryByText('July 2021');
      expect(monthText).toBeInTheDocument();
    });

    it('typing ArrowRight, it focuses on the next non-disabled date', async () => {
      const { queryByText, emitted } = component;

      await user.keyboard('{ArrowRight}');
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('keydown');

      const focusedDate = queryByText(modelValue.getDate() + 1).closest(
        'button'
      );
      expect(focusedDate).toHaveFocus();
    });

    it('typing ArrowLeft, it focuses on the next non-disabled date', async () => {
      const { queryByText, emitted } = component;

      await user.keyboard('{ArrowLeft}');
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('keydown');

      const focusedDate = queryByText(modelValue.getDate() - 1).closest(
        'button'
      );
      expect(focusedDate).toHaveFocus();
    });

    it('typing ArrowDown, it focuses on the next non-disabled date', async () => {
      const { queryByText, emitted } = component;

      await user.keyboard('{ArrowDown}');
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('keydown');

      const focusedDate = queryByText(modelValue.getDate() + 7).closest(
        'button'
      );
      expect(focusedDate).toHaveFocus();
    });

    it('typing ArrowUp, it focuses on the next non-disabled date', async () => {
      const { queryByText, emitted } = component;

      await user.keyboard('{ArrowUp}');
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('keydown');

      const focusedDate = queryByText(modelValue.getDate() - 7).closest(
        'button'
      );
      expect(focusedDate).toHaveFocus();
    });

    it('typing PageUp (without shift key), it focuses on the same date one month previously', async () => {
      const { queryByText, emitted } = component;

      await user.keyboard('{PageUp}');
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('keydown');

      const monthText = queryByText('May 2021');
      expect(monthText).toBeInTheDocument();

      const focusedDate = queryByText(modelValue.getDate()).closest('button');
      expect(focusedDate).toHaveFocus();
    });

    it('typing PageUp with shift key, it focuses on the same date one year previously', async () => {
      const { queryByText, emitted } = component;

      await user.keyboard('{Shift>}{PageUp}{/Shift}');
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('keydown');

      const monthText = queryByText('June 2020');
      expect(monthText).toBeInTheDocument();

      const focusedDate = queryByText(modelValue.getDate()).closest('button');
      expect(focusedDate).toHaveFocus();
    });

    it('typing PageDown (without shift key), it focuses on the same date one month in the future', async () => {
      const { queryByText, emitted } = component;

      await user.keyboard('{PageDown}');
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('keydown');

      const monthText = queryByText('July 2021');
      expect(monthText).toBeInTheDocument();

      const focusedDate = queryByText(modelValue.getDate()).closest('button');
      expect(focusedDate).toHaveFocus();
    });

    it('typing PageDown with shift key, it focuses on the same date one year in the future', async () => {
      const { queryByText, emitted } = component;

      await user.keyboard('{Shift>}{PageDown}{/Shift}');
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('keydown');

      const monthText = queryByText('June 2022');
      expect(monthText).toBeInTheDocument();

      const focusedDate = queryByText(modelValue.getDate()).closest('button');
      expect(focusedDate).toHaveFocus();
    });

    it('typing Home, it focuses on the day at the start of the current week', async () => {
      const { queryByText, emitted } = component;

      await user.keyboard('{Home}');
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('keydown');

      const focusedDate = queryByText(13).closest('button');
      expect(focusedDate).toHaveFocus();
    });

    it('typing End, it focuses on the day at the end of the current week', async () => {
      const { queryByText, emitted } = component;

      await user.keyboard('{End}');
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('keydown');

      const focusedDate = queryByText(19).closest('button');
      expect(focusedDate).toHaveFocus();
    });

    describe('when a date is disabled', () => {
      it('using arrow keys skips over that date', async () => {
        const { rerender, queryByText, emitted } = component;

        await waitFor(() => {
          rerender({ isDateDisabled: (date) => date.getDate() === 15 });
        });

        await user.keyboard('{ArrowRight}');
        const emittedEvent = emitted();
        expect(emittedEvent).toHaveProperty('keydown');

        const focusedDate = queryByText(modelValue.getDate() + 2).closest(
          'button'
        );
        expect(focusedDate).toHaveFocus();
      });
    });

    describe('selecting a date', () => {
      let dateToSelect;

      beforeEach(() => {
        const { queryByText } = component;
        dateToSelect = queryByText(23).closest('button');
      });

      it('emits an update:open event with value false', async () => {
        const { emitted } = component;

        await user.click(dateToSelect);
        const emittedEvent = emitted();
        expect(emittedEvent).toHaveProperty('update:open');

        expect(emittedEvent['update:open'][0][0]).toEqual(false);
      });

      it('emits an input event', async () => {
        const { emitted } = component;

        await user.click(dateToSelect);
        const emittedEvent = emitted();
        expect(emittedEvent).toHaveProperty('input');

        expect(emittedEvent.input[0][0]).toEqual(new Date(2021, 5, 23));
      });

      it('emits an update:modelValue event', async () => {
        const { emitted } = component;

        await user.click(dateToSelect);
        const emittedEvent = emitted();
        expect(emittedEvent).toHaveProperty('update:modelValue');

        expect(emittedEvent['update:modelValue'][0][0]).toEqual(
          new Date(2021, 5, 23)
        );
      });
    });

    it('closes the datepicker when clicking outside the component', async () => {
      const { emitted } = renderComponent({
        props: { ...initialProps, open: true }
      });
      await user.click(document.body);

      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('update:open');

      expect(emittedEvent['update:open'][0][0]).toEqual(false);
    });
  });
});
