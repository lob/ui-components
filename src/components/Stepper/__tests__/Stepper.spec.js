import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import Stepper from '../Stepper.vue';

let slots;

const renderComponent = (options) => render(Stepper, { ...options });

describe('Stepper', () => {
  it('renders correctly', () => {
    const slotContent = 'Stepper stuff';
    slots = { default: slotContent };
    const { queryByText } = renderComponent({ slots });

    const stepperContent = queryByText(slotContent);
    expect(stepperContent).toBeInTheDocument();
  });
});
