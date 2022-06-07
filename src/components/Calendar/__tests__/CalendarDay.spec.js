import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import CalendarDay from '../CalendarDay.vue';
import { addDays } from 'date-fns';

const initialProps = {
  date: new Date(),
  selectableRange: 180
};

const renderComponent = (options) => render(CalendarDay, { ...options });

describe('CalendarDay', () => {

  it('renders correctly', () => {
    const props = initialProps;
    const { queryByRole } = renderComponent({ props });

    const button = queryByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('tabindex', '-1');
  });

  it('adds the correct class when today is true', () => {
    const props = { ...initialProps, today: true };
    const { queryByRole } = renderComponent({ props });

    const button = queryByRole('button');
    expect(button).toHaveClass('bg-gray-100');
  });

  it('adds tabindex when focused is true', () => {
    const props = { ...initialProps, focused: true };
    const { queryByRole } = renderComponent({ props });

    const button = queryByRole('button');
    expect(button).toHaveAttribute('tabindex', '0');
  });

  it('adds the correct class when selected is true', () => {
    const props = { ...initialProps, selected: true };
    const { queryByRole } = renderComponent({ props });

    const button = queryByRole('button');
    expect(button).toHaveClass('!bg-primary-500');
  });

  describe('when not disabled', () => {

    it('sets the aria-pressed attribute when selected is true', () => {
      const props = { ...initialProps, selected: true };
      const { queryByRole } = renderComponent({ props });

      const button = queryByRole('button');
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });

  });

  describe('when disabled', () => {

    let props;

    beforeEach(() => {
      props = { ...initialProps, disabled: true, selected: true };
    });

    it('sets the aria-disabled attribute', () => {
      const { queryByRole } = renderComponent({ props });

      const button = queryByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('sets aria-pressed to false even if selected is true', () => {
      const { queryByRole } = renderComponent({ props });

      const button = queryByRole('button');
      expect(button).toHaveAttribute('aria-pressed', 'false');
    });

  });

  it('disables the button if the date is outside the range', () => {
    const props = { ...initialProps, inRange: false };
    const { queryByRole } = renderComponent({ props });

    const button = queryByRole('button');
    expect(button).toBeDisabled();
  });

  describe('when the date is selectable', () => {

    it('has a gray border', () => {
      const props = { ...initialProps, today: true };
      const { queryByRole } = renderComponent({ props });

      const button = queryByRole('button');
      expect(button).toHaveClass('border-gray-100');
    });

    it('emits a keydown event', async () => {
      const props = { ...initialProps, today: true };
      const { queryByRole, emitted } = renderComponent({ props });

      const button = queryByRole('button');

      await fireEvent.keyDown(button);
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('keydown');
    });

    it('emits a click event', async () => {
      const props = { ...initialProps, today: true };
      const { queryByRole, emitted } = renderComponent({ props });

      const button = queryByRole('button');

      await userEvent.click(button);
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('click');
    });

    it('emits a dateSelect event', async () => {
      const props = { ...initialProps, today: true };
      const { queryByRole, emitted } = renderComponent({ props });

      const button = queryByRole('button');

      await userEvent.click(button);
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('dateSelect');
      expect(emittedEvent.dateSelect[0][0]).toEqual(props.date);
    });

  });

  describe('when the date is not selectable', () => {

    it('has the correct classes', () => {
      const props = { date: addDays(new Date(), 182) };
      const { queryByRole } = renderComponent({ props });

      const button = queryByRole('button');
      expect(button).not.toHaveClass('border-gray-100');
      expect(button).toHaveClass('cursor-not-allowed');
    });

    it('does not emit a keydown event', async () => {
      const props = { date: addDays(new Date(), 182) };
      const { queryByRole, emitted } = renderComponent({ props });

      const button = queryByRole('button');

      await fireEvent.keyDown(button);
      const emittedEvent = emitted();
      expect(emittedEvent).not.toHaveProperty('keydown');
    });

    it('does not emit a click event', async () => {
      const props = { date: addDays(new Date(), 182) };
      const { queryByRole, emitted } = renderComponent({ props });

      const button = queryByRole('button');

      await userEvent.click(button);
      const emittedEvent = emitted();
      expect(emittedEvent).not.toHaveProperty('click');
    });

    it('does not emit a dateSelect event', async () => {
      const props = { date: addDays(new Date(), 182) };
      const { queryByRole, emitted } = renderComponent({ props });

      const button = queryByRole('button');

      await userEvent.click(button);
      const emittedEvent = emitted();
      expect(emittedEvent).not.toHaveProperty('dateSelect');
    });

  });

});
