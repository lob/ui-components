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

    it('collapses when clicked', async () => {
      const { getByRole } = renderComponent();

      const list = getByRole('list');
      await fireEvent.click(list);

      expect(list).toHaveClass('collapsed');
    });

  });

  describe('when not collapsible', () => {

    it('does not collapse when clicked', async () => {
      const props = { collapsible: false };
      const { getByRole } = renderComponent({ props });

      const list = getByRole('list');
      await fireEvent.click(list);

      expect(list).not.toHaveClass('collapsed');
    });

  });

});

