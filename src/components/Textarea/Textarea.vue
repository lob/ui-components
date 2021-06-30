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
    <textarea
      :value="modelValue"
      :name="name"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :class="[
        'bg-white text-gray-500 p-4 resize-none rounded border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent',
        {'border-error': error},
        {'!bg-white-300 cursor-not-allowed': disabled || readonly},
        {'hover:shadow': !disabled && !readonly}
      ]"
      @input="onInput"
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

textarea::placeholder {
  @apply text-gray-100;
}
</style>
