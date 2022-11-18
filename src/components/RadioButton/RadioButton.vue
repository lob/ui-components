<template>
  <div
    :class="[
      'inline-block mr-14',
      {'-mb-[12px]' : !large}
    ]"
  >
    <input
      :id="id"
      type="radio"
      :class="[
        'mb-0 p-0 opacity-0',
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
        'relative flex type-base-500 -top-[25px] left-[31px] cursor-pointer',
        {'text-gray-400 !cursor-not-allowed': disabled},
        {'left-[47px] largeButton' : large},
        {'largeHover' : largeHover},
        {'helperText' : large && helperText},
        {'largeActive' : largeActive}
      ]"
    >
      <div>
        <slot>
          {{ label }}
        </slot>
        <div
          :class="[
            'type-xs-400 text-gray-500',
            {'!text-gray-300' : disabled},
            {'pr-[16px]' : large},
            {'-mb-[16px]' : large && fullHeight}
          ]"
        >
          {{ helperText }}
        </div>
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
    largeActive: {
      type: Boolean,
      default: false
    },
    fullHeight: {
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
    &::before {
      content: "";
      top: 3px;
      left: -22px;

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
      left: -17px;

      @apply top-[8px];
      @apply absolute;
      @apply h-1.5;
      @apply inline-block;
      @apply rounded-full;
      @apply w-1.5;
      @apply bg-white;
    }
  }

  &:disabled:not(:checked) + label::before {
    @apply border-gray-300;
    @apply bg-gray-50;
  }

  &:disabled:not(:checked) + label::after {
    @apply bg-gray-50;
  }

  &:disabled:checked + label::before {
    @apply border-gray-300;
    @apply bg-gray-300;
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
    @apply border-gray-500;
    @apply bg-gray-50;
  }

  &:not(:disabled):not(:checked):not(.radio__input--error) + label.largeActive::before {
    @apply outline-dotted;
    @apply outline-offset-1;
  }

  &:not(:disabled):not(:checked):not(.radio__input--error) + label.largeHover::after {
    @apply bg-gray-50;
  }
}
</style>
