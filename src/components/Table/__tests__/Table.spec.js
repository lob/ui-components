import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import Table from '../Table.vue';

const renderComponent = (options = {}) => render(Table, { ...options });

describe('Table', () => {

  it('renders Table correctly', () => {
    const slotContent = 'Hello';
    const slots = { default: [slotContent] };

    const { queryByRole, queryByText } = renderComponent({ slots });

    const table = queryByRole('table');
    expect(table).toBeInTheDocument();

    const slot = queryByText('Hello');
    expect(slot).toBeInTheDocument();
  });

});
