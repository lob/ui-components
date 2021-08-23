import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import LoadingIndicator from '../LoadingIndicator.vue';

const renderComponent = (options = {}) => render(LoadingIndicator, { ...options });

describe('LoadingIndicator', () => {

  describe('when there is no content in the default slot', () => {

    it('renders as loading for screenreader users', () => {
      const { getByTestId } = renderComponent();
      const loading = getByTestId('loading-indicator');
      expect(loading).toHaveAttribute('aria-busy', 'true');
    });

    it('renders as loading for sighted users', () => {
      const { getByTestId } = renderComponent();
      const loading = getByTestId('loading-indicator');
      expect(loading).toHaveClass('loading-gif');
    });

  });

  describe('when there is content in the default slot', () => {

    let slotContent;
    let slots;
    beforeEach(() => {
      slotContent = 'Hello, this is the slot.';
      slots = { default: slotContent };
    });

    it('does not render as loading for screenreader users', () => {
      const { getByTestId } = renderComponent({ slots });
      const loading = getByTestId('loading-indicator');
      expect(loading).toHaveAttribute('aria-busy', 'false');
    });

    it('does not render as loading for sighted users', () => {
      const { getByTestId } = renderComponent({ slots });
      const loading = getByTestId('loading-indicator');
      expect(loading).not.toHaveClass('loading-gif');
    });

    it('renders the content', () => {
      const { getByText } = renderComponent({ slots });
      const defaultSlot = getByText(slotContent);
      expect(defaultSlot).toBeInTheDocument();
    });

  });

});
