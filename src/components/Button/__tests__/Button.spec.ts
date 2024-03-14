import '@testing-library/jest-dom';
import { RenderOptions, render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import LobButton from '../Button.vue';

let slots: { default: string[] };
let slotContent: string;

beforeEach(() => {
  slotContent = 'LobButton';
  slots = { default: [slotContent] };
});

const renderComponent = (options: RenderOptions) =>
  render(LobButton, { ...options });

describe('Button', () => {
  it('renders the primary variant by default', () => {
    const { getByRole, queryByText } = renderComponent({ slots });
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-black text-white');

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
    const { getByRole, emitted } = renderComponent({ slots });

    const button = getByRole('button');
    await userEvent.click(button);
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('click');
  });

  it('renders the secondary variant', () => {
    const { getByRole } = renderComponent({
      slots,
      props: { variant: 'secondary' }
    });
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-white text-gray-800 border border-gray-100');
  });

  it('renders the quiet variant', () => {
    const { getByRole } = renderComponent({
      slots,
      props: { variant: 'quiet' }
    });
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'bg-gray-50 text-gray-500 border border-gray-300'
    );
  });

  it('renders the ghost variant', () => {
    const { getByRole } = renderComponent({
      slots,
      props: { variant: 'ghost' }
    });
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'bg-transparent text-gray-500 hover:bg-gray-100'
    );
  });

  it('renders the danger variant', () => {
    const { getByRole } = renderComponent({
      slots,
      props: { variant: 'danger' }
    });
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-red-500 text-white');
  });

  it('renders the danger-secondary variant', () => {
    const { getByRole } = renderComponent({
      slots,
      props: { variant: 'danger-secondary' }
    });
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-white text-red-500 border border-red-500');
  });

  it('renders the link variant', () => {
    const { getByRole } = renderComponent({
      slots,
      props: { variant: 'link' }
    });
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('!text-blue-600 underline');
    expect(button).not.toHaveClass('py-3 px-5');
  });
});
