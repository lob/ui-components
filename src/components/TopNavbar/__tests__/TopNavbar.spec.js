import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import TopNavbar from '../TopNavbar.vue';

const renderComponent = (options, configure = null) =>
  render(TopNavbar, { ...options }, configure);

describe('TopNavbar', () => {
  it('renders correctly', () => {
    const { queryByRole } = renderComponent();

    const nav = queryByRole('navigation');
    expect(nav).toBeInTheDocument();
  });
});
