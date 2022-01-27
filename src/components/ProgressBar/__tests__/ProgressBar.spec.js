import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import ProgressBar from '../ProgressBar.vue';

const renderComponent = (options) => render(ProgressBar, { ...options });

describe('ProgressBar', () => {

  describe('Indeterminate', () => {

    it('renders Progress and the dots', () => {
      const { queryByText, queryByTestId } = renderComponent();

      const progress = queryByText(/Progress/i);
      const dots = queryByTestId('dots');
      expect(progress).toBeInTheDocument();
      expect(dots).toBeInTheDocument();
    });

    it('the inner bar has the indybar class', () => {
      const { queryByTestId } = renderComponent();

      const innerbar = queryByTestId('innerbar');
      expect(innerbar).toHaveClass('animate-indybar');
    });

  });

  describe('With percentage', () => {

    const props = { percentage: 25 };

    it('renders Progress and the percentage', () => {
      const { queryByText } = renderComponent({ props });

      const progress = queryByText(/Progress/i);
      expect(progress).toBeInTheDocument();
      const percentage = queryByText(/- 25%/i);
      expect(percentage).toBeInTheDocument();
    });

    it('the inner bar does not have the indybar class', () => {
      const { queryByTestId } = renderComponent({ props });

      const innerbar = queryByTestId('innerbar');
      expect(innerbar).not.toHaveClass('animate-indybar');
    });

  });

});
