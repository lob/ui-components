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
      :input-class="`!${inputWidthClass}`"
      @focus="open = true"
    >
      <template #selectedOptions>
        <Badge
          v-for="option in modelValue"
          :key="option.value"
          variant="turquoise"
          :size="size"
          class="mt-1 ml-1"
        >
          {{ option.label }}
        </Badge>
      </template>
    </TextInput>
    <ul
      v-show="open"
      role="listbox"
      :aria-expanded="open"
      class="absolute rounded border border-gray-100 mt-0.5 w-full left-0"
    >
      <li
        v-for="option in availableOptions"
        :id="option.value"
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
import Badge from '../Badge/Badge';

export default {
  name: 'Multiselect',
  components: { TextInput, Badge },
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
    },
    inputWidthClass: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      open: false,
      availableOptions: this.options,
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
      const label = $event.target.innerText;
      const value = $event.target.id;

      // emit new selected array to update v-model
      const newSelected = [...this.modelValue];
      newSelected.push({ label, value });
      this.$emit('update:modelValue', newSelected);

      // remove selected from availableOptions array
      const newOptions = [...this.availableOptions];
      const index = newOptions.findIndex((option) => option.value === value);
      newOptions.splice(index, 1);
      this.availableOptions = newOptions;

      // close the dropdown
      this.open = false;
    }
  }
};
</script>
