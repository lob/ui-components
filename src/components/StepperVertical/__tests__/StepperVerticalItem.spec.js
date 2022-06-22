import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import StepperVerticalItem from '../StepperVerticalItem.vue';

const initialProps = {
  step: { path: '/settings', displayName: 'Configure settings', pathName: 'Create Campaign Step One' },
  index: 0,
  active: true
};

const renderComponent = (options) => render(StepperVerticalItem, { ...options });

describe('StepperVerticalItem', () => {

  it('renders the step pathName', () => {
    const props = initialProps;
    const { getByText } = renderComponent({ props });

    const step = getByText(props.step.displayName);
    expect(step).toBeInTheDocument();
  });

  describe('active step', () => {

    it('has blue background', () => {
      const props = initialProps;
      const { getByText } = renderComponent({ props });

      const stepWrap = getByText(props.step.displayName).closest('div');
      expect(stepWrap).toHaveClass('bg-primary-500');
    });

  });

  describe('dark mode', () => {

    let props;
    let component;
    beforeEach(() => {
      props = initialProps;
      props.darkMode = true;
      component = renderComponent({ props });
    });

    it('active step has white background', () => {
      const { getByText } = component;

      const stepWrap = getByText(props.step.displayName).closest('div');
      expect(stepWrap).toHaveClass('bg-white');
    });

  });

});

