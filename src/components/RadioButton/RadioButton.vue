<template>
  <label
    v-bind="labelAttributes"
    :for="id"
    :class="['uic-radio-button-container', `variant-${variant}`, { error }]"
  >
    <input
      :id="id"
      v-model="modelValue"
      v-bind="inputAttributes"
      class="uic-radio-button-input"
      :disabled="disabled || loading"
      :name
      :readonly
      :required
      type="radio"
      :value
      @input="$emit('input', value)"
      @click="$emit('click', $event)"
    />
    <div class="uic-radio-button-artificial-container">
      <span
        v-if="variant !== RadioButtonVariant.CARD"
        class="uic-radio-button-artificial-input"
      />
      <span
        v-if="variant === RadioButtonVariant.CARD && icon"
        class="uic-radio-button-icon-container"
      >
        <Icon
          :icon="icon"
          :size="RadioButtonVariant.CARD ? 'xxl' : undefined"
        />
      </span>
      <div
        v-if="variant === RadioButtonVariant.CARD && src"
        class="uic-radio-button-image-container"
      >
        <img v-bind="imgAttributes" class="uic-radio-button-image" :src />
      </div>
      <span v-bind="labelContainerAttributes" class="uic-radio-button-label">
        <slot>{{ label }}</slot>
        <LoadingSpinnerIcon v-if="loading" class="ml-1" height="24" />
      </span>
      <div
        v-if="variant === RadioButtonVariant.CARD"
        class="uic-radio-button-content"
      >
        <slot name="content" />
      </div>
      <span v-if="helperText" class="uic-radio-button-helper">{{
        helperText
      }}</span>
    </div>
  </label>
</template>

<script setup lang="ts">
import {
  HTMLAttributes,
  ImgHTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes
} from 'vue';

import { Icon, IconName } from '../Icon';
import { RadioButtonVariant } from './constants';
import { LoadingSpinnerIcon } from '../LoadingSpinnerIcon';

withDefaults(
  defineProps<{
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
    /** Will only display with the `card` variant. */
    icon?: IconName;
    id: string;
    imgAttributes?: ImgHTMLAttributes;
    /** Will only display with the `card` variant. Image source. */
    src?: string;
    inputAttributes?: InputHTMLAttributes;
    label: string;
    labelContainerAttributes?: HTMLAttributes;
    labelAttributes?: LabelHTMLAttributes;
    loading?: boolean;
    name: string;
    readonly?: boolean;
    required?: boolean;
    value: string;
    variant?: RadioButtonVariant;
  }>(),
  {
    disabled: false,
    error: undefined,
    helperText: undefined,
    icon: undefined,
    imgAttributes: () => ({}),
    inputAttributes: () => ({}),
    labelContainerAttributes: () => ({}),
    labelAttributes: () => ({}),
    loading: false,
    readonly: false,
    required: false,
    src: undefined,
    variant: RadioButtonVariant.PRIMARY
  }
);

defineEmits<{
  (e: 'click', event: Event): void; // eslint-disable-line no-unused-vars
  (e: 'input', value: string): void; // eslint-disable-line no-unused-vars
}>();

defineSlots<{
  /** Only shown with the `card` variant. */
  default: () => void;
  content: () => void;
}>();

const modelValue = defineModel<string>();
</script>

<style scoped lang="scss">
$radio-class: '.uic-radio-button-input';
$focused-radio: '.uic-radio-button-input:focus-visible';
$hovered-radio: '.uic-radio-button-input:hover:not(:disabled):not(:checked)';
$checked-radio: '.uic-radio-button-input:checked';
$disabled-radio: '.uic-radio-button-input:disabled';

