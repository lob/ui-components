<template>
  <div
    :id="id"
    ref="option"
    :class="[
      'py-1 px-8 truncate',
      {'bg-turquoise-100': active},
      {'hover:bg-turquoise-100': !option.disabled},
      { 'text-gray-100': option.disabled},
      {'!bg-none': option.disabled && active},
      {'!text-primary-300': placeholder }
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
    }
  },
  emits: ['click', 'mousedown'],
  methods: {
    onMousedown ($event) {
      this.$emit('mousedown', $event);
    },
    onClick ($event) {
      this.$emit('click', $event, this.index);
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
