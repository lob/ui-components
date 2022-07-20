<template>
  <div>
    <form
      ref="selectForm"
      data-testId="drop-area"
      :tabindex="0"
      role="form"
      :class="['flex flex-col items-center justify-center text-center p-6 min-w-[288px] min-h-[288px]',
               'border border-dashed rounded-md focus:outline-none focus:ring-4 focus:ring-primary-100',
               { 'border-turquoise-500 bg-white-300 hover:bg-flint-100 cursor-pointer': defaultStep },
               { 'border-turquoise-500 bg-white-100': uploadingStep },
               { 'border-coral-700 bg-coral-100 cursor-pointer': errorStep },
               { 'border-success bg-mint-100 bg': successStep },
               { 'opacity-70': !successStep && dragOverlay }]"
      @drop.stop.prevent="onDropFile"
      @dragover.stop.prevent="onDragOver"
      @dragleave.stop.prevent="onDragLeave"
      @click="onAreaClick"
      @keyup.enter="onAreaClick"
    >
      <img
        aria-hidden="true"
        class="w-[148px] h-[112px] block mx-auto"
        :src="currentStepIcon"
        alt=""
      >
      <div
        role="status"
        :class="['subheading-1', defaultStep ? 'text-gray-700 mt-2' : 'mt-6',
                 { 'text-primary-500': uploadingStep },
                 { 'text-error': errorStep }]"
      >
        {{ displayText }}
      </div>
      <div class="mt-2 text-default">
        <div
          v-if="defaultStep || uploadingStep || errorStep"
          :class="[{ 'text-error': errorStep }]"
        >
          {{ subText }}
        </div>
        <div v-if="successStep">
          <span v-if="successStep && selectedFile">{{ yourFile }},</span>
          <span class="font-medium break-all ml-1">"{{ selectedFile.name }}"</span>
          <div>
            {{ successMessage || '  was successfully uploaded.' }}
          </div>
        </div>
      </div>
      <div
        v-if="defaultStep"
        class="mt-2 text-gray-700 text-default-light"
      >
        {{ or }}
      </div>

      <input
        :id="uploadId"
        ref="fileElement"
        type="file"
        :accept="acceptType"
        class="hidden"
        @change="onSelectFile"
      >
      <label
        v-if="defaultStep || errorStep"
        :for="uploadId"
        role="button"
        tabindex="0"
        :class="['mt-4 flex items-center rounded-lg px-4 h-[32px]',
                 'primaryBtnStyle text-white font-medium text-sm',
                 'focus-visible:ring-4 focus-visible:ring-primary-100 focus:outline-none']"
        @click.stop
      >
        {{ uploadFileButtonText }} <Upload class="w-5 h-5 ml-2 -mr-2" />
      </label>

      <button
        v-if="successStep"
        type="reset"
        aria-label="Remove file"
        class="mt-6 underline text-gray-500 !text-sm"
        @click.stop="removeFile"
      >
        {{ removeFileButtonText }}
      </button>

      <ProgressBar
        v-if="uploadingStep"
        :percentage="progress"
        class="mt-6"
      />
    </form>
    <div class="mt-2 flex items-center justify-between">
      <div
        v-if="showTypeAndMaxSize"
        :class="['text-sm', errorStep ? 'text-error' : 'text-gray-300']"
      >
        <span v-if="acceptType && acceptType !== '/*'">
          <span v-if="fileTypesArray.length === 1">
            {{ acceptedFormatIs }} <strong>{{ fileTypesString }}</strong>.
          </span>
          <span v-if="fileTypesArray.length > 1">
            {{ acceptedFormatsAre }} <strong>{{ fileTypesString }}</strong>.
          </span>
        </span>
        <span v-if="maxSizeInBytes">
          {{ maxFileSizeIs }} <strong>{{ formatBytes(maxSizeInBytes) }}</strong>.
        </span>
      </div>
      <LobLink
        v-if="showSampleLink"
        target="_blank"
      >
        {{ downloadSampleFile }}
      </LobLink>
    </div>
  </div>
</template>

<script>
import { formatBytes } from './fortmatBytes';
import { LobLink, ProgressBar, Upload } from '@/components';

