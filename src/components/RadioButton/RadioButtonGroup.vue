<template>
  <fieldset :disabled>
    <legend
      v-if="label"
      data-testid="uic-radio-button-group-legend"
      :class="['uic-radio-button-group-legend', { 'sr-only': hideLabel }]"
      v-bind="labelAttributes"
    >
      <slot name="label">{{ label }}</slot>
      <span v-if="required" class="text-error">*</span>
    </legend>

    <p
      v-if="description || $slots.description"
      class="type-xs-600 mt-1 text-gray-600"
    >
      <slot name="description">{{ description }}</slot>
    </p>

    <div
      :class="[
        'uic-radio-button-group-container',
        { column, 'mt-2': !hideLabel, spaceEvenly }
      ]"
    >
      <slot />
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { LabelHTMLAttributes } from 'vue';

withDefaults(
  defineProps<{
    column?: boolean;
    description?: string;
    disabled?: boolean;
    spaceEvenly?: boolean;
    label?: string;
    labelAttributes?: LabelHTMLAttributes;
    /** Simply adds an asterisk to the `legend`, does not enforce required on `RadioButton`s. */
    required?: boolean;
    hideLabel?: boolean;
  }>(),
  {
    column: false,
    description: undefined,
    disabled: false,
    label: undefined,
    labelAttributes: () => ({}),
    required: false,
    srLabel: false
  }
);

defineSlots<{
  default(): any;
  label(): any;
  description(): any;
}>();
</script>

<style scoped lang="scss">
.uic-radio-button-group {
  &-legend {
    @apply type-small-600 text-gray-800;

    fieldset:disabled > & {
      @apply text-gray-500;
    }
  }

  &-container {
    &:not(.column) {
      @apply gap-5;
    }
    .column {
      @apply gap-2;
    }

    &:not(.spaceEvenly) {
      @apply flex items-start;

      &:not(.column) {
        @apply flex-row flex-wrap;
      }

      &.column {
        @apply flex-col gap-2;
      }
    }

    &.spaceEvenly {
      @apply grid;

      &:not(.vertical) {
        @apply grid-flow-col auto-cols-fr;
        grid-template-rows: 1fr;
      }

      &.vertical {
        @apply grid-flow-row auto-rows-fr;
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
