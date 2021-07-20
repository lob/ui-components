<template>
  <div
    :class="[
      'inline-block mr-4 mt-1',
      { '!block mb-1': parent.props.separateLines },
      { 'cursor-not-allowed': disabled || readonly }
    ]"
  >
    <input
      :id="value"
      type="radio"
      :class="[
        'absolute m-0 p-0 w-0 h-0 opacity-0 pointer-events-none mt-2',
        { 'radio__input--error': error },
        { 'cursor-not-allowed': disabled || readonly }
      ]"
      :name="name"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      @input="onInput"
      @click="onClick"
    >
    <label
      :for="value"
      :class="[
        'text-sm font-light relative inline-block ml-6',
        { 'cursor-not-allowed': disabled || readonly }
      ]"
    >
      {{ label }}
      <slot />
    </label>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue';

export default {
  name: 'RadioButton',
  props: {
    modelValue: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    error: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'input', 'click'],
  data () {
    return {
      parent: null
    };
  },
  computed: {
    checked () {
      return this.modelValue === this.value;
    }
  },
  created () {
    this.parent = getCurrentInstance().parent;
  },
  methods: {
    onInput () {
      this.$emit('update:modelValue', this.value);
      this.$emit('input', this.value);
    },
    onClick ($event) {
      this.$emit('click', $event);
    }
  }
};
</script>

<style scoped lang="scss">
input {
  + label::before {
    content: "";
    left: -20px;

    @apply absolute;
    @apply bg-transparent;
    @apply border-gray-100;
    @apply border-solid;
    @apply border;
    @apply h-3.5;
    @apply inline-block;
    @apply rounded-full;
    @apply top-1;
    @apply w-3.5;
  }

  + label::after {
    content: "";
    left: -18px;

    @apply absolute;
    @apply h-2.5;
    @apply inline-block;
    @apply rounded-full;
    @apply top-1.5;
    @apply w-2.5;
  }

  &:checked + label::after {
    @apply shadow-input-selected;
    @apply bg-primary-500;
    @apply border-l;
  }

  &.radio__input--error + label::before {
    @apply border-error;
  }

  &:focus + label::before {
    @apply outline-none;
    @apply ring-2;
    @apply ring-primary-100;
    @apply border-transparent;
  }

  &:disabled + label::before {
    @apply bg-white-300;
    @apply border-gray-100;
  }

  &:disabled + label::after {
    @apply hidden;
  }

  &[readonly] + label::before {
    @apply bg-white-300;
    @apply border-gray-100;
  }

  &[readonly] + label::after {
    @apply hidden;
  }

  &:hover:not(:disabled):not([readonly]) + label::before {
    @apply shadow-input;
  }
}
</style>
