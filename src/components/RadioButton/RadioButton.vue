<template>
  <div class="inline-block mr-6 mt-1">
    <input
      :id="id"
      type="radio"
      :class="[
        'm-0 p-0 opacity-0 mt-2',
        {'radio__input--error': error},
        {'!cursor-not-allowed': disabled}
      ]"
      :name="name"
      :value="value.toString()"
      :checked="checked"
      :disabled="disabled"
      :required="required"
      @input="onInput"
      @click="onClick"
    >
    <label
      :for="id"
      :class="[
        'relative flex font-light',
        {'text-gray-100 !cursor-not-allowed': disabled},
        {'largeButton w-4/5 pt-2 ml-1' : large},
        {'largeHover' : largeHover},
        {'!pt-0.5 helperText' : large && helperText}
      ]"
    >
      <div class="ml-4">
        <slot>
          {{ label }}
        </slot>
      </div>
      <div
        :class="[
          'text-sm ml-4 text-gray-500 !font-normal',
          {'!text-error' : error},
          {'!text-primary-500' : checked},
          {'!text-gray-100' : disabled}
        ]"
      >
        {{ helperText }}
      </div>
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
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    helperText: {
      type: String,
      default: ''
    },
    large: {
      type: Boolean,
      default: false
    },
    largeChecked: {
      type: Boolean,
      default: false
    },
    largeHover: {
      type: Boolean,
      default: false
    },
    error: {
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
      return this.modelValue === this.value || this.largeChecked;
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
      top: 3px;
      left: -8px;

      @apply absolute;
      @apply bg-white;
      @apply border-gray-400;
      @apply border-solid;
      @apply border;
      @apply h-4;
      @apply rounded-lg;
      @apply w-4;
    }

    &::after {
      content: "";
      left: -3px;

      @apply top-[8px];
      @apply absolute;
      @apply h-1.5;
      @apply inline-block;
      @apply rounded-full;
      @apply w-1.5;
      @apply bg-white;
    }
  }

  + label.largeButton {
    &::before {
      @apply mt-2;
    }

    &::after {
      @apply mt-2;
    }
  }

  + label.helperText {
    &::before {
      @apply mt-0.5;
    }

    &::after {
      @apply mt-0.5;
    }
  }

  &:disabled + label::before {
    @apply border-gray-100;
  }

  &.radio__input--error + label::before {
    @apply border-red-500;
  }

  &.radio__input--error:checked + label::before {
    @apply border;
    @apply border-error;
  }

  &.radio__input--error:not(:checked) + label::before {
    @apply bg-red-50;
  }

  &.radio__input--error:not(:checked) + label::after {
    @apply bg-red-50;
  }

  &:checked:disabled + label::after {
    @apply bg-gray-100;
    @apply h-2;
    @apply w-2;
    @apply top-[7px];
  }

  &.radio__input--error:checked:not(:disabled) + label::before {
    @apply bg-red-500;
  }

  &.radio__input--error:checked:not(:disabled) + label::after {
    @apply bg-white;
  }

  &:checked:not(:disabled):not(.radio__input--error) + label::before {
    @apply bg-black;
    @apply border-black;
  }

  &:active:not(:disabled):not(.radio__input--error) + label::before {
    @apply outline-dotted;
    @apply outline-offset-1;
  }

  &.radio__input--error:focus + label.largeButton::before {
    @apply shadow-none;
  }

  &.radio__input--error:focus:checked + label.largeButton::before {
    @apply border-error;
  }

  &:hover:not(:disabled):not(:checked):not(.radio__input--error) + label::before {
    @apply border-gray-500;
    @apply bg-gray-50;
  }

  &:hover:not(:disabled):not(:checked):not(.radio__input--error) + label::after {
    @apply bg-gray-50;
  }

  &:not(:disabled):not(:checked):not(.radio__input--error) + label.largeHover::before {
    @apply shadow-input;
    @apply border-primary-500;
  }
}
</style>
