import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import StepperItem from '../StepperItem.vue';

const renderComponent =  (options) => {
  const result = render(StepperItem, {
    ...options
  });
  return result;
};

describe('StepperItem', () => {

  it('renders as finished and middle step by default', async () => {
    const { container } = renderComponent({});

    const item = container.querySelector('.marker-finished');
    expect(item).toBeInTheDocument();

    const noItem = container.querySelector('.half-border');
    expect(noItem).not.toBeInTheDocument();
  });

  it('renders half a right border when it is the first item of the stepper', async () => {
    const props = {
      position: 'first'
    };
    const { container } = renderComponent({ props });

    const item = container.querySelector('.half-border-right');
    expect(item).toBeInTheDocument();
  });

  it('renders half a left border when it is the last item of the stepper', async () => {
    const props = {
      position: 'last'
    };
    const { container } = renderComponent({ props });

    const item = container.querySelector('.half-border-left');
    expect(item).toBeInTheDocument();
  });

  it('renders with error state when there is an error in the step', async () => {
    const props = {
      variant: 'error'
    };
    const { container } = renderComponent({ props });

    const item = container.querySelector('.border-error.marker-error');
    expect(item).toBeInTheDocument();
  });

  it('renders with unfinished state when the step is not finished', async () => {
    const props = {
      variant: 'unfinished'
    };
    const { container } = renderComponent({ props });

    const item = container.querySelector('.border-gray-100.marker-unfinished');
    expect(item).toBeInTheDocument();
  });

});
