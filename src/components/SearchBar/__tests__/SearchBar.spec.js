import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/vue';
import SearchBar from '../SearchBar.vue';
import { translate } from '@/mixins';

const mixins = [translate];

const initialProps = {
  searchFunction: (searchTerm) => {
    const allPostCards = [
      {
        img: '',
        description: 'campaign ad',
        type: 'postcard'
      },
      {
        img: '',
        description: 'soccer postcard',
        type: 'postcard'
      },
      {
        img: '',
        description: 'baseball mail',
        type: 'postcard'
      },
      {
        img: '',
        description: 'basketball email',
        type: 'postcard'
      }
    ];
    const results = allPostCards.filter((postCard) => postCard.description.includes(searchTerm));
    return new Promise((resolve) => {
      resolve(results);
    });
  }
};

afterEach(() => {
  vi.useRealTimers();
});

const renderComponent = (options) => render(SearchBar, { ...options, global: { mixins } });

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
    const searchTerm = 'baseball';
    const props = {
      ...initialProps
    };

    const { container, getByText } = renderComponent({ props });

    const input = container.querySelector('#searchBar');
    await fireEvent.update(input, searchTerm);
    expect(input.value).toBe(searchTerm);

    await waitFor(() => {
      expect(getByText('View all 1 results...')).toBeInTheDocument();
    });
  });

  it('hides the search results when the user clicks outside the search bar', async () => {
    const searchTerm = 'baseball';
    const props = {
      ...initialProps
    };

    const { queryByRole, container, getByText } = renderComponent({ props });

    const input = container.querySelector('#searchBar');
    await fireEvent.update(input, searchTerm);
    expect(input.value).toBe(searchTerm);

    let searchResults = queryByRole('results');
    await waitFor(() => {
      expect(getByText('View all 1 results...')).toBeInTheDocument();
    });
    await fireEvent.click(container);
    searchResults = queryByRole('results');
    await waitFor(() => {
      expect(searchResults).not.toBeInTheDocument();
    });
  });

  it('does not clear the input when the user clicks outside the search bar', async () => {
    const searchTerm = 'baseball';
    const props = {
      ...initialProps
    };

    const { container, getByText } = renderComponent({ props });

    const input = container.querySelector('#searchBar');
    await fireEvent.update(input, searchTerm);
    expect(input.value).toBe(searchTerm);

    await waitFor(() => {
      expect(getByText('View all 1 results...')).toBeInTheDocument();
    });
    await fireEvent.click(container);
    expect(input.value).toBe(searchTerm);
  });

});
