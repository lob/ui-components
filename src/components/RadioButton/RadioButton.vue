<template>
  <div
    :class="[
      'inline-block mr-6 mt-1',
      {'!block mb-1': parent.props.separateLines}
    ]"
  >
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
        'relative flex',
        {'text-gray-100 font-light !cursor-not-allowed': disabled},
        {'font-bold text-primary-500' : checked && !disabled && !error},
        {'largeButton w-4/5 h-full pt-2' : large},
        {'!font-light' : large && disabled},
        {'!pt-0.5 helperText' : large && helperText},
        {'text-coral-900' : error}
      ]"
    >
      <slot>
        {{ label }}
      </slot>
      <div
        :class="[
          'text-sm text-gray-300 !font-normal',
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
      // return true;
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
      left: -22px;

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

      @apply -left-[21px];
      @apply top-1.5;
      @apply absolute;
      @apply h-3;
      @apply inline-block;
      @apply rounded-full;
      @apply w-3;
    }
  }

  + label.largeButton {
    @apply !absolute;

    &::before {
      @apply mt-2;
    }

    &::after {
      @apply mt-2;
    }
  }

  + label.helperText {
    @apply !absolute;

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

  &:checked:not(:disabled) + label::before {
    @apply border-transparent;
    @apply shadow-input;
  }

  &:checked:not(:disabled) + label::after {
    @apply bg-primary-500;
  }

  &:checked:disabled + label::after {
    @apply bg-gray-100;
    @apply h-2.5;
    @apply w-2.5;
    @apply top-[7px];
    @apply -left-[20px];
  }

  &:focus + label::before {
    @apply ring-4;
    @apply ring-tertiary-bluebird;
    @apply border-primary-500;
  }

  &:focus:checked + label::before {
    @apply border-transparent;
  }

  &:focus + label.largeButton::before {
    @apply ring-0;
    @apply shadow-input;
  }

  &:focus.radio__input--error + label.largeButton::before {
    @apply shadow-none;
  }

  &:focus:checked + label.largeButton::before {
    @apply border-transparent;
  }

  &:focus:checked.radio__input--error + label.largeButton::before {
    @apply border-error;
  }

  &:hover:not(:disabled):not(:checked):not(.radio__input--error) + label::before {
    @apply shadow-input;
    @apply border-primary-500;
  }

  &.radio__input--error + label::before {
    @apply border-error;
  }

  &.radio__input--error:checked + label::before {
    @apply border-error;
    @apply !shadow-none;
  }

  &.radio__input--error:checked:focus + label::before {
    @apply border-transparent;
  }

  &.radio__input--error:checked + label::after {
    @apply bg-error;
    @apply h-2.5;
    @apply w-2.5;
    @apply top-[7px];
    @apply -left-[20px];
  }
}
</style>

// defaults
// focus
// disabled
// readonly
// checked
// custom classes

// before
// after
