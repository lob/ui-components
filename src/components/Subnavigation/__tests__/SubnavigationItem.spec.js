import '@testing-library/jest-dom';
import { createRouter, createMemoryHistory } from 'vue-router';
import { render } from '@testing-library/vue';
import SubnavigationItem from '../SubnavigationItem.vue';

const initialProps = {
  title: 'Account',
  to: '/account'
};
const routes = [
  { path: '', component: { template: '<div></div>' } },
  { path: '/', component: { template: '<div>/</div>' } },
  { path: '/account', component: { template: '<div>Account</div>' } },
  { path: '/api-keys', component: { template: '<div>API Keys</div>' } },
  { path: '/payment', component: { template: '<div>Payment</div>' } }
];
const router = createRouter({
  history: createMemoryHistory(),
  routes
});

const renderComponent = (options) => render(SubnavigationItem, { ...options, global: { plugins: [router] } });

describe('SubnavigationItem', () => {

  it('renders correctly', async () => {
    const props = initialProps;
    const { queryByText, queryByRole } = renderComponent({ props });
    await router.isReady();

    let item = queryByText(props.title);
    expect(item).toBeInTheDocument();

    item = queryByRole('link');
    expect(item).toBeInTheDocument();
  });

  it('adds the correct classes when the item is active', async () => {
    const props = initialProps;

    const { queryByTestId } = renderComponent({ props });
    router.push('/account');
    await router.isReady();

    const navItem = queryByTestId('subnav-item');
    expect(navItem).toHaveClass('lob-active-border');
  });

});
