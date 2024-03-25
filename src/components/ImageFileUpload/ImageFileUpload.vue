<template>
  <FileUpload
    mode="advanced"
    :file-limit="1"
    :accept="accept"
    :max-file-size="maxFileSize"
    :choose-label="chooseFileLabel"
    :pt="{
      root: function ({ props, state }) {
        return {
          class: [
            'uic-img-upload',
            {
              'uic-img-upload--basic': props.mode === 'basic',
              'uic-img-upload--advanced': props.mode === 'advanced',
              'uic-img-upload--preview': state.files?.length > 0,
              'uic-img-upload--with-messages': state.messages?.length > 0
            }
          ]
        };
      },
      buttonbar: function ({ state }) {
        return {
          class: [
            'uic-img-upload__btnbar',
            {
              'uic-img-upload__btnbar--preview': state.files?.length > 0
            }
          ]
        };
      },
      label: function () {
        return {
          class: ['uic-img-upload__label']
        };
      },
      content: function () {
        return {
          class: ['uic-img-upload__content'],
          'data-testid': 'img-upload-dropzone'
        };
      },
      fileName: function () {
        return {
          class: ['uic-img-upload__filename']
        };
      },
      fileSize: function () {
        return {
          class: ['uic-img-upload__filesize']
        };
      },
      chooseButton: function ({ props, state }) {
        return {
          class: ['uic-img-upload__choose-btn'],
          'data-testid': 'img-upload-choose-btn'
        };
      },
      chooseButtonLabel: function () {
        return {
          class: ['uic-img-upload__choose-btn-label']
        };
      },
      cancelButton: function () {
        return {
          root({ state }: FileUploadPassThroughMethodOptions) {
            return {
              class: ['uic-img-upload__cancel-btn']
            };
          },
          label: {
            class: ['uic-img-upload__label', 'sr-only']
          }
        };
      },
      uploadButton: function () {
        return {
          root() {
            return {
              class: ['uic-img-upload__upload-btn']
            };
          }
        };
      },
      removeButton: function () {
        return {
          root() {
            return {
              class: ['uic-img-upload__remove-btn']
            };
          }
        };
      },
      badge: function () {
        return {
          root() {
            return {
              class: ['uic-img-upload__badge']
            };
          }
        };
      },
      empty: function () {
        return {
          class: ['uic-img-upload__empty']
        };
      },
      file: function () {
        return {
          class: ['uic-img-upload__file']
        };
      },
      message: function () {
        return {
          root(
            _: MessagePassThroughMethodOptions<FileUploadPassThroughMethodOptions>
          ) {
            return {
              class: ['uic-img-upload__message']
            };
          },
          icon() {
            return {
              class: ['uic-img-upload__message-icon']
            };
          },
          closeButton() {
            return {
              class: ['uic-img-upload__message-close-btn']
            };
          }
        };
      }
    }"
    @select="($event) => onSelectFile($event)"
  >
    <template #empty>
      <p v-if="dropZone" class="uic-img-upload__empty-label"></p>
    </template>
    <template #chooseicon>
      <i class="pi pi-upload"></i>
    </template>
    <template #cancelicon>
      <i class="pi pi-trash"></i>
    </template>
  </FileUpload>
</template>

<script setup lang="ts">
import FileUpload, { FileUploadSelectEvent } from 'primevue/fileupload';
// eslint-disable-next-line no-unused-vars
import type { FileUploadPassThroughMethodOptions } from 'primevue/fileupload';
// eslint-disable-next-line no-unused-vars
import type { MessagePassThroughMethodOptions } from 'primevue/message';

export interface ImageFileUploadProps {
  /**
   * The name of the file input.
   */
  name: string;
  /**
   * The maximum file size in bytes.
   */
  maxFileSize?: number;
  /**
   * The accepted file types. Defaults to `image/*`.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers
   */
  accept?: string;
  /**
   * Indicates whether to show the drop zone. Defaults to `true`.
   */
  dropZone?: boolean;
  /**
   * The message to show when there are no selected files.
   */
  emptyLabel?: string;
  /**
   * The label for the choose file button. Defaults to `Upload`.
   */
  chooseFileLabel?: string;
}

export interface FileSelectedEvent {
  originalEvent: Event;
  file?: File;
}

/* eslint-disable no-unused-vars */
export interface ImageFileEmits {
  /**
   * Emitted when a file is selected.
   *
   * | Event Property  | Type    | Description |
   * | --------------- | ------- | ----------- |
   * | originalEvent   | Event   | The original event. |
   * | file             | File / `undefined`     | The selected file or `undefined` if the selected file exceeds the maxFileSize or is an invalid file type. |
   *
   * @event fileSelected
   */
  (e: 'fileSelected', $event: FileSelectedEvent): void;
}
/* eslint-enable no-unused-vars */

withDefaults(defineProps<ImageFileUploadProps>(), {
  maxFileSize: 1000000,
  dropZone: true,
  accept: 'image/*',
  chooseFileLabel: 'Upload',
  emptyLabel: ''
});

const emit = defineEmits<ImageFileEmits>();

function onSelectFile($event: FileUploadSelectEvent) {
  // only allow one file to be selected at a time
  if (Array.isArray($event.files) && $event.files.length > 1) {
    // keep the most recently added file and discard the rest
    $event.files.splice(0, $event.files.length - 1);
  }

  const [selectedFile] = $event.files;

  emit('fileSelected', {
    originalEvent: $event.originalEvent,
    file: selectedFile
  });
}
</script>

<style lang="scss">
.uic-img-upload {
  $root: &;

  @apply relative w-full h-full min-h-[50px] min-w-[160px];

  &--preview {
    @apply flex flex-row-reverse justify-between;

    #{$root}__choose-btn {
      @apply hidden;
    }
  }

  &--with-messages {
    #{$root}__choose-btn {
      @apply hidden;
    }

    #{$root}__content {
      @apply flex flex-col items-center;
    }
  }

  & > input[type='file'] {
    @apply hidden;
  }

  &--basic {
    input[type='file'] {
      @apply hidden;
    }
  }

  &__content {
    @apply absolute top-0 left-0 w-full h-full;
  }

  &__btnbar {
    @apply relative w-[80px] m-auto z-10;

    &--preview {
      @apply mr-0 w-fit;
    }
  }

  &__choose-btn {
    @apply cursor-pointer flex flex-col items-center justify-center gap-2;
  }

  &__choose-btn-label {
    @apply text-purple-800;
  }

  &__cancel-btn {
    &[disabled] {
      @apply hidden;
    }

    span {
      @apply sr-only;
    }
  }

  &__upload-btn {
    @apply hidden;
  }

  &__remove-btn {
    @apply hidden;
  }

  &__filename {
    @apply hidden;
  }

  &__filesize {
    @apply hidden;
  }

  &__badge {
    @apply hidden;
  }

  &__message {
    @apply flex justify-center w-full;

    & > div {
      @apply flex flex-row-reverse gap-2;
    }

    #{$root}__message-icon {
      @apply my-auto text-red-500;
    }
  }
}
</style>
