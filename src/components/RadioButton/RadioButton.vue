<template>
  <div :class="['tw-inline-block tw-mr-4 tw-mt-1 tw-cursor-pointer', {'tw-block tw-mb-1': this.$parent.separateLines}, {'tw-cursor-not-allowed': disabled}]">
    <input
      :id="value"
      type="radio"
      :class="['tw-absolute tw-m-0 tw-p-0 tw-w-0 tw-h-0 tw-opacity-0 tw-pointer-events-none tw-mt-2 radio__input', {'radio__input--error': error}]"
      :name="name"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      @input="onInput"
      @click="onClick"
    >
    <label
      :for="value"
      class="tw-text-sm tw-font-light tw-relative tw-inline-block tw-cursor-pointer tw-ml-6"
    >{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'RadioButton',
  model: {
    prop: 'modelValue',
    event: 'input'
  },
  props: {
    modelValue: {
      type: String,
      default: null
    },
    error: {
      type: Boolean,
      default: false
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
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    checked () {
      return this.modelValue === this.value;
    }
  },
  methods: {
    onInput () {
      this.$emit('input', this.value);
    },
    onClick ($event) {
      this.$emit('click', $event);
    }
  }
};
</script>

<style scoped lang="scss">
  .radio__input {
    + label::before {
      content: '';
      left: -20px;

      @apply tw-absolute;
      @apply tw-bg-transparent;
      @apply tw-border-gray-l;
      @apply tw-border-solid;
      @apply tw-border;
      @apply tw-h-3.5;
      @apply tw-inline-block;
      @apply tw-rounded-full;
      @apply tw-top-1;
      @apply tw-w-3.5;
    }

    + label::after {
      content: '';
      left: -18px;

      @apply tw-absolute;
      @apply tw-h-2.5;
      @apply tw-inline-block;
      @apply tw-rounded-full;
      @apply tw-top-1.5;
      @apply tw-w-2.5;
    }

    &:checked + label::after {
      box-shadow: 0 0 4px var(--color-primary-rgb-xl);

      @apply tw-bg-primary;
      @apply tw-border-l;
    }

    &.radio__input--error + label::before {
      @apply tw-border-error;
    }

    &:hover + label::before {
      box-shadow: 0 0 4px var(--color-primary-rgb-l);
    }

    &:focus + label::before {
      @apply tw-border-primary-xl;
    }

    &:disabled + label::before {
      @apply tw-bg-gray-xxl;
      @apply tw-border-gray-l;
    }

    &:disabled + label::after {
      @apply tw-hidden;
    }
  }
</style>
