import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import { createRouter, createMemoryHistory } from 'vue-router';
import { constants } from '@/config';
import TopNavDropdownItem from '../TopNavDropdownItem.vue';

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
  const result = render(TopNavDropdownItem, {
    ...options,
    global: { plugins: [router, constants] }
  });
  await router.isReady();
  return result;
};

describe('TopNavDropdownItem', () => {

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
