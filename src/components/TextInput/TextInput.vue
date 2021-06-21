<template>
  <label
    v-bind="$attrs"
    :for="id"
    :class="['block mb-2 text-sm text-gray-500', {'sr-only': srOnlyLabel}]"
  >
    {{ label }}
  </label>
  <div
    v-bind="$attrs"
    :class="[
      'flex input rounded border border-gray-100',
      {'!border-0': withCopyButton}
    ]"
  >
    <div
      v-if="iconLeft"
      :class="['pl-2 pt-3 pb-4 text-gray-500', {'!pl-1 !py-2': small}]"
    >
      <slot name="iconLeft" />
    </div>
    <input
      :id="id"
      ref="input"
      :type="type"
      :value="modelValue"
      :class="[
        'rounded pl-2 pt-3 pb-4 leading-5 w-full text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent',
        {'!pl-4': !iconLeft},
        {'!pl-3 !pr-3 !py-2': small},
        {'border border-r-0 border-gray-100 rounded-tr-none rounded-br-none': withCopyButton},
        {'bg-white-300 cursor-not-allowed': disabled || readonly},
        {'border-error': error}
      ]"
      :disabled="disabled"
      :required="required"
      :placeholder="placeholder"
      :readonly="readonly"
      @input="onInput"
    >
    <div
      v-if="iconRight"
      :class="['pr-2 pt-3 pb-4 text-gray-500', {'!pr-1 !py-2': small}]"
    >
      <slot name="iconRight" />
    </div>
    <lob-button
      v-if="withCopyButton"
      :small="small"
      class="rounded-tl-none rounded-bl-none pl-3 pr-3"
      @click="copyToClipboard"
    >
      Copy
    </lob-button>
  </div>
</template>

<script>
import LobButton from './../Button/Button.vue';

export default {
  name: 'TextInput',
  components: {
    LobButton
  },
  props: {
    modelValue: {
      type: String,
      default: null
    },
    id: {
      type: String,
      default: '',
      required: true
    },
    type: {
      type: String,
      default: 'text',
      validator: function (value) {
        return ['date', 'email', 'number', 'tel', 'text', 'url'].includes(value);
      }
    },
    // Used by number inputs.
    min: {
      type: String,
      default: null
    },
    // Used by number inputs.
    max: {
      type: String,
      default: null
    },
    // Used by tel inputs.
    pattern: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    srOnlyLabel: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['default', 'small'].includes(value);
      }
    },
    readonly: {
      type: Boolean,
      default: false
    },
    withCopyButton: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'input', 'change'],
  computed: {
    small () {
      return this.size === 'small';
    },
    iconLeft () {
      return this.$slots.iconLeft;
    },
    iconRight () {
      return this.$slots.iconRight;
    }
  },
  methods: {
    copyToClipboard () {
      this.$refs.input.select();
      document.execCommand('copy');
    },
    onInput ($event) {
      this.$emit('update:modelValue', $event.target.value);
      this.$emit('input', $event.target.value);
      this.$emit('change', $event);
    }
  }
};
</script>

<style scoped lang="scss">
  .input {
    &:hover:not(:disabled):not(:focus) {
      box-shadow: 0 5px 14px rgba(44, 67, 81, 0.13), 0 0 4px rgba(44, 67, 81, 0.02);
    }
  }

  .input::placeholder {
    @apply text-gray-100;
  }
</style>
