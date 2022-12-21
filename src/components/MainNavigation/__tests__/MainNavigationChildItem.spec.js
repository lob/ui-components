import '@testing-library/jest-dom';
import { createRouter, createMemoryHistory } from 'vue-router';
import { render, fireEvent } from '@testing-library/vue';
import MainNavigationChildItem from '../MainNavigationChildItem.vue';

const initialProps = {
  title: 'Overview',
  to: '/overview'
};
const routes = [
  {
    path: '/overview',
    component: { template: '<div>Overview</div>' },
    children: [{ path: 'about', component: { template: '<div>About</div>' } }]
  },
  { path: '/', component: { template: '<div>Home</div>' } }
];
const router = createRouter({
  history: createMemoryHistory(),
  routes
});

const renderComponent = (options) =>
  render(MainNavigationChildItem, {
    ...options,
    global: { plugins: [router] }
  });

describe('Main Navigation Child Item', () => {

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

    const { queryByRole } = renderComponent({ props });
    router.push('/overview/about');
    await router.isReady();

    const navItem = queryByRole('link', { name: 'Overview' });
    expect(navItem).toHaveClass('text-gray-800 type-small-600');
  });

  it('adds the correct classes when the item is exact active', async () => {
    const props = initialProps;
    router.push('/overview');
    await router.isReady();

    const { queryByRole } = renderComponent({ props });

    const navItem = queryByRole('link', { name: 'Overview' });
    expect(navItem).toHaveClass('text-gray-800 type-small-600');
  });

  describe('when clicked', () => {

    it('emits a nav event', async () => {
      const props = initialProps;

      const { queryByRole, emitted } = await renderComponent({ props });
      await router.isReady();

      const link = queryByRole('link');
      expect(link).toBeInTheDocument();

      await fireEvent.click(link);
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('nav');
      expect(emittedEvent.nav[0][0]).toEqual('/overview');
    });

  });

});
