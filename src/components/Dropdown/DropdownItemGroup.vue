<template>
  <div ref="group" role="group" class="mt-1">
    <div
      class="ml-4 text-black uppercase type-xs-500 cursor-default"
      @mousedown="onMousedown"
    >
      {{ group.label }}
    </div>
    <dropdown-item
      v-for="option in group.options"
      :id="`${id}-${flattenedOptions.indexOf(option)}`"
      :key="option.label || option"
      :ref="(el) => setOptionRef(el, item)"
      :option="option"
      :index="flattenedOptions.indexOf(option)"
      :active="activeIndex === flattenedOptions.indexOf(option)"
      :selected="selectedIndex === flattenedOptions.indexOf(option)"
      :placeholder="option.label === placeholderText"
      @mousedown="onMousedown"
      @mouseenter="onMouseEnter"
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
        return (
          typeof value === 'object' &&
          value.hasOwnProperty('label') &&
          value.hasOwnProperty('options')
        );
      }
    },
    activeIndex: {
      type: Number,
      default: null
    },
    selectedIndex: {
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
  emits: ['click', 'mousedown', 'mouseenter'],
  data() {
    return {
      activeOptionRef: null
    };
  },
  methods: {
    setOptionRef(optionEl, option) {
      if (
        optionEl &&
        this.activeIndex === this.flattenedOptions.indexOf(option)
      ) {
        this.activeOptionRef = optionEl;
      }
    },
    onMousedown($event) {
      this.$emit('mousedown', $event);
    },
    onMouseEnter($event, index) {
      this.$emit('mouseenter', $event, index);
    },
    onClick($event, index) {
      this.$emit('click', $event, index);
    },
    getOffsetHeight() {
      return this.activeOptionRef.offsetHeight;
    },
    getOffsetTop() {
      return this.activeOptionRef.offsetTop;
    }
  }
};
</script>
