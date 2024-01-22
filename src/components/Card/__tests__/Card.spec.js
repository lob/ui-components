import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import Card from '../Card.vue';

let slots;

const renderComponent = (options) => render(Card, { ...options });

describe('Card', () => {
  it('renders correctly', () => {
    const slotContent = 'Hello, this is a card.';
    slots = { default: slotContent };
    const { queryByText } = renderComponent({ slots });

    const alertContent = queryByText(slotContent);
    expect(alertContent).toBeInTheDocument();
  });
});