.uic-radio-button {
  &-container {
    @apply relative;
  }

  // Actual checkbox that is not shown.
  &-input {
    @apply absolute;
    @apply opacity-0;
    @apply cursor-pointer;
    @apply w-0 h-0;
  }

  &-artificial-container {
    @apply cursor-pointer;
    @apply outline-1 outline-dashed outline-offset-2 outline-transparent;
    @apply transition-all;
    @apply overflow-hidden;

    .variant-primary &,
    .variant-outlined & {
      @apply grid items-center gap-x-1.5;
      grid-template-columns: auto 1fr;
      @apply px-1 rounded-sm;
    }
    .variant-outlined &,
    .variant-card & {
      @apply border border-gray-200;
    }
    .variant-outlined.error &,
    .variant-card.error & {
      @apply border-error;
    }

    .variant-outlined & {
      @apply px-6 py-3;
    }

    .variant-card & {
      @apply rounded-md;
      @apply p-4;
    }

    // Focused styles
    #{$focused-radio} ~ & {
      @apply outline-black;
    }

    // Hovered styles
    #{$hovered-radio} ~ & {
      .variant-outlined &,
      .variant-card & {
        @apply border-gray-300;
        box-shadow: 0px 2px 4px 0px #17161713 !important;
      }
      .variant-outlined.error &,
      .variant-card.error & {
        @apply border-error;
        box-shadow: 0px 2px 4px 0px #17161713 !important;
      }
    }

    // Checked styles
    #{$checked-radio} ~ & {
      .variant-outlined &,
      .variant-card & {
        @apply border border-gray-800;
      }
      .variant-outlined.error & {
        @apply border-error;
      }
      .variant-card.error & {
        @apply border-gray-800;
      }
    }

    // Disabled styles
    #{$disabled-radio} ~ & {
      @apply cursor-not-allowed;
    }
  }

  &-artificial-input {
    @apply rounded-full;
    @apply border border-gray-300;
    @apply w-4 h-4;
    @apply transition-colors;

    .error & {
      @apply border-error;
    }

    #{$hovered-radio} ~ .uic-radio-button-artificial-container & {
      .variant-primary &,
      .variant-outlined & {
        @apply bg-gray-50;
        @apply border-gray-400;
      }
      .variant-primary.error &,
      .variant-outlined.error & {
        @apply bg-error-light;
        @apply border-error;
      }
    }

    #{$checked-radio} ~ .uic-radio-button-artificial-container & {
      .variant-primary &,
      .variant-outlined & {
        @apply border-gray-800 border-[5px];
        @apply bg-transparent;
      }
      .variant-primary.error &,
      .variant-outlined.error & {
        @apply border-error;
      }
    }

    #{$disabled-radio} ~ .uic-radio-button-artificial-container & {
      .variant-primary &,
      .variant-outlined &,
      .variant-primary.error &,
      .variant-outlined.error & {
        @apply border-gray-200;
        @apply bg-transparent;
      }
    }
  }

  &-icon-container {
    .variant-card & {
      @apply flex items-center justify-center;
      @apply w-9 h-9;
      @apply rounded-full;
      @apply bg-gray-25;
      @apply text-gray-800;

      .error & {
        @apply bg-error-light;
        @apply text-error;
      }
    }

    #{$disabled-radio} ~ .uic-radio-button-artificial-container & {
      @apply text-gray-400;
    }
  }

  &-image-container {
    @apply -mx-4 -mt-4;
    @apply flex items-center justify-center;
  }

  &-image {
    @apply max-w-full max-h-full;
  }

  &-label {
    @apply flex gap-1 items-center;
    @apply truncate;

    .variant-primary &,
    .variant-outlined & {
      @apply type-base-500;
    }
    .variant-card & {
      @apply type-base-600;
      @apply mt-2;
    }

    #{$disabled-radio} ~ .uic-radio-button-artificial-container & {
      @apply text-gray-400;
    }
  }

  &-content {
    @apply type-small-400;
    @apply mt-1;

    #{$disabled-radio} ~ .uic-radio-button-artificial-container & {
      @apply text-gray-400;
    }
  }

  &-helper {
    @apply type-xs-400 text-gray-500;
    grid-column: 2 / 3;

    .uic-radio-button-input:disabled
      ~ .uic-radio-button-artificial-container
      & {
      @apply text-gray-300;
    }
  }
}
</style>
