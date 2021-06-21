import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import SearchBar from '../SearchBar.vue';

const initialProps = {
  modelValue: false,
  name: 'Test name',
  label: 'Test',
  error: false,
  disabled: false
};

const renderComponent = (options) => render(SearchBar, { ...options });

describe('SearchBar', () => {

  it('renders correctly', () => {
    const props = {
      ...initialProps,
      disabled: true
    };

    const { queryByText, queryByLabelText } = renderComponent({ props });

    const label = queryByText(props.label);
    expect(label).toBeInTheDocument();
    const SearchBar = queryByLabelText(props.label);
    expect(SearchBar).toBeInTheDocument();
  });


});
