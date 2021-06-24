import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import Modal from '../Modal.vue';

const initialProps = {
};

const renderComponent = (options) => render(Modal, { ...options });

describe('Modal', () => {

  it('is hidden by default', () => {
    const props = {
      ...initialProps
    };

    const { queryByRole } = renderComponent({ props });

    const modal = queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();

  });

  it('is visible when its v-model is true', () => {
    const props = {
      ...initialProps,
      modelValue: true
    };

    const { queryByRole } = renderComponent({ props });

    const modal = queryByRole('dialog');
    expect(modal).toBeInTheDocument();

  });

});
