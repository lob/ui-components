import '@testing-library/jest-dom';

import { render } from '@testing-library/vue';
import MainNavigation from '../MainNavigation.vue';

const renderComponent = (options, configure = null) => render(MainNavigation, { ...options }, configure);

describe('Main Navigation', () => {

  it('renders correctly', () => {
    const { queryByRole } = renderComponent();

    const nav = queryByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

});

