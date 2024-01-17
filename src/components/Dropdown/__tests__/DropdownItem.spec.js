import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import DropdownItem from '../DropdownItem.vue';

const initialProps = {
  id: 'id',
  option: 'option',
  index: 0,
  active: false,
  placeholder: false
};

const renderComponent = (options) => render(DropdownItem, { ...options });

describe('DropdownItem', () => {
  it('renders correctly', () => {
    const props = initialProps;
    const { queryByRole, queryByText } = renderComponent({ props });

    let option = queryByRole('option');
    expect(option).toBeInTheDocument();

    option = queryByText(props.option);
    expect(option).toBeInTheDocument();
  });

  it('disables the option when it has an object property for disabled', () => {
    const props = {
      ...initialProps,
      option: { label: 'option', disabled: true }
    };
    const { queryByRole, queryByText } = renderComponent({ props });

    let option = queryByRole('option');
    expect(option).toBeInTheDocument();

    option = queryByText(props.option.label);
    expect(option).toBeInTheDocument();
    expect(option).toHaveAttribute('aria-disabled', 'true');
  });

  it('selects the option when it is active', () => {
    const props = { ...initialProps, active: true };
    const { queryByRole } = renderComponent({ props });

    const option = queryByRole('option');
    expect(option).toBeInTheDocument();

    expect(option).toHaveAttribute('aria-selected', 'true');
  });

  it('emits a mousedown event', async () => {
    const props = initialProps;
    const { queryByRole, emitted } = renderComponent({ props });

    const option = queryByRole('option');

    await userEvent.pointer({ keys: '[MouseLeft>]', target: option });

    const emittedEvents = emitted();
    expect(emittedEvents).toHaveProperty('mousedown');
  });

  it('emits a click event', async () => {
    const props = initialProps;
    const { queryByRole, emitted } = renderComponent({ props });

    const option = queryByRole('option');

    await userEvent.click(option);

    const emittedEvents = emitted();
    expect(emittedEvents).toHaveProperty('click');

    // eslint-disable-next-line no-unused-vars
    const [event, index] = emittedEvents.click[0];
    expect(index).toEqual(0);
  });

  it('emits a mouseenter event', async () => {
    const props = initialProps;
    const { queryByRole, emitted } = renderComponent({ props });

    const option = queryByRole('option');

    await userEvent.pointer({ pointerName: 'mouse', target: option });

    const emittedEvents = emitted();
    expect(emittedEvents).toHaveProperty('mouseenter');

    // eslint-disable-next-line no-unused-vars
    const [event, index] = emittedEvents.mouseenter[0];
    expect(index).toEqual(0);
  });
});
