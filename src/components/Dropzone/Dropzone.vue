<template>
  <div>
    <form
      ref="selectForm"
      data-testId="drop-area"
      :tabindex="0"
      role="form"
      :class="[
        'flex flex-col items-center justify-center text-center p-6 min-w-[288px] min-h-[288px]',
        'border border-dashed rounded-md focus:outline-none focus:ring-4 focus:ring-primary-100',
        {
          'border-turquoise-500 bg-white-300 hover:bg-flint-100 cursor-pointer':
            defaultStep
        },
        { 'border-turquoise-500 bg-white-100': uploadingStep },
        { 'border-coral-700 bg-coral-100 cursor-pointer': errorStep },
        { 'border-success bg-mint-100 bg': successStep },
        { 'opacity-70': !successStep && dragOverlay }
      ]"
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
      />
      <div
        role="status"
        :class="[
          'subheading-1',
          defaultStep ? 'text-gray-700 mt-2' : 'mt-6',
          { 'text-primary-500': uploadingStep },
          { 'text-error': errorStep }
        ]"
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
          <span v-if="successStep && selectedFile"
            >{{ textContent.yourFile }},</span
          >
          <span v-if="selectedFile" class="font-medium break-all ml-1"
            >"{{ selectedFile.name }}"</span
          >
          <div>
            {{ textContent.successMessage }}
          </div>
        </div>
      </div>
      <div v-if="defaultStep" class="mt-2 text-gray-700 text-default-light">
        {{ textContent.or }}
      </div>

      <input
        :id="inputId"
        ref="fileElement"
        type="file"
        :accept="acceptType"
        class="hidden"
        @change="onSelectFile"
      />
      <label
        v-if="defaultStep || errorStep"
        :for="inputId"
        role="button"
        tabindex="0"
        :class="[
          'mt-4 flex items-center rounded-lg px-4 h-[32px]',
          'primaryBtnStyle text-white font-medium text-sm',
          'focus-visible:ring-4 focus-visible:ring-primary-100 focus:outline-none'
        ]"
        @click.stop
      >
        {{ textContent.uploadFileButtonText }} <Upload class="ml-2 -mr-1" />
      </label>

      <button
        v-if="successStep"
        type="reset"
        aria-label="Remove file"
        class="mt-6 underline text-gray-500 !text-sm"
        @click.stop="
          confirmRemoveFile
            ? (confirmRemoveFileModalVisible = true)
            : removeFile()
        "
      >
        {{ textContent.removeFileButtonText }}
      </button>

      <ProgressBar v-if="uploadingStep" :percentage="progress" class="mt-6" />
    </form>
    <div class="mt-2 flex items-center justify-between">
      <div
        v-if="showTypeAndMaxSize"
        :class="['text-sm', errorStep ? 'text-error' : 'text-gray-300']"
      >
        <span v-if="acceptType && acceptType !== '/*'">
          <span v-if="fileTypesArray.length === 1">
            {{ textContent.acceptedFormatIs }}
            <strong>{{ fileTypesString }}</strong
            >.
          </span>
          <span v-if="fileTypesArray.length > 1">
            {{ textContent.acceptedFormatsAre }}
            <strong>{{ fileTypesString }}</strong
            >.
          </span>
        </span>
        <span v-if="maxSizeInBytes">
          {{ textContent.maxFileSizeIs }}
          <strong>{{ formatBytes(maxSizeInBytes) }}</strong
          >.
        </span>
      </div>
      <LobLink
        v-if="sampleLinkUrl"
        :to="sampleLinkUrl"
        target="_blank"
        class="!text-sm"
      >
        {{ textContent.downloadSampleFile }}
      </LobLink>
    </div>
    <ConfirmRemoveFileModal
      v-if="confirmRemoveFile"
      :visible="confirmRemoveFileModalVisible"
      :title="confirmModalTitle"
      :subtext="confirmModalSubtext"
      :confirm-button-text="confirmModalConfirmBtnText"
      @close="confirmRemoveFileModalVisible = false"
      @confirmClicked="removeFile"
    />
  </div>
</template>

<script>
import { formatBytes } from '@/utils/formatBytes';
import { LobLink, ProgressBar, Upload } from '@/components';
import ConfirmRemoveFileModal from './ConfirmRemoveFileModal.vue';

