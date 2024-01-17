import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import ConfirmRemoveFileModal from '../ConfirmRemoveFileModal.vue';
import { translate } from '@/mixins';

const mixins = [translate];

const initialProps = {
  visible: true,
  title: 'Are you sure?',
  subtext: 'You are about to delete your file.',
  confirmButtonText: 'Do it!'
};

const renderComponent = (options) =>
  render(ConfirmRemoveFileModal, { ...options, global: { mixins } });

describe('ConfirmRemoveFileModal', () => {
  const props = { ...initialProps };

  it('displays the correct text', () => {
    const { getByText } = renderComponent({ props });
    const titleText = getByText(props.title);
    const subtext = getByText(props.subtext);
    expect(titleText).toBeInTheDocument();
    expect(subtext).toBeInTheDocument();
  });

  it('emits the close event when go back button is clicked', async () => {
    const { getByRole, emitted } = renderComponent({ props });
    const goBackButton = getByRole('button', { name: 'Go Back' });
    await userEvent.click(goBackButton);
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('close');
  });

  it('emits the confirmClicked and close events when the confirm button is clicked', async () => {
    const { getByRole, emitted } = renderComponent({ props });
    const confirmButton = getByRole('button', {
      name: props.confirmButtonText
    });
    await userEvent.click(confirmButton);
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('confirmClicked');
    expect(emittedEvent).toHaveProperty('close');
  });
});
