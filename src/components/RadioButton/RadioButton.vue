<template>
  <div
    :class="[
      'inline-block mr-4 mt-1',
      { '!block mb-1': parent.props.separateLines },
      { 'cursor-not-allowed': disabled || readonly }
    ]"
  >
    <input
      :id="id"
      type="radio"
      :class="[
        'm-0 p-0 opacity-0 mt-2',
        { 'radio__input--error': error },
        { 'cursor-not-allowed': disabled || readonly }
      ]"
      :name="name"
      :value="value.toString()"
      :checked="checked"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      @input="onInput"
      @click="onClick"
    >
    <label
      :for="id"
      :class="[
        'relative flex ml-1.5',
        { 'cursor-not-allowed': disabled || readonly },
        { 'font-bold' : checked}
      ]"
    >
      <slot>
        {{ label }}
      </slot>
    </label>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue';

export default {
  name: 'RadioButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return ['primary', 'box'].includes(value);
      }
    },
    id: {
      type: String,
      required: true
    },
    modelValue: {
      type: [String, Boolean],
      default: null
    },
    name: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Boolean],
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
    },
    box () {
      return this.variant === 'box';
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
  + label {
    @apply relative;
    @apply inline-block;
    @apply cursor-pointer;

    &::before {
      content: "";
      top: 5px;
      left: -19px;

      @apply absolute;
      @apply bg-transparent;
      @apply border-gray-100;
      @apply border-solid;
      @apply border;
      @apply h-3.5;
      @apply inline-block;
      @apply rounded-full;
      @apply w-3.5;
    }

    &::after {
      content: "";

      @apply -left-4;
      @apply top-2;
      @apply absolute;
      @apply h-2;
      @apply inline-block;
      @apply rounded-full;
      @apply w-2;
    }
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
    @apply cursor-not-allowed;
  }

  &:checked:disabled + label::after {
    @apply bg-flint-500;
    @apply border-flint-700;
    @apply opacity-50;
    @apply cursor-not-allowed;
  }

  &[readonly] + label::before {
    @apply bg-white-300;
    @apply border-gray-100;
    @apply cursor-not-allowed;
  }

  &:checked[readonly] + label::after {
    @apply bg-flint-500;
    @apply border-flint-700;
    @apply opacity-50;
    @apply cursor-not-allowed;
  }

  &:hover:not(:disabled):not([readonly]) + label::before {
    @apply shadow-input;
  }
}
</style>
