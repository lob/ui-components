import '@testing-library/jest-dom';

import { render } from '@testing-library/vue';
import Subnavigation from '../Subnavigation.vue';
import SubnaviationItem from '../SubnavigationItem.vue';

const initialProps = {
  title: 'Account',
  to: '/account'
};
const routes = [
  { path: '/account', component: { template: '<div>Account</div>' } },
  { path: '/api-keys', component: { template: '<div>API Keys</div>' } },
  { path: '/payment', component: { template: '<div>Payment</div>' } }
];

const renderSubnav = (options, configure = null) => render(Subnavigation, { ...options }, configure);
const renderSubnavItem = (options, configure = null) => render(SubnaviationItem, { ...options, routes }, configure);

describe('Subnavigation', () => {

  let slots;
  let slotContent;

  beforeEach(() => {
    slotContent = 'I\'m a child';
    slots = { default: [`<li>${slotContent}</li>`] };
  });

  it('renders correctly', () => {
    const { queryByRole } = renderSubnav();

    const subnav = queryByRole('navigation');
    expect(subnav).toBeInTheDocument();
  });

  it('renders the slot content', () => {
    const { queryByText } = renderSubnav({ slots });

    const slot = queryByText(slotContent);
    expect(slot).toBeInTheDocument();
  });

});

describe('SubnavigationItem', () => {

  it('renders correctly', () => {
    const props = initialProps;
    const { queryByText, queryByRole } = renderSubnavItem({ props });

    let item = queryByText(props.title);
    expect(item).toBeInTheDocument();

    item = queryByRole('link');
    expect(item).toBeInTheDocument();
  });

  it('adds the correct classes when the item is active', () => {
    const props = initialProps;

    const configureWithInitialRoute = (_vue, _store, router) => {
      router.push('/account');
    };
    const { queryByTestId } = renderSubnavItem({ props }, configureWithInitialRoute);

    const navItem = queryByTestId('subnav-item');
    expect(navItem).toHaveClass('lob-active-border');
  });

});
