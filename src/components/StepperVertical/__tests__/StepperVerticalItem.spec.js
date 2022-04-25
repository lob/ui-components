import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import StepperVerticalItem from '../StepperVerticalItem.vue';

const initialProps = {
  step: { path: '/settings', pathName: 'Choose campaign settings' },
  index: 0,
  active: true
};

const renderComponent = (options) => render(StepperVerticalItem, { ...options });

describe('StepperVerticalItem', () => {

  it('renders the step pathName', () => {
    const props = initialProps;
    const { getByText } = renderComponent({ props });

    const step = getByText(props.step.pathName);
    expect(step).toBeInTheDocument();
  });

  it('the active step has blue background', () => {
    const props = initialProps;
    const { getByText } = renderComponent({ props });

    const stepWrap = getByText(props.step.pathName).closest('div');
    expect(stepWrap).toHaveClass('bg-primary-500');
  });

  describe('dark mode', () => {

    let props;
    let component;
    beforeEach(() => {
      props = initialProps;
      props.darkMode = true;
      component = renderComponent({ props });
    });

    it('the active step has white background', () => {
      const { getByText } = component;

      const stepWrap = getByText(props.step.pathName).closest('div');
      expect(stepWrap).toHaveClass('bg-white');
    });

  });

});

