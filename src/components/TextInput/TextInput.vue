<template>
  <label class="flex flex-col">
    <span
      :class="['mb-2 text-sm text-gray-500', {'sr-only': srOnlyLabel}]"
    >
      {{ label }}
      <span
        v-if="required"
        class="text-sm text-turquoise-900"
      >
        *
      </span>
    </span>
    <div
      data-testId="input-container"
      :class="[
        'flex rounded border border-gray-100 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-100 focus-within:border-transparent',
        {'!border-0': withCopyButton},
        {'hover:shadow': !disabled && !readonly},
        {'border-error': error}
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
        :min="min"
        :max="max"
        :pattern="pattern"
        :class="[
          'rounded pl-2 pt-3 pb-4 leading-5 w-full text-gray-500 outline-none',
          {'!pl-4': !iconLeft},
          {'!pl-3 !pr-3 !py-2': small},
          {'border border-r-0 border-gray-100 rounded-tr-none rounded-br-none': withCopyButton},
          {'bg-white-300 cursor-not-allowed': disabled || readonly}
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
  </label>
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
        return ['date', 'email', 'number', 'password', 'tel', 'text', 'url'].includes(value);
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
  input::placeholder {
    @apply text-gray-100;
  }
</style>
