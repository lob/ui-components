import Dropzone from './Dropzone.vue';

export default {
  title: 'Components/Dropzone',
  component: Dropzone,
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
    showSampleLink: {
      control: {
        type: 'boolean'
      }
    },
    dragAndDropHere: {
      control: {
        type: 'text'
      }
    },
    uploadFileButtonText: {
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

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Dropzone },
  setup: () => ({ args }),
  data: () => ({ fileUploadStatus: args.status, file: null }),
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
            :show-sample-link="args.showSampleLink"
            :status="fileUploadStatus"
            :file-ob="file"
            :upload-file-button-text="args.uploadFileButtonText"
            :drag-and-drop-here="args.dragAndDropHere"
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
  showSampleLink: false,
  status: null,
  dragAndDropHere: 'Drag and drop files here',
  uploadFileButtonText: 'Upload a demo file'
};
