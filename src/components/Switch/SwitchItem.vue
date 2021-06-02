<template>
  <div
    :class="[
      'rounded flex',
      {'bg-white text-gray-500': !checked},
      {'bg-primary-500 text-white checked': checked},
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
      class="px-6 py-1.5 cursor-pointer"
    >{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'SwitchItem',
  model: {
    prop: 'modelValue',
    event: 'input'
  },
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
    }
  },
  computed: {
    checked () {
      return this.modelValue === this.value;
    }
  },
  methods: {
    onInput () {
      this.$emit('input', this.value);
    },
    onClick ($event) {
      this.$emit('click', $event);
    }
  }
};

</script>

