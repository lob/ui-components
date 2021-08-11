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
        name: 'Create envelopes',
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

  let component;

  beforeEach(async () => {
    const props = initialProps;
    component = renderComponent({ props });
    router.push('/envelopes/create');
    await router.isReady();
  });

  it('renders a semantic nav element', async () => {
    const { queryByRole } = component;

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
    const { queryAllByRole } = component;

    const links = queryAllByRole('link');
    expect(links).toHaveLength(3);
  });

  it('renders the last item as active', async () => {
    const { queryAllByRole } = component;

    const links = queryAllByRole('link');
    expect(links[2]).toHaveClass('router-link-active');
  });

  it('renders the text title-cased', async () => {
    const { queryByText } = component;

    const navLink = queryByText('Create Envelopes');
    expect(navLink).toBeInTheDocument();
  });

});
