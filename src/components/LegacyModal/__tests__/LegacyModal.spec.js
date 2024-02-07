import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import LegacyModal from '../LegacyModal.vue';

const renderComponent = (options) => render(LegacyModal, { ...options });

const initialProps = {
  header: 'modal header',
  closeButtonAriaLabel: 'close this modal'
};

describe('LegacyModal', () => {
  it('is hidden by default', () => {
    const props = initialProps;
    const { queryByRole } = renderComponent({ props });

    const modal = queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();
  });

  describe('when visible (visible prop is true)', () => {
    let component;
    let props;
    beforeEach(() => {
      props = {
        ...initialProps,
        visible: true
      };
      component = renderComponent({ props });
    });

    it('the modal is visible', () => {
      const { queryByRole } = component;

      const modal = queryByRole('dialog');
      expect(modal).toBeVisible();
    });

    it('displays the header', () => {
      const { getByText } = component;

      const modalHeader = getByText(props.header);
      expect(modalHeader).toBeVisible();
    });
  });
});
