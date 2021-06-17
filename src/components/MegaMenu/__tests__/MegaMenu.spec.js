import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import { constants } from '@/config';
import MegaMenu from '../MegaMenu.vue';

const initialProps = {
  title: 'Products',
  mobileNavs: {},
  navKey: '',
  id: '1'
};

const renderComponent = (options, configure = null) => render(MegaMenu, { ...options, global: { plugins: [constants] } }, configure);

describe('MegaMenu', () => {

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
    expect(nav).not.toHaveClass('md:!block');
  });

  it('shows the nested submenu on hover', async () => {
    const props = initialProps;
    const { getByTestId, queryByRole } = renderComponent({ props });

    const menuContainer = getByTestId('menu-container');
    await fireEvent.mouseEnter(menuContainer);

    const nav = queryByRole('navigation');
    expect(nav).toHaveClass('md:!block');
  });

});
