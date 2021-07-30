<template>
  <div
    ref="group"
    role="group"
  >
    <div
      class="ml-5 text-primary-500 uppercase text-xs cursor-default"
      @mousedown="onMousedown"
    >
      {{ group.label }}
    </div>
    <dropdown-item
      v-for="option in group.options"
      :id="`${id}-${flattenedOptions.indexOf(option)}`"
      :key="option.label || option"
      :ref="activeIndex === flattenedOptions.indexOf(option) ? 'activeOption' : null"
      :option="option"
      :index="flattenedOptions.indexOf(option)"
      :active="activeIndex === flattenedOptions.indexOf(option)"
      :placeholder="option.label === placeholderText"
      @mousedown="onMousedown"
      @click="onClick"
    />
  </div>
</template>

<script>
import DropdownItem from './DropdownItem';

export default {
  name: 'DropdownItemGroup',
  components: { DropdownItem },
  props: {
    id: {
      type: String,
      default: ''
    },
    group: {
      type: Object,
      required: true,
      validator: function (value) {
        // The value must match be an object with a label and options property
        return typeof value === 'object' && value.hasOwnProperty('label') && value.hasOwnProperty('options');
      }
    },
    activeIndex: {
      type: Number,
      default: null
    },
    placeholderText: {
      type: String,
      default: ''
    },
    flattenedOptions: {
      type: Array,
      required: true,
      validator: function (value) {
        // The value must match be a string or an object with a label property
        return value.every((o) => {
          const isString = typeof o === 'string';
          const isOption = typeof o === 'object' && o.hasOwnProperty('label');
          return isString || isOption;
        });
      }
    }
  },
  emits: ['click', 'mousedown'],
  methods: {
    onMousedown ($event) {
      this.$emit('mousedown', $event);
    },
    onClick ($event, index) {
      this.$emit('click', $event, index);
    },
    getOffsetHeight () {
      return this.$refs.activeOption.offsetHeight;
    },
    getOffsetTop () {
      return this.$refs.activeOption.offsetTop;
    }
  }
};
</script>
