<template>
  <div
    ref="container"
    class="relative"
  >
    <TextInput
      :id="id"
      ref="input"
      v-model="search"
      :label="label"
      :sr-only-label="srOnlyLabel"
      :size="size"
      @focus="open = true"
    />
    <ul
      v-show="open"
      role="listbox"
      :aria-expanded="open"
      class="absolute rounded border border-gray-100 mt-0.5 w-full left-0"
    >
      <li
        v-for="option in options"
        :key="option.value"
        class="my-1 mx-4 cursor-pointer"
        @click="handleOptionClick"
      >
        {{ option.label }}
      </li>
    </ul>
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
  },
  mounted () {
    window.addEventListener('click', this.onClickOutside, true);
  },
  unmounted () {
    window.removeEventListener('click', this.onClickOutside);
  },
  methods: {
    onClickOutside ($event) {
      if (this.$refs.container) {
        const clickOnContainer = this.$refs.container === $event.target;
        const clickOnChild = this.$refs.container && this.$refs.container.contains($event.target);

        if (!clickOnContainer && !clickOnChild) {
          this.open = false;
        }
      }
    },
    handleOptionClick ($event) {
      // eslint-disable-next-line
      console.log($event);
      this.open = false;
    }
  }
};
</script>
