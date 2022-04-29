import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import MegaButton from '../MegaButton.vue';

let slots;
let slotContent;

beforeEach(() => {
  slotContent = 'MegaButton';
  slots = { default: [slotContent] };
});

const renderComponent = (options, configure = null) => render(MegaButton, { ...options }, configure);

describe('MegaButton', () => {

  it('renders correctly', () => {
    const { queryByRole, queryByText } = renderComponent({ slots });

    const megaButton = queryByRole('button');
    expect(megaButton).toBeInTheDocument();

    const slot = queryByText(slotContent);
    expect(slot).toBeInTheDocument();
  });

  it('disables the button when disabled prop is true', () => {
    const props = { disabled: true };
    const { queryByRole } = renderComponent({ props, slots });

    const megaButton = queryByRole('megaButton');
    expect(megaButton).toBeDisabled();
  });

  it('shows cursor-not-allowed when disabled prop is true', () => {
    const props = { disabled: true };
    const { queryByRole } = renderComponent({ props, slots });

    const megaButton = queryByRole('megaButton');
    expect(megaButton).toHaveClass('cursor-not-allowed');
  });

  it('fires the click event when clicked', async () => {
    const { queryByRole, emitted } = renderComponent({ slots });

    const button = queryByRole('button');

    await fireEvent.click(button);
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('click');
  });

});
