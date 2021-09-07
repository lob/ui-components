<template>
  <TextInput
    :id="id"
    :label="label"
    :sr-only-label="srOnlyLabel"
    :size="size"
  />
</template>

<script>
import TextInput from '../TextInput/TextInput';

export default {
  name: 'Multiselect',
  components: { TextInput },
  props: {
    modelValue: { // selected
      type: Array,
      default: null
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    srOnlyLabel: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['default', 'small'].includes(value);
      }
    },
    options: {
      type: Object,
      required: true
    }
  },
  emits: ['update:modelValue']
};
</script>
