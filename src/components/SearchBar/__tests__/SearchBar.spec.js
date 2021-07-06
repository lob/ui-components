import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import SearchBar from '../SearchBar.vue';

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
    jest.useFakeTimers();
    const searchTerm = 'baseball mail 1000';
    const props = {
      ...initialProps
    };

    const { queryByRole, container } = renderComponent({ props });

    const input = container.querySelector('#searchBar');
    await fireEvent.update(input, searchTerm);
    expect(input.value).toBe(searchTerm);

    // uses setTimeout to wait for debounce to actually execute the search query
    setTimeout(async () => {
      const searchResults = queryByRole('results');
      expect(searchResults).toBe('View all 1 results...');
    }, 1500);
    jest.runAllTimers();
  });


  it('hides the search results when the user clicks outside the search bar', async () => {
    const searchTerm = 'baseball mail 1000';
    const props = {
      ...initialProps
    };

    const { queryByRole, container } = renderComponent({ props });

    const input = container.querySelector('#searchBar');
    await fireEvent.update(input, searchTerm);
    expect(input.value).toBe(searchTerm);
    setTimeout(async () => {
      let searchResults = queryByRole('results');
      expect(searchResults).toBe('View all 2 results...');
      await fireEvent.click(container);
      searchResults = queryByRole('results');
      expect(searchResults).not.toBeInTheDocument();
    }, 1000);
  });

  it('does not clear the input when the user clicks outside the search bar', async () => {
    const searchTerm = 'baseball mail 1000';
    const props = {
      ...initialProps
    };

    const { queryByRole, container } = renderComponent({ props });

    const input = container.querySelector('#searchBar');
    await fireEvent.update(input, searchTerm);
    expect(input.value).toBe(searchTerm);
    setTimeout(async () => {
      const searchResults = queryByRole('results');
      expect(searchResults).toBe('View all 2 results...');
      await fireEvent.click(container);
      expect(input.value).toBe(searchTerm);
    }, 1000);
  });

});
