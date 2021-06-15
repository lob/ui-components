import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import Stepper from '../Stepper.vue';

const initialProps = {
};

const renderComponent = (options, configure = null) => render(Stepper, { ...options }, configure);

describe('Stepper', () => {

  it('renders', () => {
    const wrapper = render(Stepper)
    expect(wrapper).toContain('<div></div>')
  });

});
