<template>
  <div
    :class="[
      'rounded-sm flex bg-white text-primary-500 font-thin',
      { '!bg-primary-500 !text-white checked font-semibold': checked },
      { '!bg-white-300': disabled }
    ]"
  >
    <input
      :id="value"
      type="radio"
      class="sr-only pointer-events-none"
      :name="name"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      @input="onInput"
      @click="onClick"
    >
    <label
      :for="value"
      :class="[
        'px-5 py-1.5 cursor-pointer',
        { 'cursor-not-allowed': disabled }
      ]"
    >
      <span :class="[{'sr-only': srOnlyLabel}]">
        {{ label }}
      </span>
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  name: 'SwitchItem',
  props: {
    modelValue: {
      type: String,
      default: null
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    srOnlyLabel: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'input', 'click'],
  computed: {
    checked () {
      return this.modelValue === this.value;
    }
  },
  methods: {
    onInput () {
      this.$emit('input', this.value);
      this.$emit('update:modelValue', this.value);
    },
    onClick ($event) {
      this.$emit('click', $event);
    }
  }
};
</script>
