<template>
  <label class="flex flex-col">
    <span class="mb-2.5 text-gray-500 text-sm">{{ label }}</span>
    <textarea
      :value="modelValue"
      :name="name"
      :required="required"
      :disabled="disabled"
      :class="[
        'bg-white text-gray-500 p-4 resize-none rounded-sm border border-gray-100 focus:outline-none focus:border-primary-300',
        {'border-error': error},
        {'border-white-200': disabled}
      ]"
      @input="onInput"
      @change="onChange"
    />
  </label>
</template>

<script>
export default {
  name: 'Textarea',
  props: {
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
    }
  },
  emits: ['update:modelValue', 'input', 'change'],
  methods: {
    onInput ($event) {
      this.$emit('update:modelValue', $event.target.value);
      this.$emit('input', $event.target.value);
    },
    onChange ($event) {
      this.$emit('change', $event);
    }
  }
};
</script>

<style scoped lang="scss">
textarea {
  min-height: 10rem;

  &:hover:not(:disabled) {
    box-shadow: 0 5px 14px rgba(44, 67, 81, 0.13), 0 0 4px rgba(44, 67, 81, 0.02);
  }
}
</style>
