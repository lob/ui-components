import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import Breadcrumb from '../Breadcrumb.vue';

const initialProps = {
  startName: 'Dashboard'
};

const configureWithCurrentRoute = (_vue, _store, router) => {
  router.push('/envelopes/create');
};

const routes = [
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

const renderComponent = (options, configure = configureWithCurrentRoute) => render(Breadcrumb, { ...options, routes }, configure);

describe('Breadcrumb', () => {

  it('renders a semantic nav element', () => {
    const props = initialProps;
    const { queryByRole } = renderComponent({ props });

    const nav = queryByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('renders an image when an icon is provided', () => {
    const props = { ...initialProps, iconSrc: 'icon' };
    const { queryByRole } = renderComponent({ props });

    const img = queryByRole('img');
    expect(img).toBeInTheDocument();
  });

  it('renders the correct number of breadcrumbs', () => {
    const props = initialProps;

    const { queryAllByRole } = renderComponent({ props }, configureWithCurrentRoute);

    const links = queryAllByRole('link');
    expect(links).toHaveLength(3);
  });

  it('renders the last item as active', () => {
    const props = initialProps;

    const { queryAllByRole } = renderComponent({ props }, configureWithCurrentRoute);

    const links = queryAllByRole('link');
    expect(links[2]).toHaveClass('router-link-exact-active');
  });

});
