import '@testing-library/jest-dom';
import Menu from '../Menu.vue';
import { RenderOptions, render } from '@testing-library/vue';
import { ref } from 'vue';
import PrimeVue from 'primevue/config';
import { createRouter, createWebHistory } from 'vue-router';

const TestComponent = {
  components: {
    Menu
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  setup: () => {
    const menu = ref();
    return { menu };
  },
  template: `
    <div>
      <button @click="menu?.toggle($event)">Toggle Button</button>
      <Menu
        v-bind="$props"
        ref="menu"
        data-testid="uic-menu"
      />
    </div>
  `
};

const renderComponent = (options: RenderOptions = {}) =>
  render(TestComponent, {
    global: {
      plugins: [
        createRouter({
          routes: [
            { path: '/', component: {} },
            { path: '/internal', component: {} }
          ],
          history: createWebHistory()
        }),
        PrimeVue
      ]
    },
    props: {
      items: [
        {
          label: 'Item Button',
          key: 'test1'
        }
      ]
    },
    ...options
  });

describe('Menu', () => {
  it('toggles', async () => {
    const { findByTestId, getByText } = renderComponent();

    const button = getByText('Toggle Button');
    button.click();
    expect(await findByTestId('uic-menu')).toBeVisible();
    button.click();
    expect(await findByTestId('uic-menu')).not.toBeVisible();
  });

  it('handles item clicks', async () => {
    const clickSpy = vi.fn();
    const { findByTestId, getByText } = renderComponent({
      props: {
        items: [
          {
            label: 'Item Button',
            key: 'test1',
            clickHandler: clickSpy
          }
        ]
      }
    });

    getByText('Toggle Button').click();
    expect(await findByTestId('uic-menu')).toBeVisible();
    getByText('Item Button').click();
    expect(clickSpy).toHaveBeenCalledOnce();
    getByText('Item Button').click();
    expect(clickSpy).toHaveBeenCalledTimes(2);
  });

  it('renders external links', async () => {
    const { findByTestId, getByRole, getByText } = renderComponent({
      props: {
        items: [
          {
            label: 'Item Button',
            key: 'test1',
            to: 'https://google.com',
            target: '_blank'
          }
        ]
      }
    });

    getByText('Toggle Button').click();
    expect(await findByTestId('uic-menu')).toBeVisible();
    const link = getByRole('link');
    expect(link).toHaveAttribute('href', 'https://google.com');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders internal links', async () => {
    const { findByTestId, getByRole, getByText } = renderComponent({
      props: {
        items: [
          {
            label: 'Item Link',
            key: 'test1',
            to: '/internal'
          }
        ]
      }
    });

    getByText('Toggle Button').click();
    expect(await findByTestId('uic-menu')).toBeVisible();
    const link = getByRole('link');
    expect(link).toHaveAttribute('href', '/internal');
  });
});
