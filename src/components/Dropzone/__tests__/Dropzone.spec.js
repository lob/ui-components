import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/vue';
import Dropzone from '../Dropzone.vue';
import { translate } from '@/mixins';

const mixins = [translate];

const textContentObject = {
  yourFile: 'Your file',
  or: 'or',
  uploadFileButtonText: 'Upload file',
  removeFileButtonText: 'Remove file',
  acceptedFormatIs: 'The only accepted file format is',
  acceptedFormatsAre: 'The accepted file format types are',
  maxFileSizeIs: 'Max file size is',
  downloadSampleFile: 'Download a sample file?',
  couldNotUpload: 'Could not upload',
  looksGreat: 'Looks great!',
  uploading: 'Uploading',
  canOnlySelectOneFile: 'You can only select 1 file.',
  fileFor: 'Audience',
  fileIsTooLarge: 'exceeds file size limit of',
  fileTypeNotValid: 'File is not a valid file type.',
  dragAndDropHere: 'Drag and drop files here',
  mightTakeAMinute: 'This might take a minute.',
  defaultErrorText: 'Something went wrong. Please try again.',
  errorMessage: '',
  successMessage: ' was successfully uploaded.'
};

const initialProps = {
  inputId: 'dropzone-story',
  textContent: textContentObject,
  acceptType: '.csv',
  maxSizeInBytes: 1048576
};

const renderComponent = (options) =>
  render(Dropzone, { ...options, global: { mixins } });

