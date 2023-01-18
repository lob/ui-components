<template>
  <div class="customOutline py-1 mr-5 relative">
    <input
      :id="id"
      type="radio"
      :class="[
        'absolute opacity-0',
        {'radio__input--error': error},
        {'!cursor-not-allowed': disabled}
      ]"
      :name="name"
      :value="value.toString()"
      :checked="checked"
      :disabled="disabled"
      :required="required"
      :readonly="readonly"
      @input="onInput"
      @click="onClick"
    >
    <label
      :for="id"
      :class="[
        'relative flex type-base-500 left-[31px] pr-10 cursor-pointer',
        {'text-gray-400 !cursor-not-allowed': disabled}
      ]"
    >
      <div>
        <slot>
          {{ label }}
        </slot>
        <div
          v-if="helperText"
          :class="[
            'type-xs-400 text-gray-500',
            {'!text-gray-300' : disabled}
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
    error: {
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

  &:hover:not(:disabled):not(:checked):not(.radio__input--error) + label::before {
    @apply border-gray-500;
    @apply bg-gray-50;
  }

  &:hover:not(:disabled):not(:checked):not(.radio__input--error) + label::after {
    @apply bg-gray-50;
  }
}

.customOutline:has(:focus-visible) {
  @apply outline-1;
  @apply outline-dashed;
  @apply outline-black;
  @apply outline-offset-1;
}
</style>
