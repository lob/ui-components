import Dropzone from './Dropzone.vue';
import mdx from './Dropzone.mdx';

export default {
  title: 'Components/Dropzone',
  component: Dropzone,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    acceptType: {
      options: ['.csv', '.pdf', '.jpg,.png', '*/image'],
      default: '.csv',
      control: {
        type: 'select'
      }
    },
    maxSizeInBytes: {
      options: [1073741824, 2147483648, 5368709120],
      control: {
        type: 'select'
      }
    },
    showTypeAndMaxSize: {
      control: {
        type: 'boolean'
      }
    },
    sampleLinkUrl: {
      control: {
        type: 'text'
      }
    },
    status: {
      options: [null, 'error', 'success'],
      control: {
        type: 'select'
      }
    }
  }
};

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
  successMessage: ' was successfully uploaded.'
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Dropzone },
  setup: () => ({ args }),
  data: () => ({ fileUploadStatus: args.status, file: null, textContentObject }),
  methods: {
    uploadAudienceFile () {
      setTimeout(() => {
        this.fileUploadStatus = 'success';
      }, 2000);
    },
    removeAudienceFile () {
      this.file = null;
      this.fileUploadStatus = null;
    }
  },
  template: `
    <div style="width: 700px">
        <Dropzone
            upload-id="dropzone"
            :accept-type="args.acceptType"
            :max-size-in-bytes="Number(args.maxSizeInBytes)"
            :show-type-and-max-size="args.showTypeAndMaxSize"
            :sample-link-url="args.sampleLinkUrl"
            :status="fileUploadStatus"
            :file-ob="file"
            :text-content="textContentObject"
            @select="uploadAudienceFile"
            @remove="removeAudienceFile"
        />
    </div>
`
});

export const Primary = Template.bind({});
Primary.args = {
  acceptType: '.csv',
  maxSizeInBytes: '2147483648',
  showTypeAndMaxSize: true,
  status: null,
  sampleLinkUrl: 'https://www.lob.com/'
};
