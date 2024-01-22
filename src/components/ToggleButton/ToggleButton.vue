<template>
  <label
    :class="[
      'flex items-center relative h-6 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent',
      { 'cursor-not-allowed': disabled }
    ]"
  >
    <BaseCheckbox
      v-model="checkboxValue"
      class="sr-only pointer-events-none"
      :value="value"
      :name="name"
      :disabled="disabled"
      :required="required"
      @input="(checked) => $emit('input', checked)"
      @click="($event) => $emit('click', $event)"
    />
    <span
      :class="[
        'toggle w-8 h-4 mr-3.5 flex rounded-full bg-gray-100 border border-gray-100',
        { '!bg-white-300': disabled },
        { '!bg-gray-100 ': disabled && checked },
        { checked: checked },
        { '!bg-primary-500 !border-primary-500': checked && !disabled },
        { '!border-error': error }
      ]"
      data-testid="toggle"
    />
    <span :class="[{ 'sr-only': srOnlyLabel }]">
      {{ label }}
      <span v-if="required" class="text-sm text-error"> * </span>
    </span>
  </label>
</template>

<script>
import BaseCheckbox from '../Checkbox/BaseCheckbox.vue';

export default {
  name: 'ToggleButton',
  components: { BaseCheckbox },
  props: {
    modelValue: {
      type: [Array, Boolean],
      default: null
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: [String, Boolean],
      default: null
    },
    label: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    srOnlyLabel: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'input', 'click'],
  computed: {
    checkboxValue: {
      get() {
        return this.modelValue;
      },
      set(checked) {
        this.$emit('update:modelValue', checked);
      }
    },
    checked() {
      if (this.checkboxValue && typeof this.checkboxValue === 'object') {
        return this.checkboxValue.includes(this.value);
      }
      return this.checkboxValue;
    }
  }
};
</script>

<style scoped lang="scss">
.toggle::before {
  content: '';

  @apply absolute;
  @apply w-3;
  @apply h-3;
  @apply rounded-full;
  @apply bg-white;
  @apply top-1.5;
  @apply left-0.5;
  @apply z-10;
  @apply motion-safe:transition-transform;
  @apply motion-reduce:transition-none;
  @apply duration-200;
}

.toggle.checked::before {
  transform: translate(135%);
}

input:focus ~ .toggle {
  @apply outline-none;
  @apply ring-2;
  @apply ring-primary-100;
  @apply border-transparent;
}
</style>
