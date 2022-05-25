<template>
  <div
    :class="[
      'inline-block mr-4 mt-1',
      { '!block mb-1': parent.props.separateLines },
      { 'cursor-not-allowed': disabled || readonly },
      {'border border-gray-100' : large}
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
        'relative flex',
        { 'cursor-not-allowed': disabled || readonly },
        { 'font-bold text-primary-500' : checked}
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
    },
    size: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['default', 'large'].includes(value);
      }
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
    large () {
      return this.size === 'large';
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
      @apply border-gray-700;
      @apply border-solid;
      @apply border;
      @apply h-3.5;
      @apply inline-block;
      @apply rounded-full;
      @apply w-3.5;
    }

    &::after {
      content: "";

      @apply -left-4.5;
      @apply top-1.5;
      @apply absolute;
      @apply h-3;
      @apply inline-block;
      @apply rounded-full;
      @apply w-3;
    }
  }

  &:checked + label::after {
    @apply bg-primary-500;
  }

  &:checked:not(:disabled) + label::before {
    @apply border-transparent;
    @apply shadow-input;
  }

  &.radio__input--error + label::before {
    @apply border-error;
  }

  &:focus + label::before {
    @apply outline-none;
    @apply border-primary-500;
    @apply ring-4;
    @apply ring-tertiary-bluebird;
  }

  &:focus:checked + label::before {
    @apply border-transparent;
  }

  &:disabled + label::before {
    @apply border-gray-100;
    @apply cursor-not-allowed;
  }

  &:checked:disabled + label::after {
    @apply bg-gray-100;
    @apply cursor-not-allowed;
    @apply h-2.5;
    @apply w-2.5;
    @apply top-[7px];
    @apply -left-[17px];
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

  &:hover:not(:disabled):not([readonly]):not(:checked) + label::before {
    @apply shadow-input;
    @apply border-primary-500;
  }
}
</style>
