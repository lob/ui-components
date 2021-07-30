import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import Modal from '../Modal.vue';

const renderComponent = (options) => render(Modal, { ...options });

describe('Modal', () => {

  it('is hidden by default', () => {
    const { queryByRole } = renderComponent();

    const modal = queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();

  });

  it('is visible when its visible prop is true', () => {
    const props = {
      visible: true
    };

    const { queryByRole } = renderComponent({ props });

    const modal = queryByRole('dialog');
    expect(modal).toBeInTheDocument();

  });

});
