<template>
  <fieldset :disabled>
    <legend
      v-if="label"
      data-testid="uic-radio-button-group-legend"
      :class="['uic-radio-button-group-legend', { 'sr-only': srLabel }]"
    >
      {{ label }}
      <span v-if="required" class="text-error">*</span>
    </legend>

    <div
      :class="[
        'uic-radio-button-group-container',
        { vertical, 'mt-2': !srLabel }
      ]"
    >
      <slot></slot>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    disabled?: boolean;
    label?: string;
    /** Simply adds an asterisk to the `legend`, does not enforce required on `RadioButton`s. */
    required?: boolean;
    srLabel?: boolean;
    vertical?: boolean;
  }>(),
  {
    disabled: false,
    label: undefined,
    required: false,
    srLabel: false,
    vertical: false
  }
);
</script>

<style scoped lang="scss">
.uic-radio-button-group {
  &-legend {
    @apply type-small-700 text-gray-800;

    fieldset:disabled > & {
      @apply text-gray-500;
    }
  }

  &-container {
    @apply flex items-start;

    &:not(.vertical) {
      @apply flex-row gap-10;
    }

    &.vertical {
      @apply flex-col gap-2;
    }
  }
}
</style>
