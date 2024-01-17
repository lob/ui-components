import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import TopNavButton from '../TopNavButton.vue';

const renderComponent = (options, configure = null) =>
  render(TopNavButton, { ...options }, configure);

describe('TopNavButton', () => {
  it('renders correctly', async () => {
    const slots = { default: 'sign out' };
    const { queryByText } = await renderComponent({ slots });

    const signOut = queryByText('sign out');
    expect(signOut).toBeInTheDocument();
  });
});
