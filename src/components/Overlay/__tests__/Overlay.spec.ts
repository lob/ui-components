import '@testing-library/jest-dom';
import Overlay from '../Overlay.vue';
import { RenderOptions, render } from '@testing-library/vue';
import { ref } from 'vue';
import Button from '@/components/Button/Button.vue';
import PrimeVue from 'primevue/config';

const TestComponent = {
  components: {
    Button,
    Overlay
  },
  setup: () => {
    const overlay = ref();
    return { overlay };
  },
  template: `
    <div>
      <Button @click="overlay?.toggle($event)">Toggle Button</Button>
      <Overlay v-bind="$props" ref="overlay" data-testid="uic-overlay" />
    </div>
  `
};

const renderComponent = (options: RenderOptions = {}) =>
  render(TestComponent, {
    global: {
      plugins: [PrimeVue]
    },
    ...options
  });

describe('Overlay', () => {
  it('toggles', async () => {
    const { findByTestId, getByText } = renderComponent();

    const button = getByText('Toggle Button');
    button.click();
    expect(await findByTestId('uic-overlay')).toBeVisible();
    button.click();
    expect(await findByTestId('uic-overlay')).not.toBeVisible();
  });
});
