import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import { createRouter, createMemoryHistory } from 'vue-router';
import { constants } from '@/config';
import LobLink from '../Link.vue';

const initialProps = {
  to: '/settings'
};

const routes = [
  { path: '', component: { template: '<div></div>' } },
  { path: '/', component: { template: '<div>/</div>' } },
  { path: '/settings', name: 'Settings', component: { template: '<div>settings</div>' } }
];
const router = createRouter({
  history: createMemoryHistory(),
  routes
});

const renderComponent = async (options) => {
  const result = render(LobLink, {
    ...options,
    global: { plugins: [router, constants] }
  });
  await router.isReady();
  return result;
};

describe('Link', () => {

  it('renders correctly when an internal link with a string', async () => {
    const props = initialProps;
    const { queryByRole } = await renderComponent({ props });

    const link = queryByRole('link');
    expect(link).toBeInTheDocument();
  });

  it('renders correctly when an internal link with an object', async () => {
    const props = {
      ...initialProps,
      to: { name: 'Settings' }
    };
    const { queryByRole } = await renderComponent({ props });

    const link = queryByRole('link');
    expect(link).toBeInTheDocument();
  });

  it('renders correctly when an external link', async () => {
    const props = {
      ...initialProps,
      to: 'https://google.com'
    };
    const { queryByRole } = await renderComponent({ props });

    const link = queryByRole('link');
    expect(link).toBeInTheDocument();
  });

  it('renders correctly when disabled', async () => {
    const props = {
      ...initialProps,
      to: 'https://google.com',
      disabled: true
    };
    const { queryByRole } = await renderComponent({ props });

    const link = queryByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('aria-disabled', 'true');
  });

  it('adds rel="noopener noreferrer" when the target is _blank', async () => {
    const props = {
      ...initialProps,
      to: 'https://google.com',
      target: '_blank'
    };
    const { queryByRole } = await renderComponent({ props });

    const link = queryByRole('link');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders slot content correctly', async () => {
    const slotContent = 'Hello, this is a link.';
    const slots = { default: slotContent };
    const { queryByText } = await renderComponent({ slots });

    const linkContent = queryByText(slotContent);
    expect(linkContent).toBeInTheDocument();
  });

  it('renders underline text by default', async () => {
    const slotContent = 'Hello, this is a link.';
    const slots = { default: slotContent };
    const props = {
      ...initialProps
    };
    const { queryByText } = await renderComponent({ props, slots });

    const linkContent = queryByText(slotContent);
    expect(linkContent).toBeInTheDocument();
    expect(linkContent).toHaveClass('underline');
  });

  it('renders normal text if underline is set to false', async () => {
    const slotContent = 'Hello, this is a link.';
    const slots = { default: slotContent };
    const props = {
      ...initialProps,
      underline: false
    };
    const { queryByText } = await renderComponent({ props, slots });

    const linkContent = queryByText(slotContent);
    expect(linkContent).toBeInTheDocument();
    expect(linkContent).not.toHaveClass('underline');
  });

  it('renders the primary button style with warning color', async () => {
    const slotContent = 'This is a link that looks like a button';
    const slots = { default: slotContent };
    const props = {
      ...initialProps,
      variant: 'primary-button',
      warning: true
    };
    const { queryByText } = await renderComponent({ props, slots });

    const linkContent = queryByText(slotContent);
    expect(linkContent).toBeInTheDocument();
    expect(linkContent).toHaveClass('primary warning');
  });

});
