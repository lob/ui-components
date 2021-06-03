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
      :class="['leading-5 text-gray-500 lob-input']"
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
    }
  }
};
</script>

<style scoped lang="scss">
  .lob-input {
    padding-top: 13px;
    padding-bottom: 15px;
    border-radius: 3px;
    border: 0.5px solid theme('colors.gray.100');

    @apply pl-4;
    @apply pr-4;
  }

  .lob-input::placeholder {
    @apply text-gray-100;
  }
</style>
