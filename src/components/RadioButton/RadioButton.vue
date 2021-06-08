<template>
  <div
    :class="[
      'inline-block mr-4 mt-1 cursor-pointer',
      { '!block mb-1': parent.props.separateLines },
      { 'cursor-not-allowed': disabled },
    ]"
  >
    <input
      :id="value"
      type="radio"
      :class="[
        'absolute m-0 p-0 w-0 h-0 opacity-0 pointer-events-none mt-2 radio__input',
        { 'radio__input--error': error },
      ]"
      :name="name"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      @input="onInput"
      @click="onClick"
    >
    <label
      :for="value"
      class="text-sm font-light relative inline-block cursor-pointer ml-6"
    >{{ label }}</label>
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
.radio__input {
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
    box-shadow: 0 0 4px var(--color-primary-rgb-xl);

    @apply bg-primary-500;
    @apply border-l;
  }

  &.radio__input--error + label::before {
    @apply border-error;
  }

  &:hover + label::before {
    box-shadow: 0 0 4px var(--color-primary-rgb-l);
  }

  &:focus + label::before {
    @apply border-primary-100;
  }

  &:disabled + label::before {
    @apply bg-white-300;
    @apply border-gray-100;
  }

  &:disabled + label::after {
    @apply hidden;
  }
}
</style>
