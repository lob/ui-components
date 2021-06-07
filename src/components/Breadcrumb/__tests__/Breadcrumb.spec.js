import '@testing-library/jest-dom';
import { createRouter, createMemoryHistory } from 'vue-router';
import { render } from '@testing-library/vue';
import Breadcrumb from '../Breadcrumb.vue';

const initialProps = {
  startName: 'Dashboard'
};

const routes = [
  { path: '' },
  { path: '/' },
  {
    path: '/envelopes',
    name: 'Envelopes',
    component: {
      template: '<div>envelopes</div>'
    },
    children: [
      {
        path: 'create',
        component: {
          template: '<div>create</div>'
        }
      }
    ]
  }
];
const router = createRouter({
  history: createMemoryHistory(),
  routes
});

const renderComponent = (options) =>
  render(Breadcrumb, { ...options, global: { plugins: [router] } });

describe('Breadcrumb', () => {

  it('renders a semantic nav element', async () => {
    const props = initialProps;
    const { queryByRole } = renderComponent({ props });
    router.push('/envelopes/create');
    await router.isReady();

    const nav = queryByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('renders an image when an icon is provided', async () => {
    const props = { ...initialProps, iconSrc: 'icon' };
    const { queryByRole } = renderComponent({ props });
    router.push('/envelopes/create');
    await router.isReady();

    const img = queryByRole('img');
    expect(img).toBeInTheDocument();
  });

  it('renders the correct number of breadcrumbs', async () => {
    const props = initialProps;

    const { queryAllByRole } = renderComponent({ props });
    router.push('/envelopes/create');
    await router.isReady();

    const links = queryAllByRole('link');
    expect(links).toHaveLength(3);
  });

  it('renders the last item as active', async () => {
    const props = initialProps;

    const { queryAllByRole } = renderComponent({ props });
    router.push('/envelopes/create');
    await router.isReady();

    const links = queryAllByRole('link');
    expect(links[2]).toHaveClass('router-link-active');
  });

});
