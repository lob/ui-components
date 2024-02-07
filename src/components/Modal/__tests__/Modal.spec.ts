import '@testing-library/jest-dom';
import { RenderOptions, render } from '@testing-library/vue';
import Modal from '../Modal.vue';
import { ExtractPropTypes } from 'vue';
import PrimeVue from 'primevue/config';

const renderComponent = (options: RenderOptions = {}) =>
  render(Modal, {
    global: {
      plugins: [PrimeVue]
    },
    ...options
  });

const initialProps: ExtractPropTypes<typeof Modal> = {
  visible: true
};

describe('Modal', () => {
  let props: ExtractPropTypes<typeof Modal> = { ...initialProps };

  beforeEach(() => {
    props = { ...initialProps };
  });

  it('renders when visible', async () => {
    props.visible = true;
    const { findByTestId } = renderComponent({ props });
    expect(await findByTestId('uic-modal')).toBeVisible();
  });

  it('does not render when !visible', () => {
    props.visible = false;
    const { queryByTestId } = renderComponent({ props });
    expect(queryByTestId('uic-modal')).toBeFalsy();
  });

  it('displays the header', async () => {
    props.header = 'Test Header';
    props.visible = true;
    const { findByText } = renderComponent({ props });
    expect(await findByText(props.header)).toBeVisible();
  });

  it('displays the subheader', async () => {
    props.subheader = 'Test Subheader';
    props.visible = true;
    const { findByText } = renderComponent({ props });
    expect(await findByText(props.subheader)).toBeVisible();
  });
});
