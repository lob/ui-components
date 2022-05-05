<template>
  <div :class="{ 'relative': withCopyButton }">
    <lob-label
      v-if="label"
      :label="label"
      :label-for="id"
      :required="required"
      :sr-only-label="srOnlyLabel"
      :tooltip-content="tooltipContent"
    />
    <div
      v-if="withCopyButton"
      aria-role="alert"
      aria-live="polite"
      :class="['absolute -top-4 ml-20',
               {'-top-11': srOnlyLabel }]"
    >
      <transition
        enter-active-class="duration-1000 ease-out"
        enter-from-class="opacity-0 transform translate-y-2"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="duration-500 ease-out"
        leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform translate-y-2"
      >
        <div
          v-if="showCopied"
          data-testId="copiedTip"
          class="z-10 w-20 p-2 text-xs rounded-md bg-gray-700 text-white"
        >
          <div class="flex">
            <Check class="h-4 w-4" />
            <div class="ml-1.5">
              Copied
            </div>
          </div>
          <div class="absolute bg-transparent w-0 h-0 m-auto border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-700 -bottom-2 left-0 right-0" />
        </div>
      </transition>
    </div>
    <div
      data-testId="input-container"
      :class="[
        `rounded-lg border border-gray-100 focus-within:outline-none focus-within:ring-primary-100 focus-within:border-transparent ${containerClass}  `,
        {'flex items-center': !selectedOptions},
        {'!border-0': withCopyButton},
        {'hover:shadow': !disabled && !readonly},
        {'border-error': error},
        {'bg-white-100': disabled},
        {'focus-within:ring-2': !containerClass}
      ]"
    >
      <div
        v-if="iconLeft"
        :class="['pl-2 pt-2 pb-2 text-gray-500', {'!pl-1 !py-2': small}]"
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
          `rounded-lg pl-2 pt-2 pb-2 leading-4 w-full text-gray-500 placeholder-gray-500 outline-none ${inputClass}`,
          {'!pl-4': !iconLeft},
          {'!pl-3 !pr-3 !py-2': small},
          {'border border-r-0 border-gray-100 rounded-tr-none rounded-br-none truncate': withCopyButton},
          {'border-gray-100 bg-white-100 cursor-not-allowed placeholder-gray-100': disabled || readonly},
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
        :class="['pr-2 pt-2 pb-2 text-gray-500', {'!pr-1 !py-2': small}]"
      >
        <slot name="iconRight" />
      </div>
      <button
        v-if="withCopyButton"
        type="button"
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
import Check  from '../Icons/Check.vue';

export default {
  name: 'TextInput',
  components: {
    LobLabel,
    Check
  },
  props: {
    tooltipContent: {
      type: String,
      default: null
    },
    modelValue: {
      type: [String, Number],
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
      required: true
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
    },
    containerClass: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'input', 'change', 'focus', 'copy'],
  data () {
    return {
      showCopied: false
    };
  },
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
      this.showCopied = true;
      this.$refs.input.select();
      document.execCommand('copy');
      this.$emit('copy');
      this.copied = true;
      setTimeout(() => {
        this.showCopied = false;
      }, 1500);
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
