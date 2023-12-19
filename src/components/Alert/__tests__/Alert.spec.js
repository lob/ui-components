import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import Alert from '../Alert.vue';
import userEvent from '@testing-library/user-event';

const renderComponent = (options) => render(Alert, { ...options });

describe('Alert', () => {

  describe('alert content', () => {

    it('renders only the default content', () => {
      const content = 'Hello, this is an alert.';
      const slots = { default: content };
      const { getByText } = renderComponent({ slots });

      const alertContent = getByText(content);
      expect(alertContent).toBeInTheDocument().toHaveClass('type-small-500');
    });

    it('renders only the heading content', () => {
      const heading = 'Hello, this is a heading only';
      const slots = { heading };
      const { getByText } = renderComponent({ slots });

      const alertHeading = getByText(heading);
      expect(alertHeading).toBeInTheDocument().toHaveClass('type-large-700');
    });

    it('renders both the heading and default content', () => {
      const heading = 'Hello, this is a heading';
      const content = 'This is the main content.';
      const slots = { heading, default: content };
      const { getByText } = renderComponent({ slots });

      const alertHeading = getByText(heading);
      expect(alertHeading).toBeInTheDocument().toHaveClass('type-large-700');
      const alertContent = getByText(content);
      expect(alertContent).toBeInTheDocument().toHaveClass('type-small-500');
    });

  });

  describe('alert variant colors', () => {

    it('renders as info variant by default', () => {
      const slots = { default: 'Hello, this is an alert.' };
      const { getByTestId } = renderComponent({ slots });

      const alertContent = getByTestId('alert');
      expect(alertContent).toBeInTheDocument().toHaveClass('text-blue-700 bg-blue-50');
    });

    it('renders the error colors with the error variant prop', () => {
      const slots = { default: 'Hello, this is an alert.' };
      const { getByTestId } = renderComponent({ slots, props: { variant: 'error' } });

      const alertContent = getByTestId('alert');
      expect(alertContent).toBeInTheDocument().toHaveClass('text-red-600 bg-red-50');
    });

    it('renders the success colors with the success variant prop', () => {
      const slots = { default: 'Hello, this is an alert.' };
      const { getByTestId } = renderComponent({ slots, props: { variant: 'success' } });

      const alertContent = getByTestId('alert');
      expect(alertContent).toBeInTheDocument().toHaveClass('text-green-700 bg-green-50');
    });

    it('renders the warning colors with the warning variant prop', () => {
      const slots = { default: 'Hello, this is an alert.' };
      const { getByTestId } = renderComponent({ slots, props: { variant: 'warning' } });

      const alertContent = getByTestId('alert');
      expect(alertContent).toBeInTheDocument().toHaveClass('text-orange-600 bg-orange-50');
    });

    it('renders the refresh colors with the refresh variant prop', () => {
      const slots = { default: 'Hello, this is an alert.' };
      const { getByTestId } = renderComponent({ slots, props: { variant: 'refresh' } });

      const alertContent = getByTestId('alert');
      expect(alertContent).toBeInTheDocument().toHaveClass('text-purple-600 bg-purple-50');
    });

  });

  describe('alert icons', () => {

    it('renders the main alert icon by default', () => {
      const slots = { default: 'Hello, this is an alert.' };
      const { getByTestId } = renderComponent({ slots });

      const alertIcon = getByTestId('alertIcon');
      expect(alertIcon).toBeInTheDocument().toHaveClass('text-blue-700');
    });

    it('does not render the icon if the showIcon prop is false', () => {
      const slots = { default: 'Hello, this is an alert.' };
      const { queryByTestId } = renderComponent({ slots, props: { showIcon: false } });

      const alertIcon = queryByTestId('alertIcon');
      expect(alertIcon).not.toBeInTheDocument();
    });

  });

  describe('alert extra features: Link and Close', () => {

    it('renders the close button if the showCloseButton prop is true', async () => {
      const slots = { default: 'Hello, this is an alert.' };
      const { getByTestId, emitted } = renderComponent({ slots, props: { showCloseButton: true } });

      const closeButton = getByTestId('closeButton');
      expect(closeButton).toBeInTheDocument();
      await userEvent.click(closeButton);
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('close');
    });

    it('renders the link if the linkSrc prop is passed', async () => {
      const slots = { default: 'Hello, this is an alert.' };
      const { getByRole } = renderComponent({ slots, props: { linkSrc: 'www.lob.com' } });

      const link = getByRole('link', { name: 'Learn more' });
      expect(link).toBeInTheDocument();
    });

  });

});
