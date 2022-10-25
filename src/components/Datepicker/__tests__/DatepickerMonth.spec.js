import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import { translate } from '@/mixins';
import DatepickerMonth from '../DatepickerMonth.vue';

const mixins = [translate];

const initialProps = {
  focusedDate: new Date(2021, 5, 14),
  min: new Date(2020, 5, 14),
  max: new Date(2022, 5, 14)
};

const renderComponent = (options) => render(DatepickerMonth, { ...options, global: { mixins } });

describe('DatepickerMonth', () => {

  it('renders correctly', () => {
    const props = initialProps;
    const { queryAllByRole } = renderComponent({ props });

    const dateButtons = queryAllByRole('button');
    expect(dateButtons.length).toEqual(35);
  });

  it('emits a keydown event', async () => {
    const props = initialProps;
    const { queryAllByRole, emitted } = renderComponent({ props });

    const button = queryAllByRole('button')[0];

    await fireEvent.keyDown(button);
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('keydown');
  });

  it('emits a click event', async () => {
    const props = initialProps;
    const { queryAllByRole, emitted } = renderComponent({ props });

    const button = queryAllByRole('button')[0];

    await fireEvent.click(button);
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('click');
  });

  it('emits a dateSelect event', async () => {
    const props = initialProps;
    const { queryAllByRole, emitted } = renderComponent({ props });

    const button = queryAllByRole('button')[0];

    await fireEvent.click(button);
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('dateSelect');
    expect(emittedEvent.dateSelect[0][0]).toEqual(new Date(2021, 4, 30));
  });

  describe('when te disableWeekends prop is true', () => {

    it('the weekend dates buttons are disabled', () => {
      const props = initialProps;
      props.disableWeekends = true;
      const { getAllByText } = renderComponent({ props });

      const saturdayButton = getAllByText('30')[0];
      expect(saturdayButton.parentElement).toHaveAttribute('aria-disabled', 'true');
      const sundayButton = getAllByText('31')[0];
      expect(sundayButton.parentElement).toHaveAttribute('aria-disabled', 'true');
    });

  });

});
