import '@testing-library/jest-dom';
import AdvancedSearchBar from '../AdvancedSearchBar.vue';
import { translate } from '@/mixins';
import { IconName } from '../../Icon';
import { RenderOptions, render, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

const mixins = [translate];

const initialProps = {
  searchFunction: (searchTerm: string) => {
    const allResults = [
      {
        title: 'Recipients',
        icon: IconName.USER,
        results: [
          {
            name: 'John Doe',
            description: 'A postcard to John Doe',
            type: 'postcard'
          },
          {
            name: 'Jane Doe',
            description: 'A postcard to Jane Doe',
            type: 'postcard'
          },
          {
            name: 'John Smith',
            description: 'soccer postcard',
            type: 'postcard'
          }
        ]
      },
      {
        title: 'Campaigns',
        icon: IconName.BULLHORN,
        results: [
          {
            name: 'Marketing Campaign for Texas',
            description: '5000 recipients'
          },
          {
            name: 'Marketing Campaign for California',
            description: '10000 recipients'
          }
        ]
      },
      {
        title: 'Templates',
        icon: IconName.CREATIVE,
        results: [
          {
            name: 'Template with John Doe',
            description: 'A template to create postcard for John Doe'
          },
          {
            name: 'Template with Jane Doe',
            description: 'A template to create postcard for Jane Doe'
          }
        ]
      }
    ];

    const results = allResults.map((result) => {
      return {
        title: result.title,
        icon: result.icon,
        results: result.results.filter(
          (eachResult) =>
            eachResult.description.includes(searchTerm) ||
            eachResult.name.includes(searchTerm)
        )
      };
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(results);
      }, 0);
    });
  }
};

// Helper function to render the component
const renderComponent = (options: RenderOptions) =>
  render(AdvancedSearchBar, { ...options, global: { mixins } });

describe('AdvancedSearchBar', () => {
  it('clears entered searchTerm when x button is clicked', async () => {
    const searchTerm = 'something';
    const props = {
      ...initialProps
    };

    const { getByLabelText, getByTestId } = renderComponent({ props });

    const input = getByLabelText('Search term') as HTMLInputElement;
    await userEvent.type(input, searchTerm);
    expect(input.value).toBe(searchTerm);

    const button = getByTestId('clearSearchButton') as HTMLElement;
    await userEvent.click(button);
    expect(input.value).toBe('');
  });

  it('does not show the clear button if there is no search term present', async () => {
    const props = {
      ...initialProps
    };

    const { queryByTestId } = renderComponent({ props });

    const button = queryByTestId('clearSearchButton');
    expect(button).toHaveClass('opacity-0');
    expect(button).toBeDisabled();
  });

  it('executes the search function when the user types', async () => {
    const searchTerm = 'soccer';
    const props = {
      ...initialProps,
      data: await initialProps.searchFunction(searchTerm),
      count: 1,
      footer: true
    };

    const { getByLabelText, getByText } = renderComponent({ props });

    const input = getByLabelText('Search term') as HTMLInputElement;
    await userEvent.type(input, searchTerm);
    expect(input.value).toBe(searchTerm);

    await waitFor(() => {
      expect(getByText('1 matching results')).toBeInTheDocument();
    });
  });

  it('hides the search results when the user clicks outside the search bar', async () => {
    const searchTerm = 'soccer';
    const props = {
      ...initialProps,
      data: await initialProps.searchFunction(searchTerm),
      count: 1
    };

    const { queryByRole, getByLabelText, getByText } = renderComponent({
      props
    });

    const input = getByLabelText('Search term') as HTMLInputElement;
    await userEvent.type(input, searchTerm);
    expect(input.value).toBe(searchTerm);

    let searchResults = queryByRole('results');
    await waitFor(() => {
      expect(getByText('1 matching results')).toBeInTheDocument();
    });
    await userEvent.click(document.body);
    searchResults = queryByRole('results');
    await waitFor(() => {
      expect(searchResults).not.toBeInTheDocument();
    });
  });

  it('does not clear the input when the user clicks outside the search bar', async () => {
    const searchTerm = 'soccer';
    const props = {
      ...initialProps,
      data: await initialProps.searchFunction(searchTerm),
      count: 1
    };

    const { getByLabelText, getByText } = renderComponent({ props });

    const input = getByLabelText('Search term') as HTMLInputElement;
    await userEvent.type(input, searchTerm);
    expect(input.value).toBe(searchTerm);

    await waitFor(() => {
      expect(getByText('1 matching results')).toBeInTheDocument();
    });
    await userEvent.click(document.body);
    expect(input.value).toBe(searchTerm);
  });
});
