import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import TopNavBar from '../TopNavBar.vue';

const initialProps = {
};

describe('TopNavBar', () => {

  // WIP. TODO.
  it('renders logged in user menu', () => {
    const props = initialProps;
    const { getByLabelText } = render(TopNavBar, {
      props
    });
    expect(1).not.toBeChecked(1);
  });

});
