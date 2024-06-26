<template>
  <div :class="{ relative: withCopyButton }">
    <LobLabel
      v-if="label"
      :label="label"
      :label-for="id"
      :required="required"
      :sr-only-label="srOnlyLabel"
      :tooltip-content="tooltipContent"
      :tooltip-position="tooltipPosition"
    />
    <div
      v-if="withCopyButton"
      aria-role="alert"
      aria-live="polite"
      :class="['absolute -top-4 ml-20', { '-top-11': srOnlyLabel }]"
    >
      <Transition
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
            <Check size="s" />
            <div class="ml-1.5">
              {{ copiedTooltipContent }}
            </div>
          </div>
          <div
            class="absolute bg-transparent w-0 h-0 m-auto border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-700 -bottom-2 left-0 right-0"
          />
        </div>
      </Transition>
    </div>
    <div
      data-testId="input-container"
      :class="[
        'bg-white h-11 rounded flex items-center gap-2 border border-gray-200',
        {
          'hover:border-gray-300 focus-within:border-[#2D2D2F] focus-within:hover:border-[#2D2D2F] focus-within:outline-black focus-within:outline-offset-1 focus-within:outline-1':
            !disabled && !readonly
        },
        { '!border-green-700 !bg-green-50': success },
        { '!border-red-600 !bg-red-50': error },
        { '!bg-gray-50': disabled || readonly || withCopyButton },
        { '!flex-wrap !h-fit': isMultiselect }
      ]"
    >
      <div
        v-if="iconLeft"
        :class="[
          'pl-3 py-2',
          modelValue && !disabled ? 'text-gray-800' : 'text-gray-500',
          { 'text-green-700': success },
          { 'text-red-600': error },
          { '!text-gray-300': disabled }
        ]"
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
          `w-full text-gray-800 type-small-400 caret-gray-300 placeholder-gray-200 placeholder:type-small-400 outline-none px-3 py-2 ${inputClass}`,
          { nonErrorAutofill: !disabled && !readonly },
          { truncate: withCopyButton },
          { 'bg-green-50 !placeholder-green-700': success },
          {
            'bg-red-50 !placeholder-red-600 !autofill:bg-red-50 errorAutofill':
              error
          },
          {
            'bg-gray-50 cursor-not-allowed !text-gray-300 !placeholder-gray-300':
              disabled || readonly
          }
        ]"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :readonly="readonly"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange"
        @invalid="onInvalid"
      />
      <button
        v-if="showClearButton && modelValue"
        :class="[
          'pr-3 py-2',
          modelValue && !disabled ? 'text-gray-800' : 'text-gray-500',
          { 'text-green-700': success },
          { 'text-red-600': error },
          { '!text-gray-300': disabled }
        ]"
        @click="clearInput"
      >
        <XmarkLarge
          :class="[
            'h-3.5',
            'cursor-pointer',
            { 'bg-white-100': disabled },
            { 'bg-coral-100': error }
          ]"
        />
      </button>
      <div
        v-if="iconRight"
        :class="[
          'pr-3 py-2',
          modelValue && !disabled ? 'text-gray-800' : 'text-gray-500',
          { 'text-green-700': success },
          { 'text-red-600': error },
          { '!text-gray-300': disabled }
        ]"
      >
        <slot name="iconRight" />
      </div>
      <button
        v-if="withCopyButton"
        type="button"
        class="mr-3 my-2 rounded-full px-3 h-7 type-xs-700 bg-black text-white hover:bg-gray-700 focus-within:outline-1 focus-visible:outline-black focus-visible:outline-offset-1 active:bg-gray-800 focus:bg-gray-800"
        @click="copyToClipboard"
      >
        {{ copyButtonLabel }}
      </button>
    </div>
    <div
      v-if="helperText"
      :class="[
        'text-gray-500 type-xs-400 mt-1',
        { 'text-green-700': success },
        { 'text-red-600': error },
        { '!text-gray-500': disabled }
      ]"
    >
      {{ helperText }}
    </div>
  </div>
</template>

<script>
import LobLabel from '../Label/Label.vue';
import Check from '../Icons/Check.vue';
import XmarkLarge from '../Icons/XmarkLarge.vue';

export default {
  name: 'TextInput',
  components: { LobLabel, Check, XmarkLarge },
  props: {
    tooltipContent: {
      type: String,
      default: null
    },
    tooltipPosition: {
      type: String,
      default: 'trailing',
      validator: function (value) {
        return ['leading', 'trailing'].includes(value);
      }
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
        return [
          'date',
          'email',
          'number',
          'password',
          'tel',
          'text',
          'url',
          'time'
        ].includes(value);
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
    success: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    withCopyButton: {
      type: Boolean,
      default: false
    },
    copyButtonLabel: {
      type: String,
      default: 'Copy'
    },
    copiedTooltipContent: {
      type: String,
      default: 'Copied'
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
    },
    withClearButton: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'update:modelValue',
    'input',
    'change',
    'focus',
    'blur',
    'copy',
    'invalid'
  ],
  data() {
    return {
      showCopied: false
    };
  },
  computed: {
    iconLeft() {
      return this.$slots.iconLeft;
    },
    iconRight() {
      return this.$slots.iconRight;
    },
    selectedOptions() {
      return this.$slots.selectedOptions;
    },
    showClearButton() {
      return (
        this.withClearButton &&
        !this.isMultiselect &&
        !this.iconRight &&
        !this.withCopyButton
      );
    }
  },
  methods: {
    copyToClipboard() {
      this.showCopied = true;
      this.$refs.input.select();
      document.execCommand('copy');
      this.$emit('copy');
      this.copied = true;
      setTimeout(() => {
        this.showCopied = false;
      }, 1500);
    },
    onInput($event) {
      this.$emit('update:modelValue', $event.target.value);
      this.$emit('input', $event.target.value);
      this.$emit('change', $event);
    },
    onFocus($event) {
      if (this.selectOnClick) {
        this.$refs.input.select();
      }
      this.$emit('focus', $event);
    },
    onBlur($event) {
      this.$emit('blur', $event);
    },
    onInvalid($event) {
      this.$emit('invalid', $event.target);
    },
    focus() {
      this.$refs.input.focus();
    },
    clearInput($event) {
      $event.preventDefault();
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
