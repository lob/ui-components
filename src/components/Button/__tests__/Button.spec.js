import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import Button from '../Button.vue';

let slots;
let slotContent;

beforeEach(() => {
  slotContent = 'Button';
  slots = { default: [slotContent] };
});

const renderComponent = (options, configure = null) => render(Button, { ...options }, configure);

describe('Button', () => {

  it('renders correctly', () => {
    const { queryByRole, queryByText } = renderComponent({ slots });

    const button = queryByRole('button');
    expect(button).toBeInTheDocument();

    const slot = queryByText(slotContent);
    expect(slot).toBeInTheDocument();
  });

  it('disables the button when disabled prop is true', () => {
    const props = { disabled: true };
    const { queryByRole } = renderComponent({ props, slots });

    const button = queryByRole('button');
    expect(button).toBeDisabled();
  });

  it('shows cursor-not-allowed when disabled prop is true', () => {
    const props = { disabled: true };
    const { queryByRole } = renderComponent({ props, slots });

    const button = queryByRole('button');
    expect(button).toHaveClass('cursor-not-allowed');
  });

  it('fires the click event when clicked', async () => {
    const { queryByRole, emitted } = renderComponent({ slots });

    const button = queryByRole('button');

    await fireEvent.click(button);
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('click');
  });

});
