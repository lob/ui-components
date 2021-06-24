import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import FilterContent from '../FilterContent.vue';

const renderComponent = (options = {}) => render(FilterContent, { ...options });

describe('FilterContent', () => {

  it('does not render when open is false', () => {
    const props = { open: false };
    const { queryByTestId } = renderComponent({ props });

    const filterContent = queryByTestId('container');
    expect(filterContent).not.toBeInTheDocument();
  });

  it('does render when open is true', () => {
    const props = { open: true };
    const { queryByTestId } = renderComponent({ props });

    const filterContent = queryByTestId('container');
    expect(filterContent).toBeInTheDocument();
  });

  it('closes the filter content when clicking outside the component and bound elements', async () => {
    const props = { open: true };

    const { emitted } = renderComponent({ props });
    await fireEvent.click(document);

    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('update:open');

    expect(emittedEvent['update:open'][0][0]).toEqual(false);
  });

});
