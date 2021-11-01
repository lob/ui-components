import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import MainNavigation from '../MainNavigation.vue';

const renderComponent = (options, configure = null) => render(MainNavigation, { ...options }, configure);

describe('Main Navigation', () => {

  it('renders correctly', () => {
    const { queryByRole } = renderComponent();

    const nav = queryByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  describe('when collapsible', () => {

    it('collapses when collapse button is clicked', async () => {
      const { queryByRole } = renderComponent();

      const collapseButton = queryByRole('button');
      await fireEvent.click(collapseButton);

      const list = queryByRole('list');
      expect(list).toHaveClass('collapsed');
    });

  });

  describe('when not collapsible', () => {

    it('does not contain button to collapse', async () => {
      const props = { collapsible: false };
      const { queryByRole } = renderComponent({ props });

      const collapseButton = queryByRole('button');

      expect(collapseButton).not.toBeInTheDocument();
    });

  });

  describe('when inner class is passed', () => {

    it('does have inner class', async () => {
      const props = { innerClass: 'font-bold' };
      const { getByTestId } = renderComponent({ props });

      const inner = getByTestId('main-navigation-inner');

      expect(inner).toHaveClass('font-bold');
    });

  });

});
