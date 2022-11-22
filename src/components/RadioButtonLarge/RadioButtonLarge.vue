<template>
  <div
    :class="[
      'buttonContainer cursor-pointer border border-gray-300 rounded-sm py-3 h-12 mr-4 mb-1 focus-within:outline-1 focus-within:outline-dotted focus-within:outline-offset-1 focus:outline-black',
      fullWidth ? 'w-full' : 'w-[234px]',
      {'!h-[72px]' : !fullHeight && helperText},
      {'!h-full' : fullHeight},
      {'hover:border-gray-400': !disabled && !error},
      {'!border-black checked': checked && !disabled && !error},
      {'disabled !cursor-not-allowed border-gray-100': disabled},
      {'!border-red-500 radio__input--error': error && !disabled}
    ]"
    @click="onInput"
  >
    <input
      :id="id"
      ref="radioInput"
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
        'relative flex type-base-500 -top-[24px] left-[46px] cursor-pointer h-full pr-16',
        {'text-gray-400 !cursor-not-allowed': disabled},
        {'!-top-[22px]' : helperText}
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
            {'-mb-4' : helperText}
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
  name: 'RadioButtonLarge',
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
    error: {
      type: Boolean,
      default: false
    },
    fullHeight: {
      type: Boolean,
      default: false
    },
    fullWidth: {
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
      if (!this.disabled) {
        this.$emit('update:modelValue', this.value);
        this.$emit('input', this.value);
        this.$refs.radioInput.focus();
      }
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

      @apply top-2;
      @apply absolute;
      @apply h-1.5;
      @apply inline-block;
      @apply rounded-full;
      @apply w-1.5;
      @apply bg-white;
    }
  }

  &.radio__input--error + label::before {
    @apply border;
    @apply border-red-500;
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

  &.radio__input--error:not(:checked):not(:disabled) + label::before {
    @apply bg-red-50;
  }

  &.radio__input--error:not(:checked):not(:disabled) + label::after {
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
}

.buttonContainer:hover:not(.radio__input--error):not(.disabled):not(.checked) label::before {
  @apply border-gray-500;
  @apply bg-gray-50;
}

.buttonContainer:hover:not(.radio__input--error):not(.disabled):not(.checked) label::after {
  @apply bg-gray-50;
}
</style>
