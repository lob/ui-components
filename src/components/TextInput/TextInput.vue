<template>
  <div>
    <label
      :for="id"
      :class="['block mb-2 text-sm text-gray-500', {'sr-only': srOnlyLabel}]"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :class="['input pl-4 pr-4 pt-3 pb-4 border border-gray-100 leading-5 text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent', {'bg-white-300 cursor-not-allowed': disabled}, {'border-error': error}]"
      :disabled="disabled"
      :placeholder="placeholder"
    >
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    id: {
      type: String,
      default: '',
      required: true
    },
    label: {
      type: String,
      default: '',
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
    type: { // can we restrict this to a subset of values?
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
  .input {
    border-radius: 3px;

    &:hover:not(:disabled):not(:focus) {
      box-shadow: 0 5px 14px rgba(44, 67, 81, 0.13), 0 0 4px rgba(44, 67, 81, 0.02);
    }
  }

  .input::placeholder {
    @apply text-gray-100;
  }
</style>
