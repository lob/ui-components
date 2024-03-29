<template>
  <div ref="container" class="relative">
    <TextInput
      :id="id"
      ref="input"
      v-model="search"
      :label="label"
      :sr-only-label="srOnlyLabel"
      :placeholder="modelValue && modelValue.length ? '' : placeholder"
      :size="size"
      :input-class="inputWidthClass"
      :is-multiselect="true"
      @focus="open = true"
      @input="handleSearchInput"
    >
      <template #selectedOptions>
        <Badge
          v-for="option in modelValue"
          :key="option.label || option"
          :size="size"
        >
          <div class="flex items-center">
            {{ option.label || option }}
            <button
              class="ml-2 -mr-1 h-min"
              :aria-label="`t('multiselect.deselectLabel')-${option}`"
              @click="() => handleOptionDeselect(option)"
            >
              <XmarkLarge size="s" class="h-3" />
            </button>
          </div>
        </Badge>
      </template>
    </TextInput>
    <ul
      v-show="open"
      role="listbox"
      :aria-expanded="open"
      class="absolute rounded border border-gray-100 mt-0.5 w-full left-0 bg-white z-30"
    >
      <li
        v-for="option in displayedOptions"
        :key="option.label || option"
        role="option"
        class="my-1 mx-4 cursor-pointer"
        @click="() => handleOptionSelect(option)"
      >
        {{ option.label || option }}
      </li>
      <li v-if="displayedOptions.length === 0 && search" class="my-1 mx-4">
        {{ t('multiselect.noMatch') }}
      </li>
      <li v-if="displayedOptions.length === 0 && !search" class="my-1 mx-4">
        {{ t('multiselect.allSelected') }}
      </li>
    </ul>
  </div>
</template>

<script>
import TextInput from '../TextInput/TextInput';
import Badge from '../Badge/Badge';
import { XmarkLarge } from '@/components/Icons';
import { filterArrayByArray } from '../../utils/array';

export default {
  name: 'Multiselect',
  components: { TextInput, Badge, XmarkLarge },
  props: {
    modelValue: {
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
      default: ''
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
      type: Array,
      required: true,
      validator: function (value) {
        // The value must be an array of strings or objects with label properties
        const isString = value.every((o) => typeof o === 'string');
        const isOption = value.every(
          (o) => typeof o === 'object' && o.hasOwnProperty('label')
        );
        return isString || isOption;
      }
    },
    inputWidthClass: {
      type: String,
      default: '!w-40'
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      open: false,
      availableOptions: filterArrayByArray(this.options, this.modelValue),
      search: ''
    };
  },
  computed: {
    optionsHasObjects() {
      return (
        this.availableOptions.length &&
        this.availableOptions.every((o) => typeof o === 'object')
      );
    },
    optionsHasValueProp() {
      return this.availableOptions.every((o) => o.hasOwnProperty('value'));
    },
    displayedOptions() {
      if (this.search) {
        const search = this.search.toLowerCase();
        if (this.optionsHasObjects) {
          switch (this.matchOn) {
            case 'value':
              return this.availableOptions.filter((o) =>
                o.value.toLowerCase().includes(search)
              );
            case 'both':
              return this.availableOptions.filter(
                (o) =>
                  o.label.toLowerCase().includes(search) ||
                  o.value.toLowerCase().includes(search)
              );
            default:
              return this.availableOptions.filter((o) =>
                o.label.toLowerCase().includes(search)
              );
          }
        } else {
          return this.availableOptions.filter((o) =>
            o.toLowerCase().includes(search)
          );
        }
      } else {
        return this.availableOptions;
      }
    }
  },
  mounted() {
    window.addEventListener('click', this.onClickOutside, true);

    // checking if a user has specified matchOn 'value' or 'both' but doesn't have 'value' in object
    if (this.matchOn !== 'label') {
      const hasValueProp = this.options.every((o) => o.hasOwnProperty('value'));
      if (!hasValueProp) {
        throw new Error(
          "You've specified matching on 'value' or 'both' but some objects in your options array don't have 'value' properties."
        );
      }
    }
  },
  unmounted() {
    window.removeEventListener('click', this.onClickOutside);
  },
  methods: {
    onClickOutside($event) {
      if (this.$refs.container) {
        const clickOnContainer = this.$refs.container === $event.target;
        const clickOnChild =
          this.$refs.container && this.$refs.container.contains($event.target);

        if (!clickOnContainer && !clickOnChild) {
          this.open = false;
        }
      }
    },
    handleSearchInput() {
      if (this.search && !this.open) {
        this.open = true;
      }
    },
    handleOptionSelect(selectedOpt) {
      const newSelectedList = [...this.modelValue, selectedOpt];
      this.$emit('update:modelValue', newSelectedList);

      if (this.optionsHasObjects) {
        this.availableOptions = this.availableOptions.filter(
          (o) => o.label !== selectedOpt.label
        );
      } else {
        this.availableOptions = filterArrayByArray(
          this.options,
          newSelectedList
        );
      }

      if (this.search) {
        this.search = '';
      }
      this.open = false;
    },
    handleOptionDeselect(deselectedOpt) {
      let newSelectedList;
      if (this.optionsHasObjects) {
        newSelectedList = this.modelValue.filter(
          (o) => o.label !== deselectedOpt.label
        );
      } else {
        newSelectedList = this.modelValue.filter((o) => o !== deselectedOpt);
      }
      this.$emit('update:modelValue', newSelectedList);

      // filter all options by selected, so that the newly deselected value gets put in the same order in the list that it was in before
      this.availableOptions = filterArrayByArray(this.options, newSelectedList);
    }
  }
};
</script>
