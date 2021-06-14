import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
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
    const props = { ...initialProps, option: { label: 'option', disabled: true } };
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

    await fireEvent.mouseDown(option);
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('mousedown');
  });

  it('emits a click event', async () => {
    const props = initialProps;
    const { queryByRole, emitted } = renderComponent({ props });

    const option = queryByRole('option');

    await fireEvent.click(option);
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('click');
  });

});
