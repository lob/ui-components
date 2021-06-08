import '@testing-library/jest-dom';
import { createRouter, createMemoryHistory } from 'vue-router';
import { render } from '@testing-library/vue';
import Subnavigation from '../Subnavigation.vue';

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

const renderComponent = async (options) => {
  const result = render(Subnavigation, { ...options, global: { plugins: [router] } });
  await router.isReady();
  return result;
};

describe('Subnavigation', () => {

  let slots;
  let slotContent;

  beforeEach(() => {
    slotContent = 'I\'m a child';
    slots = { default: [`<li>${slotContent}</li>`] };
  });

  it('renders correctly', async () => {
    const { queryByRole } = await renderComponent();

    const subnav = queryByRole('navigation');
    expect(subnav).toBeInTheDocument();
  });

  it('renders the slot content', async () => {
    const { getByText } = await renderComponent({ slots });

    const slot = getByText(new RegExp(slotContent));
    expect(slot).toBeInTheDocument();
  });

});
