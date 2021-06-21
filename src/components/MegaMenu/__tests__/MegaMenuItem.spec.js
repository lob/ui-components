import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import { createRouter, createMemoryHistory } from 'vue-router';
import { constants } from '@/config';
import MegaMenuItem from '../MegaMenuItem.vue';

const initialProps = {
  to: '/settings',
  imageSource: 'image.svg'
};

const routes = [
  { path: '', component: { template: '<div></div>' } },
  { path: '/', component: { template: '<div>/</div>' } },
  { path: '/settings', component: { template: '<div>settings</div>' } }
];
const router = createRouter({
  history: createMemoryHistory(),
  routes
});

const renderComponent = async (options) => {
  const result = render(MegaMenuItem, {
    ...options,
    global: { plugins: [router, constants] }
  });
  await router.isReady();
  return result;
};

describe('MegaMenuItem', () => {

  it('renders correctly when an internal link', async () => {
    const props = initialProps;
    const { queryByRole } = await renderComponent({ props });

    const link = queryByRole('link');
    expect(link).toBeInTheDocument();

    const img = queryByRole('img');
    expect(img).toBeInTheDocument();
  });

  it('renders correctly when an external link', async () => {
    const props = {
      ...initialProps,
      to: 'https://google.com'
    };
    const { queryByRole } = await renderComponent({ props });

    const link = queryByRole('link');
    expect(link).toBeInTheDocument();

    const img = queryByRole('img');
    expect(img).toBeInTheDocument();
  });

  it('renders the subtitle when a subtitle is passed in', async () => {
    const props = {
      ...initialProps,
      subtitle: 'subtitle'
    };
    const { queryByText } = await renderComponent({ props });

    const subtitle = queryByText(props.subtitle);
    expect(subtitle).toBeInTheDocument();
  });

});
