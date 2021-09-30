<template>
  <div>
    <lob-label
      v-if="label"
      :label="label"
      :label-for="id"
      :required="required"
      :sr-only-label="srOnlyLabel"
    />
    <div
      data-testId="input-container"
      :class="[
        'rounded border border-gray-100 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-100 focus-within:border-transparent',
        {'flex items-center': !selectedOptions},
        {'!border-0': withCopyButton},
        {'hover:shadow': !disabled && !readonly},
        {'border-error': error}
      ]"
    >
      <div
        v-if="iconLeft"
        :class="['pl-2 pt-3 pb-3 text-gray-500', {'!pl-1 !py-2': small}]"
      >
        <slot name="iconLeft" />
      </div>
      <slot name="selectedOptions" />
      <input
        :id="id"
        ref="input"
        :type="type"
        :value="modelValue"
        :min="min"
        :max="max"
        :pattern="pattern"
        :class="[
          `rounded pl-2 pt-3 pb-3 leading-5 w-full text-gray-500 placeholder-gray-100 outline-none ${inputClass}`,
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
        @focus="onFocus"
      >
      <div
        v-if="iconRight"
        :class="['pr-2 pt-3 pb-3 text-gray-500', {'!pr-1 !py-2': small}]"
      >
        <slot name="iconRight" />
      </div>
      <button
        v-if="withCopyButton"
        :class="['rounded-tr-md rounded-br-md text-white bg-primary-500 border px-3',
                 { 'h-12': !small },
                 { 'h-10': small }
        ]"
        @click="copyToClipboard"
      >
        Copy
      </button>
    </div>
  </div>
</template>

<script>
import LobLabel from '../LobLabel/LobLabel.vue';

export default {
  name: 'TextInput',
  components: {
    LobLabel
  },
  props: {
    modelValue: {
      type: String,
      default: null
    },
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text',
      validator: function (value) {
        return ['date', 'email', 'number', 'password', 'tel', 'text', 'url', 'time'].includes(value);
      }
    },
    // Used by number inputs.
    min: {
      type: Number,
      default: null
    },
    // Used by number inputs.
    max: {
      type: Number,
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
      default: null
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
    },
    selectOnClick: {
      type: Boolean,
      default: false
    },
    inputClass: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'input', 'change', 'focus', 'copy'],
  computed: {
    small () {
      return this.size === 'small';
    },
    iconLeft () {
      return this.$slots.iconLeft;
    },
    iconRight () {
      return this.$slots.iconRight;
    },
    selectedOptions () {
      return this.$slots.selectedOptions;
    }
  },
  methods: {
    copyToClipboard () {
      this.$refs.input.select();
      document.execCommand('copy');
      this.$emit('copy');
    },
    onInput ($event) {
      this.$emit('update:modelValue', $event.target.value);
      this.$emit('input', $event.target.value);
      this.$emit('change', $event);
    },
    onFocus ($event) {
      if (this.selectOnClick) {
        this.$refs.input.select();
      }
      this.$emit('focus', $event);
    },
    focus () {
      this.$refs.input.focus();
    }
  }
};
</script>
