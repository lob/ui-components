<template>
  <div class="relative">
    <TextInput
      :id="id"
      ref="input"
      v-model="search"
      :label="label"
      :sr-only-label="srOnlyLabel"
      :size="size"
      @focus="open = true"
      @blur="open = false"
    />
    <div
      v-if="open"
      role="listbox"
      :aria-expanded="open"
      class="absolute rounded border border-gray-100 mt-0.5 w-full left-0"
    >
      <option
        v-for="option in options"
        :key="option.value"
        class="my-1 mx-4"
      >
        {{ option.label }}
      </option>
    </div>
  </div>
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
  emits: ['update:modelValue'],
  data () {
    return {
      open: false,
      search: ''
    };
  }
};
</script>
