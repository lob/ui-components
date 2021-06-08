import '@testing-library/jest-dom';
import { render  } from '@testing-library/vue';
import TopNavBar from '../TopNavBar.vue';

const renderComponent = (options, configure = null) => render(TopNavBar, { ...options }, configure);

describe('TopNavBar', () => {

  it('renders correctly', () => {
    const { queryByRole } = renderComponent();

    const nav = queryByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

});
