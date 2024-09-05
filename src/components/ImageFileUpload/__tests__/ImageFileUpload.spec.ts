import '@testing-library/jest-dom';
import {
  RenderOptions,
  render,
  waitFor,
  fireEvent
} from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import ImageFileUpload from '../ImageFileUpload.vue';
import PrimeVue from 'primevue/config';
import { FileSelectedEvent } from '@/components/ImageFileUpload/ImageFileUpload.vue';

const initialProps = {
  name: 'img-file'
};

const renderComponent = (options: RenderOptions = {}) =>
  render(ImageFileUpload, {
    global: {
      plugins: [PrimeVue]
    },
    ...options
  });

describe('ImageFileUpload', () => {
  it('should render correctly', async () => {
    const { baseElement, getByTestId } = renderComponent({
      props: initialProps
    });

    // no accessibility selectors for choose button.  Screen readers will interact
    // with the input element directly.
    const chooseButton = getByTestId('img-upload-choose-btn');
    expect(chooseButton).toBeInTheDocument();
    expect(chooseButton).toBeVisible();
    // expect(baseElement).toMatchSnapshot();
  });

  it('should render the preview when a file is selected', async () => {
    const { container } = renderComponent({ props: initialProps });

    const fileInput = container.querySelector('input[type="file"]');

    expect(fileInput).toBeInTheDocument();

    const file = new File(['(⌐□_□)'], 'chucknorris.png', {
      type: 'image/png'
    });

    userEvent.upload(fileInput as HTMLElement, file);

    await waitFor(() => {
      const previewImg = container.querySelector('img');

      expect(previewImg).toBeInTheDocument();
      expect(previewImg).toHaveAttribute(
        'src',
        expect.stringMatching('^blob:')
      );
    });
  });

  it('should return to empty state after clicking the cancel button', async () => {
    const { container, getByRole, getByTestId } = renderComponent({
      props: initialProps
    });

    const fileInput = container.querySelector('input[type="file"]');

    expect(fileInput).toBeInTheDocument();

    const file = new File(['(⌐□_□)'], 'chucknorris.png', {
      type: 'image/png'
    });

    userEvent.upload(fileInput as HTMLElement, file);

    await waitFor(() => {
      const previewImg = container.querySelector('img');

      expect(previewImg).toBeInTheDocument();
      expect(previewImg).toHaveAttribute(
        'src',
        expect.stringMatching('^blob:')
      );
    });

    const cancelButton = getByRole('button', { name: 'Cancel' });

    expect(cancelButton).toBeInTheDocument();

    userEvent.click(cancelButton);

    await waitFor(() => {
      const previewImg = container.querySelector('img');
      expect(previewImg).not.toBeInTheDocument();
    });

    await waitFor(() => {
      const chooseButton = getByTestId('img-upload-choose-btn');
      expect(chooseButton).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(fileInput).toHaveValue('');
    });
  });

  it('should render the image preview when a file is dropped on the dropzone', async () => {
    const { container, getByTestId } = renderComponent({ props: initialProps });

    const dropzone = getByTestId('img-upload-dropzone');

    expect(dropzone).toBeInTheDocument();

    const file = new File(['(⌐□_□)'], 'chucknorris.png', {
      type: 'image/png'
    });

    await fireEvent.drop(dropzone as HTMLElement, {
      dataTransfer: {
        files: [file]
      }
    });

    await waitFor(() => {
      const previewImg = container.querySelector('img');

      expect(previewImg).toBeInTheDocument();
      expect(previewImg).toHaveAttribute(
        'src',
        expect.stringMatching('^blob:')
      );
    });
  });

  it('should display an error when the file size exceeds the maxFileSize prop', async () => {
    const { baseElement, getByRole, container, emitted } = renderComponent({
      props: { ...initialProps, maxFileSize: 1 }
    });

    const fileInput = container.querySelector('input[type="file"]');

    expect(fileInput).toBeInTheDocument();

    const file = new File(['(⌐□_□)'], 'chucknorris.png', {
      type: 'image/png'
    });

    userEvent.upload(fileInput as HTMLElement, file);

    await waitFor(() => {
      const error = getByRole('alert');
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent(
        'Invalid file size, file size should be smaller than 1 B'
      );
      expect(emitted()).toHaveProperty('fileSelected');
      const [fileSelectedEvent] = emitted().fileSelected as [FileSelectedEvent];
      expect(fileSelectedEvent.file).toBeUndefined();
      // expect(baseElement).toMatchSnapshot();
    });
  });

  it('should emit the fileSelected event when a file is selected', async () => {
    const { container, emitted } = renderComponent({ props: initialProps });

    const fileInput = container.querySelector('input[type="file"]');

    expect(fileInput).toBeInTheDocument();

    const file = new File(['(⌐□_□)'], 'chucknorris.png', {
      type: 'image/png'
    });

    userEvent.upload(fileInput as HTMLElement, file);

    await waitFor(() => {
      expect(emitted()).toHaveProperty('fileSelected');
      const [fileSelectedEvent] = emitted().fileSelected[0] as [
        FileSelectedEvent
      ];

      expect(fileSelectedEvent.file).toBeInstanceOf(File);
      expect(fileSelectedEvent.file?.name).toBe('chucknorris.png');
      expect(fileSelectedEvent.originalEvent).toBeInstanceOf(Event);
    });
  });
});
