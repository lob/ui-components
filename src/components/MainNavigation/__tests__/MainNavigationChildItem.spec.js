import '@testing-library/jest-dom';

import { render } from '@testing-library/vue';
import MainNavigationChildItem from '../MainNavigationChildItem.vue';

const initialProps = {
  title: 'Overview',
  to: '/overview'
};
const routes = [
  { path: '/overview', component: { template: '<div>Overview</div>' } },
  { path: '/about', component: { template: '<div>About</div>' } },
  { path: '/', component: { template: '<div>Home</div>' } }
];

const renderComponent = (options, configure = null) => render(MainNavigationChildItem, { ...options, routes }, configure);

describe('Main Navigation Child Item', () => {

  it('renders correctly', () => {
    const props = initialProps;
    const { queryByText, queryByRole } = renderComponent({ props });

    let item = queryByText(props.title);
    expect(item).toBeInTheDocument();

    item = queryByRole('link');
    expect(item).toBeInTheDocument();
  });

  it('adds the correct classes when the item is active', () => {
    const props = initialProps;

    const configureWithInitialRoute = (_vue, _store, router) => {
      router.push('/overview');
    };
    const { queryByTestId } = renderComponent({ props }, configureWithInitialRoute);

    const navItem = queryByTestId('nav-child-item');
    expect(navItem).toHaveClass('font-medium bg-white-300 rounded-l-full');
  });

});