export default {
  name: 'Dropzone',
  components: { LobLink, ProgressBar, Upload },
  props: {
    yourFile: { type: String, default: 'Your file' },
    or: { type: String, default: 'or' },
    uploadFileButtonText: { type: String, default: 'Upload file' },
    removeFileButtonText: { type: String, default: 'Remove file' },
    acceptedFormatIs: { type: String, default: 'The only accepted file format is' },
    acceptedFormatsAre: { type: String, default: 'The accepted file format types are' },
    maxFileSizeIs: { type: String, default: 'Max file size is' },
    downloadSampleFile: { type: String, default: 'Download a sample file?' },
    defaultErrorText: { type: String, default: 'Something went wrong. Please try again.' },
    couldNotUpload: { type: String, default: 'Could not Upload' },
    looksGreat: { type: String, default: 'Looks great!' },
    uploading: { type: String, default: 'Uploading' },
    canOnlySelectOneFile: { type: String, default: 'You can only select 1 file.' },
    fileIsTooLarge: { type: String, default: 'File is too large.' },
    fileTypeNotValid: { type: String, default: 'File is not a valid file type.' },
    dragAndDropHere: { type: String, default: 'Drag and drop files here' },
    mightTakeAMinute: { type: String, default: 'This might take a minute.' },
    acceptType: { type: String, default: '/*' },
    uploadId: { type: String, required: true },
    maxSizeInBytes: { type: [Number, null], default: null },
    showTypeAndMaxSize: { type: Boolean, default: true },
    showSampleLink: { type: Boolean, default: false },
    progress: { type: [Number, null], default: null },
    errorMessage: { type: String, default: (props) => props.defaultErrorText },
    successMessage: { type: String, default: '' },
    status: { type: [String, null], default: null,
      validator: function (value) {
        return [null, 'error', 'success'].includes(value);
      }
    },
    fileOb: {
      type: Object,
      required: false,
      default: null
    }
  },
  emits: ['select', 'remove'],
  data: function () {
    return {
      formatBytes,
      selectedFile: this.fileOb,
      currentStep: this.status !== null ? this.status :  'default',
      dragOverlay: false,
      multipleFilesError: false,
      fileSizeError: false,
      fileTypeError: false
    };
  },
  computed: {
    defaultStep () {
      return this.currentStep === 'default';
    },
    errorStep () {
      return this.currentStep === 'error';
    },
    uploadingStep () {
      return this.currentStep === 'uploading';
    },
    successStep () {
      return this.currentStep === 'success';
    },
    fileHasBeenSelected () {
      return this.successStep && this.selectedFile;
    },
    selectedFileType () {
      return this.selectedFile.type ? this.selectedFile.type.split('/')[1].toUpperCase() : 'File';
    },
    selectedFileName () {
      return this.selectedFile.name ? this.selectedFile.name : 'File';
    },
    fileTypesArray () {
      const array = this.acceptType?.split(',') || [];
      return array.map((type) => type.trim());
    },
    fileTypesString () {
      return this.fileTypesArray.map((t) => t.replace(/[^a-zA-Z]/g, '')).join(', ').toUpperCase();
    },
    droppingDisabled () {
      return this.fileHasBeenSelected || this.uploadingStep;
    },
    displayText () {
      if (this.errorStep) {
        return this.couldNotUpload;
      }
      if (this.successStep) {
        return this.looksGreat;
      }
      if (this.uploadingStep) {
        return `${this.uploading} ${this.selectedFileName}...`;
      } else {
        return '';
      }
    },
    subText () {
      if (this.errorStep) {
        if (this.multipleFilesError) {
          return this.canOnlySelectOneFile;
        }
        if (this.fileSizeError) {
          return this.fileIsTooLarge;
        }
        if (this.fileTypeError) {
          return this.fileTypeNotValid;
        } else {
          return this.errorMessage;
        }
      } else if (this.defaultStep) {
        return this.dragAndDropHere;
      } else if (this.uploadingStep) {
        return this.mightTakeAMinute;
      } else {
        return '';
      }
    },
    currentStepIcon () {
      return `https://s3.us-west-2.amazonaws.com/public.lob.com/dashboard/campaigns/file-${this.currentStep}.png`;
    }
  },
  watch: {
    status (val) {
      if (val) {
        this.currentStep = val;
      }
    }
  },
  methods: {
    clearErrors () {
      this.multipleFilesError = false;
      this.fileSizeError = false;
      this.fileTypeError = false;
    },
    onSelectFile ($event) {
      this.clearErrors();
      if (this.isFileSizeValid($event.target.files[0])) {
        this.selectEmitFile($event.target.files[0]);
      }
    },
    onDropFile ($event) {
      this.clearErrors();
      if (this.droppingDisabled) {
        return;
      }
      if (this.isSingleFile($event.dataTransfer.files)) {
        const droppedFile = $event.dataTransfer.files[0];
        if (this.isFileTypeValid(droppedFile) && this.isFileSizeValid(droppedFile)) {
          this.selectEmitFile(droppedFile);
        }
      }
      this.dragOverlay = false;
    },
    isSingleFile (fileLoad) {
      if (fileLoad.length > 1) {
        this.multipleFilesError = true;
        this.currentStep = 'error';
        this.$refs.selectForm.reset();
        return false;
      }
      return true;
    },
    isFileSizeValid (file) {
      if (this.maxSizeInBytes && file?.size > this.maxSizeInBytes) {
        this.fileSizeError = true;
        this.currentStep = 'error';
        this.$refs.selectForm.reset();
        return false;
      }
      return true;
    },
    isFileTypeValid (file) {
      if (file.type) {
        const fileType = file.type.split('/')[1];
        const typeExistsInFileTypesArray = this.fileTypesArray.includes(`.${fileType}`);
        if (this.acceptType !== '/*' && !typeExistsInFileTypesArray) {
          this.fileTypeError = true;
          this.currentStep = 'error';
          return false;
        }
      }
      return true;
    },
    selectEmitFile (file) {
      this.selectedFile = file;
      this.$emit('select', this.selectedFile);
      this.currentStep = 'uploading';
    },
    removeFile () {
      this.selectedFile = null;
      this.$emit('remove');
      this.$refs.selectForm.reset();
      this.currentStep = 'default';
      this.clearErrors();
    },
    onDragOver () {
      if (!this.droppingDisabled) {
        this.dragOverlay = true;
      }
    },
    onDragLeave () {
      this.dragOverlay = false;
    },
    openFileDialog () {
      this.$refs.fileElement.click();
    },
    onAreaClick () {
      if (this.fileHasBeenSelected) {
        return;
      }
      this.$refs.fileElement.click();
    }
  }
};
</script>

<style scoped lang="scss">
.primaryBtnStyle:not(:disabled) {
  background: linear-gradient(114.08deg, #1876db 7.95%, #5748ff 90.87%);
}

.primaryBtnStyle:focus:not(:disabled),
.primaryBtnStyle:hover:not(:disabled):not(:focus) {
  background: linear-gradient(114.08deg, #5748ff 7.95%, #1876db 90.87%);
}
</style>
