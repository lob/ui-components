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
      @input="$emit('input', value as Value)"
      @click="$emit('click', $event)"
    />
    <div class="uic-radio-button-artificial-container">
      <span class="uic-radio-button-artificial-input" />
      <span v-bind="labelContainerAttributes" class="uic-radio-button-label">
        <slot>{{ label }}</slot>
        <div class="flex flex-row items-center gap-2">
          <LoadingSpinnerIcon v-if="loading" height="24" />
          <Icon v-if="icon" :icon />
          <slot name="chips" />
        </div>
      </span>
      <span v-if="helperText" class="uic-radio-button-helper">{{
        helperText
      }}</span>
    </div>
  </label>
</template>

<script setup lang="ts" generic="Value">
import { HTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes } from 'vue';

import { RadioButtonVariant } from './constants';
import { LoadingSpinnerIcon } from '../LoadingSpinnerIcon';
import { Icon, IconName } from '../Icon';

withDefaults(
  defineProps<{
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
    icon?: IconName;
    id: string;
    inputAttributes?: InputHTMLAttributes & Record<string, unknown>;
    label?: string;
    labelContainerAttributes?: HTMLAttributes & Record<string, unknown>;
    labelAttributes?: LabelHTMLAttributes & Record<string, unknown>;
    loading?: boolean;
    name: string;
    readonly?: boolean;
    required?: boolean;
    value: Value;
    variant?: RadioButtonVariant;
  }>(),
  {
    disabled: false,
    error: undefined,
    helperText: undefined,
    icon: undefined,
    inputAttributes: () => ({}),
    label: undefined,
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
  (e: 'input', value: Value): void; // eslint-disable-line no-unused-vars
}>();

defineSlots<{
  default: () => any;
  chips: () => any;
}>();

const modelValue = defineModel<Value>();
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
    @apply h-full;
    @apply outline-1 outline-dashed outline-offset-2 outline-transparent;
    @apply transition-all;
    @apply overflow-hidden;

    .variant-primary &,
    .variant-outlined & {
      @apply grid items-center gap-x-1.5;
      grid-template-columns: auto 1fr;
      grid-template-rows: min-content auto;
      @apply px-1 rounded-md;
    }
    .variant-outlined & {
      @apply border border-gray-200;
    }
    .variant-outlined.error & {
      @apply border-error;
    }

    .variant-outlined & {
      @apply px-4 p-3;
      @apply min-w-[16rem];
    }

    // Focused styles
    #{$focused-radio} ~ & {
      @apply outline-black;
    }

    // Hovered styles
    #{$hovered-radio} ~ & {
      .variant-outlined & {
        @apply border-gray-300;
        box-shadow: 0px 2px 4px 0px #17161713 !important;
      }
      .variant-outlined.error & {
        @apply border-error;
        box-shadow: 0px 2px 4px 0px #17161713 !important;
      }
    }

    // Checked styles
    #{$checked-radio} ~ & {
      .variant-outlined & {
        @apply border border-gray-800;
        @apply shadow-lg;
      }
      .variant-outlined.error & {
        @apply border-error;
        @apply shadow-lg;
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

  &-label {
    @apply flex flex-row items-center justify-between gap-1;

    .variant-primary &,
    .variant-outlined & {
      @apply type-base-500;
    }
    .variant-outlined & {
      @apply truncate;
    }

    #{$disabled-radio} ~ .uic-radio-button-artificial-container & {
      @apply text-gray-400;
    }
  }

  &-helper {
    @apply h-full;
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