export default {
  name: 'Dropzone',
  components: { LobLink, ProgressBar, Upload, ConfirmRemoveFileModal },
  props: {
    textContent: {
      type: Object,
      required: true,
      validator: function (value) {
        const requiredKeys = [
          'dragAndDropHere',
          'yourFile',
          'or',
          'uploadFileButtonText',
          'acceptedFormatIs',
          'acceptedFormatsAre',
          'maxFileSizeIs',
          'downloadSampleFile',
          'uploading',
          'mightTakeAMinute',
          'looksGreat',
          'removeFileButtonText',
          'fileFor',
          'couldNotUpload',
          'canOnlySelectOneFile',
          'fileIsTooLarge',
          'fileTypeNotValid',
          'defaultErrorText',
          'errorMessage',
          'successMessage'
        ];
        return requiredKeys.every((key) => value.hasOwnProperty(key));
      }
    },
    inputId: { type: String, required: true },
    acceptType: { type: String, default: '/*' },
    maxSizeInBytes: { type: [Number, null], default: null },
    showTypeAndMaxSize: { type: Boolean, default: true },
    sampleLinkUrl: { type: String, default: null },
    progress: { type: [Number, null], default: null },
    file: { type: Object, default: null },
    status: {
      type: [String, null],
      default: null,
      validator: (value) =>
        [null, 'error', 'success', 'uploading'].includes(value)
    },
    confirmRemoveFile: { type: Boolean, default: false },
    confirmModalTitle: { type: String, default: '' },
    confirmModalSubtext: { type: String, default: '' },
    confirmModalConfirmBtnText: { type: String, default: '' }
  },
  emits: ['select', 'remove'],
  data: function () {
    return {
      formatBytes,
      selectedFile: this.file,
      currentStep: this.status ?? 'default',
      dragOverlay: false,
      multipleFilesError: false,
      fileSizeError: false,
      fileTypeError: false,
      confirmRemoveFileModalVisible: false
    };
  },
  computed: {
    defaultStep() {
      return this.currentStep === 'default';
    },
    errorStep() {
      return this.currentStep === 'error';
    },
    uploadingStep() {
      return this.currentStep === 'uploading';
    },
    successStep() {
      return this.currentStep === 'success';
    },
    fileHasBeenSelected() {
      return this.successStep && this.selectedFile;
    },
    selectedFileType() {
      return this.selectedFile?.type?.split('/')[1].toUpperCase() || 'File';
    },
    selectedFileName() {
      return this.selectedFile?.name || this.t('dropzone.yourFile');
    },
    fileTypesArray() {
      const array = this.acceptType?.split(',') || [];
      return array.map((type) => type.trim());
    },
    fileTypesString() {
      return this.fileTypesArray
        .map((t) => t.replace(/[^a-zA-Z]/g, ''))
        .join(', ')
        .toUpperCase();
    },
    isDroppingDisabled() {
      return this.fileHasBeenSelected || this.uploadingStep;
    },
    displayText() {
      if (this.errorStep) {
        return this.textContent.couldNotUpload;
      }
      if (this.successStep) {
        return this.textContent.looksGreat;
      }
      if (this.uploadingStep) {
        return `${this.textContent.uploading} ${this.selectedFileName}...`;
      }
      return '';
    },
    subText() {
      if (this.errorStep) {
        if (this.multipleFilesError) {
          return this.textContent.canOnlySelectOneFile;
        }
        if (this.fileSizeError) {
          return `${this.textContent.fileFor} ${this.textContent.fileIsTooLarge} ${formatBytes(this.maxSizeInBytes)}`;
        }
        if (this.fileTypeError) {
          return this.textContent.fileTypeNotValid;
        }
        return (
          this.textContent.errorMessage || this.textContent.defaultErrorText
        );
      } else if (this.defaultStep) {
        return this.textContent.dragAndDropHere;
      } else if (this.uploadingStep) {
        return this.textContent.mightTakeAMinute;
      }
      return '';
    },
    currentStepIcon() {
      return `https://s3.us-west-2.amazonaws.com/public.lob.com/dashboard/campaigns/file-${this.currentStep}.png`;
    }
  },
  watch: {
    status(val) {
      if (val) {
        this.currentStep = val;
      }
    }
  },
  methods: {
    clearErrors() {
      this.multipleFilesError = false;
      this.fileSizeError = false;
      this.fileTypeError = false;
    },
    onSelectFile($event) {
      this.clearErrors();
      if (this.isFileSizeValid($event.target.files[0])) {
        this.selectEmitFile($event.target.files[0]);
      }
    },
    onDropFile($event) {
      this.clearErrors();
      if (this.isDroppingDisabled) {
        return;
      }
      if (this.isSingleFile($event.dataTransfer.files)) {
        const droppedFile = $event.dataTransfer.files[0];
        if (
          this.isFileTypeValid(droppedFile) &&
          this.isFileSizeValid(droppedFile)
        ) {
          this.selectEmitFile(droppedFile);
        }
      }
      this.dragOverlay = false;
    },
    isSingleFile(fileLoad) {
      if (fileLoad.length > 1) {
        this.multipleFilesError = true;
        this.currentStep = 'error';
        this.$refs.selectForm.reset();
        return false;
      }
      return true;
    },
    isFileSizeValid(file) {
      if (this.maxSizeInBytes && file?.size > this.maxSizeInBytes) {
        this.fileSizeError = true;
        this.currentStep = 'error';
        this.$refs.selectForm.reset();
        return false;
      }
      return true;
    },
    isFileTypeValid(file) {
      if (file.type) {
        const fileType = file.type.split('/')[1];
        const typeExistsInFileTypesArray = this.fileTypesArray.includes(
          `.${fileType}`
        );
        if (this.acceptType !== '/*' && !typeExistsInFileTypesArray) {
          this.fileTypeError = true;
          this.currentStep = 'error';
          return false;
        }
      }
      return true;
    },
    selectEmitFile(file) {
      this.selectedFile = file;
      this.$emit('select', this.selectedFile);
      this.currentStep = 'uploading';
    },
    removeFile() {
      this.selectedFile = null;
      this.$emit('remove');
      this.$refs.selectForm.reset();
      this.currentStep = 'default';
      this.clearErrors();
    },
    onDragOver() {
      if (!this.isDroppingDisabled) {
        this.dragOverlay = true;
      }
    },
    onDragLeave() {
      this.dragOverlay = false;
    },
    openFileDialog() {
      this.$refs.fileElement.click();
    },
    onAreaClick() {
      console.log('ON AREA CLICK');
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
