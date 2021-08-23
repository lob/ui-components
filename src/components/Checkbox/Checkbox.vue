<template>
  <label
    :class="[
      'checkbox relative block mt-0 mb-1 ml-6 mr-3 text-left min-h-5',
      { 'cursor-not-allowed': disabled },
      { 'inline-block': sameLine }
    ]"
  >
    <BaseCheckbox
      v-model="checkboxValue"
      class="absolute m-0 p-0 h-0 w-0 opacity-0 pointer-events-none"
      :value="value"
      :name="name"
      :disabled="disabled"
      :required="required"
      @input="(checked) => $emit('input', checked)"
      @click="($event) => $emit('click', $event)"
    />
    <span
      style="content: '';"
      :class="[
        'checkmark w-4 h-4 mr-1 rounded-sm border-solid border border-gray-100 -left-5 absolute top-1',
        { 'bg-white-300': disabled },
        { '!bg-gray-100': disabled && checked },
        { 'border-error': error },
        { 'border-primary-500 bg-primary-500': checked }
      ]"
      data-testId="checkmark"
    />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <span v-html="label" />
    <span
      v-if="required"
      class="text-sm text-turquoise-900"
    >
      *
    </span>
  </label>
</template>

<script>
import BaseCheckbox from './BaseCheckbox.vue';

export default {
  name: 'Checkbox',
  components: { BaseCheckbox },
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Boolean],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    sameLine: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [Array, Boolean],
      default: null
    }
  },
  emits: ['update:modelValue', 'input', 'click'],
  computed: {
    checkboxValue: {
      get () {
        return this.modelValue;
      },
      set (checked) {
        this.$emit('update:modelValue', checked);
      }
    },
    checked () {
      if (this.checkboxValue && typeof this.checkboxValue === 'object') {
        return this.checkboxValue.includes(this.value);
      }
      return this.checkboxValue;
    }
  }
};
</script>

<style scoped lang="scss">
.checkbox input:focus ~ .checkmark {
  @apply outline-none;
  @apply ring-2;
  @apply ring-primary-100;
  @apply border-transparent;
}

.checkbox:hover input:not(:disabled) ~ .checkmark {
  @apply shadow-input;
}

.checkmark::after {
  content: "";

  @apply absolute;
  @apply hidden;
}

.checkbox .checkmark::after {
  border-width: 0 3px 3px 0;
  top: 1px;
  width: 5px;
  height: 9px;
  left: 4px;

  @apply border-solid;
  @apply border-white;
  @apply transform;
  @apply rotate-45;
}

.checkbox input:checked ~ .checkmark::after {
  @apply block;
}
</style>
