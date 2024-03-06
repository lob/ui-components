import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import FloatingActionButton from '../FloatingActionButton.vue';

let props;

const renderComponent = (options) =>
  render(FloatingActionButton, { ...options });

describe('FloatingActionButton', () => {
  it('renders correctly', () => {
    const labelTextContent = 'Hello, this is a FloatingActionButton.';
    const buttonTextContent = 'Click here!';
    props = {
      labelText: labelTextContent,
      buttonText: buttonTextContent
    };
    const { queryByText } = renderComponent({ props });

    const label = queryByText(labelTextContent);
    const button = queryByText(buttonTextContent);
    expect(label).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  describe('the button', () => {
    it('emits a click event when clicked', async () => {
      const { queryByRole, emitted } = renderComponent({ props });
      const button = queryByRole('button');
      await userEvent.click(button);
      expect(emitted()).toHaveProperty('click');
    });
  });
});
