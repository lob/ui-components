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

    const { queryByRole } = renderComponent({ props });

    const button = queryByRole('button');
    expect(button).toBeDisabled();
  });

  it('removes entered search query when x button is clicked', async () => {
    const props = {
      ...initialProps
    };

    const searchTerm = 'something';
    const data = {
      searchTerm
    }

    const { queryByRole, queryByText } = renderComponent({ props, ...data });

    const input = queryByText(searchTerm)
    expect(input).toContain(searchTerm)

    const button = queryByRole('button');
    await fireEvent.click(button);
    expect(SearchBar).toBeInTheDocument();
  });

});
