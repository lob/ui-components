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
            <Check size="s" />
            <div class="ml-1.5">
              {{ copiedTooltipContent }}
            </div>
          </div>
          <div
            class="absolute bg-transparent w-0 h-0 m-auto border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-700 -bottom-2 left-0 right-0"
          />
        </div>
      </transition>
    </div>
    <div
      data-testId="input-container"
      :class="[
        'bg-white h-11 rounded flex items-center border border-gray-200',
        {
          'hover:border-gray-300 focus-within:border-[#2D2D2F] focus-within:hover:border-[#2D2D2F] focus-within:outline-black focus-within:outline-offset-1 focus-within:outline-1':
            !disabled && !readonly
        },
        { '!border-success-dark !bg-green-50': success },
        { '!border-error-dark !bg-red-50': error },
        { '!bg-gray-50': disabled || readonly || withCopyButton },
        { '!flex-wrap !h-fit': isMultiselect }
      ]"
    >
      <div
        v-if="hasLeftIcon"
        :class="[
          'pl-3 py-2',
          modelValue && !disabled ? 'text-gray-800' : 'text-gray-500',
          { 'text-success-dark': success },
          { 'text-error-dark': error },
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
          'px-3 py-2',
          `w-full text-gray-800 type-small-400 caret-gray-300 placeholder-gray-200 placeholder:type-small-400 outline-none ${inputClass}`,
          { nonErrorAutofill: !disabled && !readonly },
          { truncate: withCopyButton },
          { 'bg-green-50 !placeholder-success-dark': success },
          {
            'bg-red-50 !placeholder-error-dark !autofill:bg-red-50 errorAutofill':
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
        @input="handleInput"
        @focus="handleFocus"
        @blur="$emit('blur', $event)"
        @change="$emit('change', $event)"
        @invalid="$emit('invalid', $event.target)"
      />
      <button
        v-if="showClearButton && modelValue"
        :class="[
          'mr-3',
          modelValue && !disabled ? 'text-gray-800' : 'text-gray-500',
          { 'text-success': success },
          { 'text-error': error },
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
        v-if="hasRightIcon"
        :class="[
          'pr-3 py-2',
          modelValue && !disabled ? 'text-gray-800' : 'text-gray-500',
          { 'text-success': success },
          { 'text-error': error },
          { '!text-gray-300': disabled }
        ]"
      >
        <slot name="iconRight" />
      </div>
      <button
        v-if="withCopyButton"
        type="button"
        class="rounded-full mr-3 px-3 h-7 type-xs-700 bg-black text-white hover:bg-gray-700 focus-within:outline-1 focus-visible:outline-black focus-visible:outline-offset-1 active:bg-gray-800 focus:bg-gray-800"
        @click="copyToClipboard"
      >
        {{ copyButtonLabel }}
      </button>
    </div>
    <div
      v-if="helperText"
      :class="[
        'text-gray-500 type-xs-400 mt-1',
        { '!text-success-dark': success },
        { '!text-error-dark': error },
        { '!text-gray-500': disabled }
      ]"
    >
      {{ helperText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import LobLabel from '../Label/Label.vue';
import Check from '../Icons/Check.vue';
import XmarkLarge from '../Icons/XmarkLarge.vue';
import { computed, defineModel, defineOptions, defineSlots, ref } from 'vue';

defineOptions({ name: 'TextInput' });

const props = withDefaults(
  defineProps<{
    tooltipContent?: string | null;
    tooltipPosition?: 'leading' | 'trailing';
    id?: string;
    type?:
      | 'date'
      | 'email'
      | 'number'
      | 'password'
      | 'tel'
      | 'text'
      | 'url'
      | 'time';
    min?: number;
    max?: number;
    pattern?: string;
    label: string;
    srOnlyLabel?: boolean;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    error?: boolean;
    success?: boolean;
    readonly?: boolean;
    withCopyButton?: boolean;
    copyButtonLabel?: string;
    copiedTooltipContent?: string;
    selectOnClick?: boolean;
    inputClass?: string;
    helperText?: string;
    isMultiselect?: boolean;
    withClearButton?: boolean;
  }>(),
  {
    tooltipContent: null,
    tooltipPosition: 'trailing',
    id: undefined,
    type: 'text',
    min: undefined,
    max: undefined,
    pattern: undefined,
    srOnlyLabel: false,
    placeholder: undefined,
    disabled: false,
    required: false,
    error: false,
    success: false,
    readonly: false,
    withCopyButton: false,
    copyButtonLabel: 'Copy',
    copiedTooltipContent: 'Copied',
    selectOnClick: false,
    inputClass: '',
    helperText: '',
    isMultiselect: false,
    withClearButton: false
  }
);

const modelValue = defineModel<string | number | null>({ default: null });

const emit = defineEmits<{
  (e: 'input', value: string | number): void; // eslint-disable-line no-unused-vars
  (e: 'change', event: Event | MouseEvent): void; // eslint-disable-line no-unused-vars
  (e: 'focus', event: FocusEvent): void; // eslint-disable-line no-unused-vars
  (e: 'blur', event: FocusEvent): void; // eslint-disable-line no-unused-vars
  (e: 'copy'): void; // eslint-disable-line no-unused-vars
  (e: 'invalid', target: EventTarget | null): void; // eslint-disable-line no-unused-vars
}>();

const slots = defineSlots<{
  iconLeft?: () => any;
  iconRight?: () => any;
  selectedOptions?: () => any;
}>();

const showCopied = ref(false);

const hasLeftIcon = computed(() => Boolean(slots.iconLeft));
const hasRightIcon = computed(() => Boolean(slots.iconRight));
const showClearButton = computed(
  () =>
    props.withClearButton &&
    !props.isMultiselect &&
    !hasRightIcon.value &&
    !props.withCopyButton
);

const handleInput = (e: Event) => {
  modelValue.value = (e.target as HTMLInputElement)?.value;
  emit('input', (e.target as HTMLInputElement)?.value);
  emit('change', e);
};

const handleFocus = (e: FocusEvent) => {
  if (props.selectOnClick) {
    (e.target as HTMLInputElement)?.select();
  }
  emit('focus', e);
};

const copyToClipboard = () => {
  showCopied.value = true;
  // this.$refs.input.select();
  document.execCommand('copy');
  emit('copy');
  setTimeout(() => {
    showCopied.value = false;
  }, 1500);
};

const clearInput = (e: MouseEvent) => {
  e.preventDefault();
  // this.$refs.input.value = '';
  modelValue.value = '';
  emit('input', '');
  emit('change', e);
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
