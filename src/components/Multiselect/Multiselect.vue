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
      :placeholder="modelValue && modelValue.length ? '' : placeholder"
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
              <span class="sr-only">{{ t('multiselect.deselectLabel') }}</span>
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
        v-for="option in displayedOptions"
        :key="option.value"
        role="option"
        class="my-1 mx-4 cursor-pointer"
        @click="() => handleOptionSelect(option)"
      >
        {{ option.label }}
      </li>
      <li
        v-if="displayedOptions.length === 0 && search"
        class="my-1 mx-4"
      >
        {{ t('multiselect.noMatch') }}
      </li>
      <li
        v-if="displayedOptions.length === 0 && !search"
        class="my-1 mx-4"
      >
        {{ t('multiselect.allSelected') }}
      </li>
    </ul>
  </div>
</template>

<script>
import TextInput from '../TextInput/TextInput';
import Badge from '../Badge/Badge';
import LobButton from '../Button/Button';
import Close from '../Icons/Close';
import { filterArrOfObj } from '../../utils/array';

export default {
  name: 'Multiselect',
  components: { TextInput, Badge, LobButton, Close },
  props: {
    modelValue: { // selected
      type: Array,
      required: true
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
    placeholder: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['default', 'small'].includes(value);
      }
    },
    matchOn: {
      type: String,
      default: 'label',
      validator: function (value) {
        return ['label', 'value', 'both'].includes(value);
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
      availableOptions: filterArrOfObj(this.options, this.modelValue),
      search: ''
    };
  },
  computed: {
    displayedOptions () {
      if (this.search) {
        const search = this.search.toLowerCase();
        switch (this.matchOn) {
          case 'value':
            return this.availableOptions.filter((opt) => opt.value.toLowerCase().includes(search));
          case 'both':
            return this.availableOptions.filter((opt) => opt.label.toLowerCase().includes(search) || opt.value.toLowerCase().includes(search));
          default:
            return this.availableOptions.filter((opt) => opt.label.toLowerCase().includes(search));
        }
      } else {
        return this.availableOptions;
      }
    }
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
      const newSelectedList = [...this.modelValue, selectedOpt];
      this.$emit('update:modelValue', newSelectedList);

      this.availableOptions = this.availableOptions.filter((opt) => opt.value !== selectedOpt.value);

      if (this.search) {
        this.search = '';
      }
      this.open = false;
    },
    handleOptionDeselect (deselectedOpt) {
      const newSelectedList = this.modelValue.filter((opt) => opt.value !== deselectedOpt.value);
      this.$emit('update:modelValue', newSelectedList);

      // filter all options by selected, so that the newly deselected value gets put in the same order in the list that it was in before
      this.availableOptions = filterArrOfObj(this.options, newSelectedList);
    }
  }
};
</script>
