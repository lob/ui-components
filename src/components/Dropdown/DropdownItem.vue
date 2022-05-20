<template>
  <div
    :id="id"
    ref="option"
    :class="[
      'border-l-4 border-l-transparent truncate',
      {'text-sm py-2 px-2.5': small},
      {'py-2.5 px-4': default_},
      {'font-light cursor-default': !option.disabled},
      {'bg-white-300 text-primary-500 font-bold !border-l-primary-500': active && !option.disabled && !selected},
      {'text-gray-100 cursor-not-allowed': option.disabled},
      {'bg-primary-500 font-bold !text-white': selected}
    ]"
    :aria-disabled="option.disabled"
    :aria-selected="active"
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
    },
    size: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['default', 'small'].includes(value);
      }
    }
  },
  emits: ['click', 'mousedown', 'mouseenter'],
  computed: {
    small () {
      return this.size === 'small';
    },
    default_ () {
      return this.size === 'default';
    }
  },
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
