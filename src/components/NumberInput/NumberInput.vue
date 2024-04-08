<template>
  <div
    class="uic-input-number-container"
    data-testid="uic-input-number-container"
    v-bind="containerProps"
  >
    <Label
      :label-for="id"
      :label="label"
      :required="required"
      :sr-only-label="hideLabel"
      data-testid="uic-input-number-label"
    />
    <InputNumber
      data-testid="testing-number"
      :currency="currency"
      :disabled="disabled"
      :input-class="[
        'uic-input-number',
        { 'uic-error': error },
        { 'uic-success': success }
      ]"
      :input-id="id"
      :input-props="computedInputProps"
      :invalid="error"
      :max-fraction-digits="maxFractionDigits"
      :max="max"
      :min-fraction-digits="minFractionDigits"
      :min="min"
      :mode="mode"
      :model-value="modelValue"
      :placeholder="placeholder"
      :readonly="readonly"
      :show-buttons="showButtons"
      locale="en-US"
      unstyled
      @blur="emits('blur')"
      @focus="emits('focus')"
      @update:modelValue="emits('update:modelValue', $event)"
      @input="emits('update:modelValue', $event.value as number)"
    />
    <!-- The PrimeVue number input does not have helper text, I copied this from the PrimeVue text input. -->
    <small
      v-if="helperText"
      :id="helperTextId"
      :class="[
        'uic-input-number-helper',
        { 'uic-error': error },
        { 'uic-success': success }
      ]"
      data-testid="uic-input-number-helper"
    >
      {{ helperText }}
    </small>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false
};
</script>
<script setup lang="ts">
import InputNumber, { InputNumberProps } from 'primevue/inputnumber';
import { HTMLAttributes, InputHTMLAttributes, computed, useAttrs } from 'vue';

import Label from '../Label/Label.vue';
import { NumberInputMode } from './constants';

const attrs = useAttrs();

const props = withDefaults(
  defineProps<{
    containerProps?: HTMLAttributes;
    disabled?: InputNumberProps['disabled'];
    error?: boolean;
    helperText?: string;
    hideLabel?: boolean;
    id: InputNumberProps['inputId'];
    label: string;
    max?: InputNumberProps['max'];
    maxFractionDigits?: InputNumberProps['maxFractionDigits'];
    min?: InputNumberProps['min'];
    minFractionDigits?: InputNumberProps['minFractionDigits'];
    mode?: NumberInputMode;
    modelValue?: number;
    name: string;
    placeholder?: InputNumberProps['placeholder'];
    readonly?: InputNumberProps['readonly'];
    required?: boolean;
    success?: boolean;
    showButtons?: InputNumberProps['showButtons'];
  }>(),
  {
    containerProps: undefined,
    disabled: false,
    error: false,
    helperText: undefined,
    hideLabel: false,
    max: undefined,
    maxFractionDigits: undefined,
    min: 0,
    minFractionDigits: undefined,
    mode: NumberInputMode.DECIMAL,
    modelValue: 0,
    placeholder: undefined,
    readonly: false,
    required: false,
    success: false,
    showButtons: true
  }
);

const emits = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'change', value: number): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
}>();

const helperTextId = computed(() => `${props.id}-helper`);
const computedInputProps = computed<InputHTMLAttributes>(() => {
  return {
    ...attrs,
    'aria-describedby': props.helperText ? helperTextId.value : undefined,
    name: props.name,
    required: props.required
  };
});
const currency = computed(() =>
  props.mode === NumberInputMode.CURRENCY ? 'USD' : undefined
);
</script>

<style lang="scss">
.uic-input-number-container {
  @apply flex flex-col gap-1;
}

.uic-input-number {
  @apply w-full px-4 py-3;
  @apply text-sm text-gray-800;
  @apply bg-white;
  @apply border border-gray-200 rounded;
  outline: none;

  &:hover {
    @apply border-gray-300;
  }

  &:focus-within {
    @apply border-gray-400;
  }

  &::placeholder {
    @apply text-gray-200;
  }

  &.uic-error {
    @apply bg-red-50;
    @apply border-red-600;
    @apply text-red-600;

    &::placeholder {
      @apply text-red-600;
    }
  }

  &.uic-success {
    @apply bg-green-50;
    @apply border-green-700;
    @apply text-green-700;

    &::placeholder {
      @apply text-green-700;
    }
  }

  &:disabled {
    @apply bg-gray-50;
    @apply text-gray-300;
    @apply border-gray-200;

    &::placeholder {
      @apply text-gray-300;
    }
  }
}
.uic-input-number-helper {
  @apply text-xs text-gray-500;

  &.uic-error {
    @apply text-red-600;
  }

  &.uic-success {
    @apply text-green-700;
  }
}
</style>
