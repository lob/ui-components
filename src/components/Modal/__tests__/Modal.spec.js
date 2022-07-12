import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import Modal from '../Modal.vue';

const renderComponent = (options) => render(Modal, { ...options });

describe('Modal', () => {

  it('is hidden by default', () => {
    const slots = { header: 'modal header' };
    const { queryByRole } = renderComponent({ slots });

    const modal = queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();
  });

  it('is visible when its visible prop is true', () => {
    const props = {
      visible: true
    };
    const slots = { header: 'modal header' };
    const { queryByRole } = renderComponent({ slots, props });

    const modal = queryByRole('dialog');
    expect(modal).toBeInTheDocument();
  });

});
