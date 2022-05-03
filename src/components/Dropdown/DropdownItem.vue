<template>
  <div
    :id="id"
    ref="option"
    :class="[
      'truncate',
      {'text-sm py-2 px-2.5': small},
      {'py-2.5 px-4': default_},
      {'hover:bg-white-300 hover:text-primary-500 hover:font-bold hover:border-l-4 hover:border-l-primary-500 font-light cursor-default': !option.disabled},
      {'bg-primary-500 font-bold text-white': active},
      {'text-gray-100 cursor-not-allowed': option.disabled},
      {'!bg-none': option.disabled && active},
      {'!text-primary-300': placeholder}
    ]"
    :aria-disabled="option.disabled"
    :aria-selected="active"
    role="option"
    @mousedown="onMousedown"
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
  emits: ['click', 'mousedown'],
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
    onClick ($event) {
      if (!this.placeholder && !(this.option.hasOwnProperty('disabled') && this.option.disabled)) {
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