describe('Dropzone', () => {
  describe('default step', () => {
    let props;
    let component;
    beforeEach(() => {
      props = initialProps;
      component = renderComponent({ props });
    });

    it('renders', () => {
      const { queryByRole } = component;

      const uploadForm = queryByRole('form');
      expect(uploadForm).toBeInTheDocument();
    });

    it('displays the actionText', () => {
      const { getByText } = component;

      const displayText = getByText(textContentObject.dragAndDropHere);
      expect(displayText).toBeInTheDocument();
    });

    it('displays the Upload button', () => {
      const { getByRole } = component;

      const uploadButton = getByRole('button', {
        name: textContentObject.uploadFileButtonText
      });
      expect(uploadButton).toBeInTheDocument();
    });

    it('shows the dropzone with blueish background & border', () => {
      const { getByRole } = component;

      const dropzoneForm = getByRole('form');
      expect(dropzoneForm).toHaveClass(
        'border border-dashed border-turquoise-500 bg-white-300'
      );
    });
  });

  describe('file type and size information', () => {
    it('displays the max size and file types accepted if showTypeAdMaxSize true', () => {
      const props = {
        ...initialProps,
        acceptType: '.csv',
        maxSizeInBytes: 1048576
      };

      const { getByText } = renderComponent({ props });
      const typeInfoText = getByText(/The only accepted file format is/i);
      expect(typeInfoText).toBeInTheDocument();
      const csv = getByText(/CSV/i);
      expect(csv).toBeInTheDocument();
      const sizeInfoText = getByText(/Max file size is/i);
      expect(sizeInfoText).toBeInTheDocument();
      const oneMB = getByText(/1MB/i);
      expect(oneMB).toBeInTheDocument();
    });

    it('does not display size/type info if showTypeAdMaxSize false', () => {
      const props = {
        ...initialProps,
        acceptType: '.csv',
        maxSizeInBytes: 1048576,
        showTypeAndMaxSize: false
      };

      const { queryByText } = renderComponent({ props });
      const typeInfoText = queryByText(/The only accepted file format is/i);
      expect(typeInfoText).not.toBeInTheDocument();
      const sizeInfoText = queryByText(/Max file size is/i);
      expect(sizeInfoText).not.toBeInTheDocument();
    });
  });

  describe('if the file status is not null', () => {
    it('the dropzone shows the correct status', () => {
      const props = {
        ...initialProps,
        status: 'success',
        file: { name: 'audience.csv', type: 'csv' }
      };

      const { getByText } = renderComponent({ props });
      const success = getByText(/was successfully uploaded/i);
      expect(success).toBeInTheDocument();
    });
  });

  describe('when file is selected / uploading step', () => {
    let component;
    let props;
    beforeEach(() => {
      props = initialProps;
      component = renderComponent({ props });
      const { getByRole } = component;

      const uploadButton = getByRole('button', { name: /Upload file/i });
      expect(uploadButton).toBeInTheDocument();

      const file = new File(['testCsvFile'], 'testCsvFile.csv', {
        type: 'text/csv',
        size: '1MB'
      });
      userEvent.upload(uploadButton, file);
    });

    it('shows the "Uploading {filename}" status', async () => {
      const { findByText } = component;

      const uploading = await findByText(/Uploading/i);
      expect(uploading).toBeInTheDocument();
    });

    it('shows the ProgressBar', async () => {
      const { findByRole } = component;

      const progressbar = await findByRole('progressbar');
      expect(progressbar).toBeInTheDocument();
    });
  });

  describe('error status', () => {
    let props;
    beforeEach(() => {
      props = initialProps;
    });

    it('shows the dropzone with pinkish background & border', async () => {
      const { rerender, getByRole } = renderComponent({ props });
      await rerender({ status: 'error' });

      const dropzoneForm = getByRole('form');
      expect(dropzoneForm).toHaveClass(
        'border border-dashed border-coral-700 bg-coral-100'
      );
    });

    describe('with no errorMessage', () => {
      it('displays the defaultErrorText', async () => {
        const { rerender, getByText } = renderComponent({ props });
        await rerender({ status: 'error', errorMessage: null });

        const errorText = getByText(textContentObject.defaultErrorText);
        expect(errorText).toBeInTheDocument();
      });
    });

    describe('with errorMessage', () => {
      it('displays the errorMessage passed by the prop', async () => {
        const { rerender, getByText } = renderComponent({ props });
        await rerender({
          ...props,
          status: 'error',
          textContent: { ...textContentObject, errorMessage: 'oh no' }
        });

        const errorText = getByText(/oh no/i);
        expect(errorText).toBeInTheDocument();
      });
    });
  });

  describe('success status', () => {
    it('displays the success text', async () => {
      const props = initialProps;
      const { rerender, getByText } = renderComponent({ props });
      await rerender({ status: 'success' });

      const looksGreat = getByText(/looks great/i);
      expect(looksGreat).toBeInTheDocument();

      const successText = getByText(/was successfully uploaded/i);
      expect(successText).toBeInTheDocument();

      const removeFile = getByText(textContentObject.removeFileButtonText);
      expect(removeFile).toBeInTheDocument();
    });

    it('clicking the remove button returns the uploader to the default state', async () => {
      const props = initialProps;
      const { rerender, getByText, findByText, emitted } = renderComponent({
        props
      });
      await rerender({ status: 'success' });

      const removeFile = getByText(textContentObject.removeFileButtonText);
      userEvent.click(removeFile);

      const displayText = await findByText(textContentObject.dragAndDropHere);
      expect(displayText).toBeInTheDocument();
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('remove');
    });

    describe('when the confirmRemoveModal props is true', () => {
      const props = {
        ...initialProps,
        confirmRemoveFile: true,
        confirmModalTitle: 'Are you sure?',
        confirmModalSubtext: 'You are about to delete your file',
        confirmModalConfirmBtnText: 'Do it!'
      };

      it('launches the confirm remove modal before removing the file', async () => {
        const { rerender, getByText, getByRole, findByText, emitted } =
          renderComponent({ props });
        await rerender({ status: 'success' });

        const removeFile = getByText(textContentObject.removeFileButtonText);
        await userEvent.click(removeFile);

        const modalTitle = getByText('Are you sure?');
        expect(modalTitle).toBeVisible();

        const modalSubtext = getByText('You are about to delete your file');
        expect(modalSubtext).toBeVisible();

        const confirmButton = getByRole('button', { name: 'Do it!' });
        await userEvent.click(confirmButton);

        const displayText = await findByText(textContentObject.dragAndDropHere);
        expect(displayText).toBeVisible();
        const emittedEvent = emitted();
        expect(emittedEvent).toHaveProperty('remove');
      });
    });
  });

  describe('dropping: internal checks for file size & type', () => {
    let props;
    beforeEach(() => {
      props = initialProps;
    });

    it('does not allow a larger file to be selected', async () => {
      const { getByTestId, findByText } = renderComponent({ props });
      const fileDropzone = getByTestId('drop-area');
      const file = new File(['testCsvFile'], 'testCsvFile.csv', {
        type: 'text/csv'
      });
      Object.defineProperty(file, 'size', { value: 12345678 });
      fireEvent.drop(fileDropzone, {
        dataTransfer: {
          files: [file]
        }
      });

      const tooLarge = await findByText(
        'Audience exceeds file size limit of 1MB'
      );
      expect(tooLarge).toBeInTheDocument();
    });

    it('does not allow a not-accepted file type to be dropped', async () => {
      const { getByTestId, findByText } = renderComponent({ props });

      const fileDropzone = getByTestId('drop-area');
      fireEvent.drop(fileDropzone, {
        dataTransfer: {
          files: [
            new File(['testImgFile'], 'testImgFile.jpg', { type: 'image/jpg' })
          ]
        }
      });

      const notAcceptedType = await findByText(
        /File is not a valid file type./i
      );
      expect(notAcceptedType).toBeInTheDocument();
    });

    it('does not allow multiple files type to be dropped', async () => {
      const { getByTestId, findByText } = renderComponent({ props });

      const fileDropzone = getByTestId('drop-area');
      const file1 = new File(['testCsvFile'], 'testCsvFile.csv', {
        type: 'text/csv'
      });
      const file2 = new File(['testCsvFile2'], 'testCsvFile2.csv', {
        type: 'text/csv'
      });
      fireEvent.drop(fileDropzone, {
        dataTransfer: {
          files: [file1, file2]
        }
      });

      const only1file = await findByText(/You can only select 1 file/i);
      expect(only1file).toBeInTheDocument();
    });

    it('allows a file of the right type & size to be dropped & emits the file', async () => {
      const { getByTestId, getByText, rerender, emitted } = renderComponent({
        props
      });

      const fileDropzone = getByTestId('drop-area');
      const file = new File(['testCsvFile'], 'testCsvFile.csv', {
        type: 'text/csv'
      });
      fireEvent.drop(fileDropzone, {
        dataTransfer: {
          files: [file]
        }
      });
      await rerender({ status: 'success' });

      const fileName = getByText(/testCsvFile.csv/i);
      const success = getByText(/was successfully uploaded/i);
      expect(fileName).toBeInTheDocument();
      expect(success).toBeInTheDocument();

      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('select');
      expect(emittedEvent.select[0][0]).toEqual(file);
    });

    it('allows a file of undefined type to be dropped & emits the file', async () => {
      const { getByTestId, getByText, rerender, emitted } = renderComponent({
        props
      });

      const fileDropzone = getByTestId('drop-area');
      const file = new File(['testCsvFile'], 'testCsvFile.csv', {
        type: undefined
      });
      fireEvent.drop(fileDropzone, {
        dataTransfer: {
          files: [file]
        }
      });
      await rerender({ status: 'success' });

      const fileName = getByText(/testCsvFile.csv/i);
      const success = getByText(/was successfully uploaded/i);
      expect(fileName).toBeInTheDocument();
      expect(success).toBeInTheDocument();

      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('select');
      expect(emittedEvent.select[0][0]).toEqual(file);
    });

    it('does not allow dropping a file if another file is selected (dropping is disabled)', async () => {
      const { getByTestId, getByText, rerender } = renderComponent({ props });
      const fileDropzone = getByTestId('drop-area');
      const file = new File(['testCsvFile'], 'testCsvFile.csv', {
        type: 'text/csv'
      });
      fireEvent.drop(fileDropzone, {
        dataTransfer: {
          files: [file]
        }
      });
      await rerender({ status: 'success' });

      const fileName = getByText(/testCsvFile.csv/i);
      const success = getByText(/was successfully uploaded/i);
      expect(fileName).toBeInTheDocument();
      expect(success).toBeInTheDocument();

      const secondFile = new File(['secondFile'], 'secondFile.csv', {
        type: 'text/csv'
      });
      fireEvent.drop(fileDropzone, {
        dataTransfer: {
          files: [secondFile]
        }
      });

      expect(fileName).toBeInTheDocument();
    });
  });
});
