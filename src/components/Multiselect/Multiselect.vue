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
          <div class="flex items-center">
            {{ option.label }}
            <LobButton
              variant="none"
              class="mt-0.5 ml-1"
              @click="() => handleOptionDeselect(option)"
            >
              <Close class="w-4 h-4" />
            </LobButton>
          </div>
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
        :key="option.value"
        class="my-1 mx-4 cursor-pointer"
        @click="() => handleOptionSelect(option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script>
import TextInput from '../TextInput/TextInput';
import Badge from '../Badge/Badge';
import LobButton from '../Button/Button';
import Close from '../Icons/Close';

export default {
  name: 'Multiselect',
  components: { TextInput, Badge, LobButton, Close },
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
    handleOptionSelect (selectedOpt) {
      // emit new selected array to update v-model
      const newSelectedList = [...this.modelValue];
      newSelectedList.push(selectedOpt);
      this.$emit('update:modelValue', newSelectedList);

      // remove selected from availableOptions array & close the dropdown
      this.availableOptions = this.availableOptions.filter((opt) => opt.value !== selectedOpt.value);
      this.open = false;
    },
    handleOptionDeselect (deselectedOpt) {
      // remove from selected list and update v-model
      const newSelectedList = this.modelValue.filter((opt) => opt.value !== deselectedOpt.value);
      this.$emit('update:modelValue', newSelectedList);

      // filter all options by selected, so that the newly deselected value gets put in the same order in the list that it was in before
      this.availableOptions = this.options.filter((obj1) => !newSelectedList.some((obj2) => obj1.value === obj2.value));
    }
  }
};
</script>
