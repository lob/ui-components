import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { translate } from '@/mixins';
import CalendarMonth from '../CalendarMonth.vue';
import { addYears, subYears } from 'date-fns';

const mixins = [translate];

const initialProps = {
  focusedDate: new Date(),
  min: subYears(new Date(), 1),
  max: addYears(new Date(), 1)
};

const renderComponent = (options) =>
  render(CalendarMonth, { ...options, global: { mixins } });

describe('CalendarMonth', () => {
  it('renders correctly', () => {
    const props = initialProps;
    const { queryAllByRole } = renderComponent({ props });

    const dateButtons = queryAllByRole('button');
    expect(dateButtons.length).toBeGreaterThan(28);
  });

  it('emits a keydown event', async () => {
    const props = initialProps;
    const { queryAllByRole, emitted } = renderComponent({ props });

    const buttons = queryAllByRole('button');
    const button = buttons[buttons.length - 1];

    await fireEvent.keyDown(button);
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('keydown');
  });

  it('emits a click event', async () => {
    const props = initialProps;
    const { queryAllByRole, emitted } = renderComponent({ props });

    const buttons = queryAllByRole('button');
    const button = buttons[buttons.length - 1];

    await userEvent.click(button);
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('click');
  });

  it('emits a dateSelect event', async () => {
    const props = initialProps;
    const { queryAllByRole, emitted } = renderComponent({ props });

    const buttons = queryAllByRole('button');
    const button = buttons[buttons.length - 1];

    await userEvent.click(button);
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('dateSelect');
  });
});
