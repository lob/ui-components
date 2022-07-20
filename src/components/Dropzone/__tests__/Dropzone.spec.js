import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import Dropzone from '../Dropzone.vue';

const textContentObject = {
  yourFile: 'Your file',
  or: 'or',
  uploadFileButtonText: 'Upload file',
  removeFileButtonText: 'Remove file',
  acceptedFormatIs: 'The only accepted file format is',
  acceptedFormatsAre: 'The accepted file format types are',
  maxFileSizeIs: 'Max file size is',
  downloadSampleFile: 'Download a sample file?',
  couldNotUpload: 'Could not Upload',
  looksGreat: 'Looks great!',
  uploading: 'Uploading',
  canOnlySelectOneFile: 'You can only select 1 file.',
  fileIsTooLarge: 'File is too large.',
  fileTypeNotValid: 'File is not a valid file type.',
  dragAndDropHere: 'Drag and drop files here',
  mightTakeAMinute: 'This might take a minute.',
  defaultErrorText: 'Something went wrong. Please try again.',
  errorMessage: '',
  successMessage: ''
};

const initialProps = {
  uploadId: 'dropzone-story',
  textContent: textContentObject
};

const renderComponent = (options) => render(Dropzone, { ...options });

describe('Dropzone', () => {

  it('renders', () => {
    const props = initialProps;
    const { queryByRole } = renderComponent({ props });

    const uploadForm = queryByRole('form');
    expect(uploadForm).toBeInTheDocument();
  });

});
