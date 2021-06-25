import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import TableRow from '../TableRow.vue';

const renderComponent = (options = {}) => render(TableRow, { ...options });

describe('TableRow', () => {

  it('renders TableRow correctly', () => {
    const slotContent = 'Hello';
    const slots = { default: [slotContent] };

    const { queryByRole, queryByText } = renderComponent({ slots });

    const cell = queryByRole('cell');
    expect(cell).toBeInTheDocument();

    const slot = queryByText('Hello');
    expect(slot).toBeInTheDocument();
  });

});
