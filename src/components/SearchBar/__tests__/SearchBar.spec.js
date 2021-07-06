import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import SearchBar from '../SearchBar.vue';

const initialProps = {
  searchFunction: () => null
};

const renderComponent = (options) => render(SearchBar, { ...options });

describe('SearchBar', () => {

  it('has the x button disabled when no text was entered', () => {
    const props = {
      ...initialProps
    };

    const { queryByTestId } = renderComponent({ props });

    const button = queryByTestId('clearSearchButton');
    expect(button).toBeDisabled();
  });

  it('clears entered searchTerm when x button is clicked', async () => {
    const searchTerm = 'something';
    const props = {
      ...initialProps
    };

    const { queryByTestId, container } = renderComponent({ props });

    const input = container.querySelector('#searchBar');
    await fireEvent.update(input, searchTerm);
    expect(input.value).toBe(searchTerm);

    const button = queryByTestId('clearSearchButton');
    await fireEvent.click(button);
    expect(input.value).toBe('');
  });

  it('executes the search function when the user types', async () => {
    const searchTerm = 'baseball mail 1000';
    const props = {
      ...initialProps
    };

    const { queryByRole, container } = renderComponent({ props });

    const input = container.querySelector('#searchBar');
    await fireEvent.update(input, searchTerm);
    expect(input.value).toBe(searchTerm);

    setTimeout(() => {
      const searchResults = queryByRole('results');
      expect(searchResults).toBe('View all 2 results...');
    }, 1000);
  });

});
