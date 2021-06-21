<template>
  <label
    :class="[
      'checkbox relative block mt-0 mb-1 ml-6 mr-3 text-left min-h-5',
      { 'cursor-not-allowed': disabled || readonly },
      { 'inline-block': sameLine }
    ]"
  >
    <input
      :id="name"
      type="checkbox"
      class="absolute m-0 p-0 h-0 w-0 opacity-0 pointer-events-none"
      :checked="checked"
      :value="value"
      :name="name"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      @input="onInput"
      @click="onClick"
    >
    <span
      style="content: '';"
      :class="[
        'checkmark w-4 h-4 mr-1 rounded-sm border-solid border border-gray-100 -left-5 absolute top-1',
        { 'bg-white-300': disabled || readonly },
        { 'bg-gray-100': (disabled || readonly) && checked },
        { 'border-error': error },
        { 'border-primary-500 bg-primary-500': checked }
      ]"
      data-testId="checkmark"
    />
    <span>
      {{ required ? label + "*" : label }}
    </span>
  </label>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Boolean],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
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
    name: {
      type: String,
      required: true
    },
    sameLine: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [Array, Boolean],
      default: null
    }
  },
  emits: ['update:modelValue', 'input', 'click'],
  computed: {
    checked () {
      if (this.modelValue && typeof this.modelValue === 'object') {
        return this.modelValue.includes(this.value);
      }
      return this.modelValue;
    }
  },
  methods: {
    onInput ($event) {
      if (this.modelValue && typeof this.modelValue === 'object') {
        const checked = [...this.modelValue];
        if (checked.includes(this.value)) {
          checked.splice(checked.indexOf(this.value), 1);
        } else {
          checked.push(this.value);
        }
        this.$emit('update:modelValue', checked);
        this.$emit('input', checked);
      } else {
        this.$emit('update:modelValue', $event.target.checked);
        this.$emit('input', $event.target.checked);
      }
    },
    onClick ($event) {
      this.$emit('click', $event);
    }
  }
};
</script>

<style scoped lang="scss">
.checkbox input:focus ~ .checkmark {
  @apply outline-none;
  @apply ring-2;
  @apply ring-primary-100;
  @apply border-transparent;
}

.checkbox:hover input:not(:disabled):not([readonly]) ~ .checkmark {
  @apply shadow-input;
}

.checkmark::after {
  content: "";

  @apply absolute;
  @apply hidden;
}

.checkbox .checkmark::after {
  border-width: 0 3px 3px 0;
  top: 1px;
  width: 5px;
  height: 9px;
  left: 4px;

  @apply border-solid;
  @apply border-white;
  @apply transform;
  @apply rotate-45;
}

.checkbox input:checked ~ .checkmark::after {
  @apply block;
}
</style>
