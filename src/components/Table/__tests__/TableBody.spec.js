import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import TableBody from '../TableBody.vue';

const renderComponent = (options = {}) => render(TableBody, { ...options });

describe('TableBody', () => {

  it('renders TableBody correctly', () => {
    const slotContent = 'Hello';
    const slots = { default: [slotContent] };

    const { queryByRole, queryByText } = renderComponent({ slots });

    const tbody = queryByRole('rowgroup');
    expect(tbody).toBeInTheDocument();

    const slot = queryByText('Hello');
    expect(slot).toBeInTheDocument();
  });

});
