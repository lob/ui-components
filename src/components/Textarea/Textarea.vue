<template>
  <div>
    <lob-label
      v-if="label"
      :label="label"
      :label-for="id"
      :required="required"
      :sr-only-label="srOnlyLabel"
      :tooltip-content="tooltipContent"
      :tooltip-position="tooltipPosition"
    />
    <textarea
      :id="id"
      :value="modelValue"
      :name="name"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :class="[
        `p-3 w-full rounded-sm text-gray-800 type-small-400 border border-gray-200 ${inputClass}`,
        `caret-gray-300 placeholder-gray-200 placeholder:type-small-400`,
        { 'hover:border-gray-300 focus:border-blue-500 focus:hover:border-blue-500 focus:outline-dashed focus:outline-black focus:outline-offset-1': !disabled && !readonly },
        { 'text-green-700 placeholder-green-700 border-green-700 bg-green-50' : success },
        { 'text-red-600 placeholder-red-600 border-red-600 bg-red-50' : error },
        { 'focus:!border-red-600': showMaxLengthAlert },
        { '!text-gray-300 !placeholder-gray-300 !bg-gray-50 !border-gray-200 cursor-not-allowed': disabled || readonly },
        { 'resize-none' : !resizable }
      ]"
      aria-describedby="charCounter"
      @input="onInput"
      @focus="isAreaOnFocus = true"
      @blur="isAreaOnFocus = false"
    />
    <div
      :class="['flex',
               {'justify-between': helperText && maxLength},
               {'justify-end': !helperText && maxLength}]"
    >
      <div
        v-if="helperText"
        :class="[
          'text-gray-500 type-xs-400',
          { 'text-green-700': success },
          { 'text-red-600': error },
          { '!text-gray-500': disabled }]"
      >
        {{ helperText }}
      </div>
      <div
        v-if="showCounter && maxLength && isAreaOnFocus"
        id="charCounter"
        role="status"
        aria-live="polite"
        :class="['type-xs-400',
                 showMaxLengthAlert ? 'text-red-700' : 'text-gray-500']"
      >
        {{ counterContent }}
      </div>
    </div>
  </div>
</template>

<script>
import LobLabel from '../Label/Label.vue';
export default {
  name: 'Textarea',
  components: {
    LobLabel
  },
  props: {
    tooltipContent: {
      type: String,
      default: null
    },
    tooltipPosition: {
      type: String, default: 'trailing',
      validator: function (value) {
        return ['leading', 'trailing'].includes(value);
      } },
    id: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: ''
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
      default: ''
    },
    helperText: {
      type: String,
      default: ''
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
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    inputClass: {
      type: String,
      default: ''
    },
    resizable: {
      type: Boolean,
      default: false
    },
    showCounter: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: [null, Number],
      default: null
    }
  },
  emits: ['update:modelValue', 'input', 'change'],
  data () {
    return {
      isAreaOnFocus: false
    };
  },
  computed: {
    showMaxLengthAlert () {
      return this.maxLength &&
      this.modelValue.length >= this.maxLength - 5;
    },
    counterContent () {
      return `${this.modelValue.length }/${this.maxLength}`;
    }
  },
  methods: {
    onInput ($event) {
      this.$emit('update:modelValue', $event.target.value);
      this.$emit('input', $event.target.value);
      this.$emit('change', $event);
    }
  }
};
</script>
