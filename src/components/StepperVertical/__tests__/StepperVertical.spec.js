import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import StepperVertical from '../StepperVertical.vue';

const initialProps = {
  steps: [
    { path: '/settings', pathName: 'Choose campaign settings' },
    { path: '/audience', pathName: 'Add target audience' },
    { path: '/creative', pathName: 'Compose creative' },
    { path: '/finalize', pathName: 'Finalize campaign' }
  ] };

const renderComponent = (options) => render(StepperVertical, { ...options });

describe('StepperVertical', () => {

  it('renders the steps pathNames', () => {
    const props = initialProps;
    const { getByText } = renderComponent({ props });

    const step1 = getByText(props.steps[0].pathName);
    const step2 = getByText(props.steps[1].pathName);
    const step3 = getByText(props.steps[2].pathName);
    const step4 = getByText(props.steps[3].pathName);
    expect(step1).toBeInTheDocument();
    expect(step2).toBeInTheDocument();
    expect(step3).toBeInTheDocument();
    expect(step4).toBeInTheDocument();
  });

  it('the first step is active by default', () => {
    const props = initialProps;
    const { getByText } = renderComponent({ props });

    const step1 = getByText(props.steps[0].pathName).closest('div');
    expect(step1).toHaveClass('bg-primary-500');
  });

  describe('activeStep passed by prop', () => {

    const props = {
      ...initialProps,
      activeStep: initialProps.steps[2]
    };

    it('the currentStep is active', () => {
      const { getByText } = renderComponent({ props });

      const step3 = getByText(props.steps[2].pathName).closest('div');
      expect(step3).toHaveClass('bg-primary-500');
    });

  });

  describe('clicking on a step', () => {

    let component;
    let props;
    let step2;
    beforeEach(() => {
      props = initialProps;
      component = renderComponent({ props });
      const { getByText } = component;
      step2 = getByText(props.steps[1].pathName).closest('div');
      fireEvent.click(step2);
    });

    it('emits the step', () => {
      const { emitted } = component;

      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('stepChange');
      expect(emittedEvent.stepChange[0]).toEqual([props.steps[1]]);
    });

    it('the step clicked-on becomes active', () => {
      expect(step2).toHaveClass('bg-primary-500');
    });

  });

});

