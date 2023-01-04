import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import { constants } from '@/config';
import TopNavDropdown from '../TopNavDropdown.vue';

const initialProps = {
  title: 'Products',
  mobileNavs: {},
  navKey: '',
  id: '1'
};

const renderComponent = (options, configure = null) => render(TopNavDropdown, { ...options, global: { plugins: [constants] } }, configure);

describe('TopNavDropdown', () => {

  it('renders correctly', () => {
    const props = initialProps;
    const { queryByRole } = renderComponent({ props });

    const nav = queryByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('hides the nested submenu by default', async () => {
    const props = initialProps;
    const { queryByRole } = renderComponent({ props });

    const nav = queryByRole('navigation');
    expect(nav).toHaveClass('!hidden');
  });

  it('shows the nested submenu on hover', async () => {
    const props = initialProps;
    const { getByTestId, queryByRole } = renderComponent({ props });

    const menuContainer = getByTestId('menu-container');
    await fireEvent.mouseEnter(menuContainer);

    const nav = queryByRole('navigation');
    expect(nav).toHaveClass('!block');
  });

  it('emits a click event', async () => {
    const props = initialProps;
    const { getByTestId, emitted } = renderComponent({ props });

    const menuContainer = getByTestId('menu-container');
    await fireEvent.click(menuContainer);

    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('click');
  });

});
