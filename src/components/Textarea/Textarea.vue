<template>
  <div>
    <lob-label
      v-if="label"
      :label="label"
      :label-for="id"
      :required="required"
      :sr-only-label="srOnlyLabel"
      :tooltip-content="tooltipContent"
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
        `bg-white text-gray-500 placeholder-gray-100 p-4 resize-none rounded border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent ${inputClass}`,
        { 'border-error': error },
        { '!bg-white-300 cursor-not-allowed': disabled || readonly },
        { 'hover:shadow': !disabled && !readonly }
      ]"
      @input="onInput"
    />
  </div>
</template>

<script>
import LobLabel from '../LobLabel/LobLabel.vue';
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
    required: {
      type: Boolean,
      default: false
    },
    error: {
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

<style scoped lang="scss">
textarea {
  min-height: 10rem;
}
</style>
