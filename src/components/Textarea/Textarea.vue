<template>
  <div class="flex flex-col">
    <Label
      v-if="label"
      v-bind="labelProps"
      :label
      :label-for="id"
      :sr-only-label="hideLabel"
      :tooltip-content="tooltip"
      :required
    />

    <Textarea
      :id
      v-bind="textareaProps"
      v-model="modelValue"
      :class="['uic-textarea', `color-${color}`, { resizeable }]"
      :cols
      :disabled
      :maxlength
      :minlength
      :name
      :placeholder
      :readonly
      :required
      :rows
      :spellcheck
      @input="$emit('input', $event)"
    />

    <small
      v-if="$slots.helper || helper"
      :class="['uic-textarea-helper', `color-${color}`, 'mt-1']"
    >
      <slot name="helper">
        {{ helper }}
      </slot>
    </small>
  </div>
</template>

<script setup lang="ts">
import { TextareaHTMLAttributes } from 'vue';
import Label from '../Label/Label.vue';
import Textarea from 'primevue/textarea';
import { TextareaColor } from './constants';

withDefaults(
  defineProps<{
    color?: TextareaColor;
    cols?: TextareaHTMLAttributes['cols'];
    disabled?: TextareaHTMLAttributes['disabled'];
    helper?: string;
    hideLabel?: boolean;
    id?: TextareaHTMLAttributes['id'];
    label?: string;
    labelProps?: Record<string, unknown>;
    maxlength?: TextareaHTMLAttributes['maxlength'];
    minlength?: TextareaHTMLAttributes['minlength'];
    name?: TextareaHTMLAttributes['name'];
    placeholder?: TextareaHTMLAttributes['placeholder'];
    readonly?: TextareaHTMLAttributes['readonly'];
    required?: TextareaHTMLAttributes['required'];
    resizeable?: boolean;
    rows?: TextareaHTMLAttributes['rows'];
    spellcheck?: TextareaHTMLAttributes['spellcheck'];
    textareaProps?: TextareaHTMLAttributes;
    tooltip?: string;
  }>(),
  {
    color: TextareaColor.NEUTRAL,
    cols: undefined,
    disabled: false,
    helper: undefined,
    hideLabel: false,
    id: undefined,
    label: undefined,
    labelProps: () => ({}),
    maxlength: undefined,
    minlength: undefined,
    name: undefined,
    placeholder: undefined,
    readonly: false,
    required: false,
    resizeable: true,
    rows: undefined,
    spellcheck: undefined,
    textareaProps: () => ({}),
    tooltip: undefined
  }
);

defineEmits<{
  (e: 'input', value: Event): void; // eslint-disable-line no-unused-vars
}>();

const modelValue = defineModel<string>({ default: '' });
</script>

<style scoped lang="scss">
.uic-textarea {
  @apply p-3 w-full;
  @apply bg-white;
  @apply rounded-sm border;
  @apply text-gray-800 type-small-400;
  @apply outline-1 outline-dashed outline-offset-2 outline-transparent;
  transition:
    outline-color cubic-bezier(0.4, 0, 0.2, 1) 150ms,
    border-color cubic-bezier(0.4, 0, 0.2, 1) 150ms;

  &.color-error {
    @apply border-error;
  }
  &.color-neutral {
    @apply border-gray-200;

    &:hover {
      @apply border-gray-400;
    }
  }
  &.color-success {
    @apply border-success;
  }
  &.color-warning {
    @apply border-warning;
  }

  &:focus-visible {
    @apply outline-black;
  }

  &:disabled,
  &:read-only {
    @apply cursor-not-allowed;
    @apply bg-gray-50;
    @apply text-gray-200;
    @apply border-gray-200;
  }

  &::placeholder {
    @apply text-gray-400;
  }

  &:not(.resizeable) {
    @apply resize-none;
  }

  &-helper {
    @apply mt-1;
    @apply type-xs-400;

    &.color-error {
      @apply text-error-dark;
    }
    &.color-neutral {
      @apply text-gray-500;
    }
    &.color-success {
      @apply text-success-dark;
    }
    &.color-warning {
      @apply text-warning-dark;
    }
  }
}
</style>
