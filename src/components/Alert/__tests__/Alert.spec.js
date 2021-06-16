import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import Alert from '../Alert.vue';

let slots;

const renderComponent = (options) => render(Alert, { ...options });

describe('Alert', () => {

  it('renders correctly', () => {
    const slotContent = 'Hello, this is an alert.';
    slots = { default: slotContent };
    const { queryByText } = renderComponent({ slots });

    const alertContent = queryByText(slotContent);
    expect(alertContent).toBeInTheDocument();
  });

});
