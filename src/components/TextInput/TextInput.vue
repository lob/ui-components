<template>
  <div :class="{ 'relative': withCopyButton }">
    <lob-label
      v-if="label"
      :label="label"
      :label-for="id"
      :required="required"
      :sr-only-label="srOnlyLabel"
      :tooltip-content="tooltipContent"
      :disabled="disabled"
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
        'h-12 pl-4 pr-4 py-2.5 rounded-lg flex items-center border gap-2 border-gray-100 focus-within:ring-inset focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-0 focus-within:outline-none',
        { '!pl-3 !pr-3 !h-8 !gap-1' : small },
        {'hover:shadow focus-within:shadow': !disabled && !readonly},
        {'!border-coral-700 bg-coral-100': error},
        {'!bg-white-100' : disabled},
        {'!bg-white-100' : withCopyButton},
        {'!flex-wrap !h-fit' : isMultiselect},
        {'!border-gray-500' : modelValue && !error && !withCopyButton}
      ]"
    >
      <div
        v-if="iconLeft"
        :class="['text-gray-500']"
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
          `leading-5 w-full text-gray-900 placeholder-gray-500 placeholder:font-light outline-none ${inputClass}`,
          {'nonErrorAutofill' : !disabled && !readonly},
          {'text-xs': small},
          {'truncate': withCopyButton},
          {'bg-white-100 cursor-not-allowed !text-gray-100 !placeholder-gray-100': disabled || readonly},
          {'bg-coral-100 !placeholder-error !text-error !autofill:bg-coral-100 errorAutofill': error}
        ]"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :readonly="readonly"
        @input="onInput"
        @focus="onFocus"
        @change="onChange"
      >
      <div
        v-if="showClearButton"
        :class="['text-gray-500']"
      >
        <button
          class="flex justify-center items-center"
          variant="none"
          @click="clearInput"
        >
          <Close
            :class="[
              'h-[18px] w-[18px] cursor-pointer',
              { 'bg-white-100' : disabled },
              { 'bg-coral-100' : error }
            ]"
          />
        </button>
      </div>
      <div
        v-if="iconRight"
        :class="['text-gray-500']"
      >
        <slot name="iconRight" />
      </div>
      <button
        v-if="withCopyButton"
        type="button"
        :class="['rounded-lg text-white bg-primary-500 px-3 !h-8 text-sm', {'!h-6 text-xs' : small}]"
        @click="copyToClipboard"
      >
        Copy
      </button>
    </div>
    <div
      v-if="helperText"
      :class="[
        'text-gray-500 text-xs pt-1',
        {'text-error' : error},
        {'text-gray-100' : disabled}
      ]"
    >
      {{ helperText }}
    </div>
  </div>
</template>

<script>
import LobLabel from '../LobLabel/LobLabel.vue';
import Check  from '../Icons/Check.vue';
import Close  from '../Icons/Close.vue';

export default {
  name: 'TextInput',
  components: {
    LobLabel,
    Check,
    Close
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
    helperText: {
      type: String,
      default: ''
    },
    isMultiselect: {
      type: Boolean,
      default: false
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
    },
    showClearButton () {
      return !this.isMultiselect && !this.iconRight && !this.withCopyButton;
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
    },
    clearInput ($event) {
      this.$refs.input.value = '';
      this.$emit('update:modelValue', '');
      this.$emit('input', '');
      this.$emit('change', $event);
    }
  }
};
</script>

<style scoped>
.nonErrorAutofill:-webkit-autofill,
.nonErrorAutofill:-webkit-autofill:hover,
.nonErrorAutofill:-webkit-autofill:focus,
.nonErrorAutofill:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
  box-shadow: 0 0 0 30px white inset !important;
}

.errorAutofill:-webkit-autofill,
.errorAutofill:-webkit-autofill:hover,
.errorAutofill:-webkit-autofill:focus,
.errorAutofill:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #f8e7e6 inset !important;
  box-shadow: 0 0 0 30px #f8e7e6 inset !important;
}

</style>
