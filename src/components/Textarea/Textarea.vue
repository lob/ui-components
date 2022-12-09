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
      :class="[
        `p-4 w-full rounded-sm text-gray-800 type-small-400 border border-gray-200 ${inputClass}`,
        `caret-gray-300 placeholder-gray-200 placeholder:type-small-400`,
        { 'hover:border-gray-300 focus:border-blue-500 focus:hover:border-blue-500 focus:outline-dashed focus:outline-black focus:outline-offset-1': !disabled && !readonly },
        { 'text-green-700 placeholder-green-700 border-green-700 bg-green-50' : success },
        { 'text-red-600 placeholder-red-600 border-red-600 bg-red-50' : error },
        { '!text-gray-300 !placeholder-gray-300 !bg-gray-50 !border-gray-200 cursor-not-allowed': disabled || readonly },
        { 'resize-none' : !resizable }
      ]"
      @input="onInput"
    />
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
    }
  },
  emits: ['update:modelValue', 'input', 'change'],
  methods: {
    onInput ($event) {
      this.$emit('update:modelValue', $event.target.value);
      this.$emit('input', $event.target.value);
      this.$emit('change', $event);
    }
  }
};
</script>
