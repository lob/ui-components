<template>
  <div
    :id="id"
    ref="option"
    :class="[
      'h-9 py-2 px-4 flex items-center truncate',
      selected ? 'text-black type-small-700' : 'text-gray-500 type-small-500',
      option.disabled ? '!text-gray-300 cursor-not-allowed': 'cursor-pointer',
      { 'bg-gray-50 text-gray-800': active && !option.disabled },
      { '!text-gray-300 !type-small-500': placeholder }
    ]"
    :aria-disabled="option.disabled"
    :aria-selected="active"
    data-testid="option"
    role="option"
    @mousedown="onMousedown"
    @mouseenter="onMouseEnter"
    @click="onClick"
  >
    {{ option.label || option }}
  </div>
</template>

<script>
export default {
  name: 'DropdownItem',
  props: {
    id: {
      type: String,
      required: true
    },
    option: {
      type: [String, Object],
      required: true,
      validator: function (value) {
        // The value must match be a string or an object with a label property
        const isString = typeof value === 'string';
        const isOption = typeof value === 'object' && value.hasOwnProperty('label');
        return isString || isOption;
      }
    },
    index: {
      type: Number,
      default: 0
    },
    active: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click', 'mousedown', 'mouseenter'],
  methods: {
    onMousedown ($event) {
      this.$emit('mousedown', $event);
    },
    onMouseEnter ($event) {
      this.$emit('mouseenter', $event, this.index);
    },
    onClick ($event) {
      if (!this.option.hasOwnProperty('disabled') || !this.option.disabled) {
        this.$emit('click', $event, this.index);
      }
    },
    getOffsetHeight () {
      return this.$refs.option.offsetHeight;
    },
    getOffsetTop () {
      return this.$refs.option.offsetTop;
    }
  }
};
</script>
