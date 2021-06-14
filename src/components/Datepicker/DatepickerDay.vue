<template>
  <component
    :is="tag"
    ref="date"
    :class="[
      'text-sm text-gray-900 bg-transparent px-2 py-1 cursor-pointer inline-flex items-center justify-center w-6 h-6 relative text-center hover:bg-white-300',
      {'!text-gray-100 !bg-transparent': disabled},
      {'cursor-default pointer-events-none': isOutsideRange},
      {'bg-gray-100': today},
      {'z-10 !bg-primary-500 text-white rounded-full': selected}
    ]"
    :role="disabled ? 'button' : null"
    :tabindex="focused ? 0: -1"
    :disabled="disabled || isOutsideRange"
    :aria-pressed="disabled ? false : selected"
    :aria-disabled="disabled"
    @click="onClick"
    @keydown="onKeydown"
  >
    <span aria-hidden="true">{{ currentDate }}</span>
    <span class="sr-only">{{ formattedCurrentDate }}</span>
  </component>
</template>

<script>
export default {
  name: 'DatepickerDay',
  props: {
    date: {
      type: Date,
      default: ''
    },
    today: {
      type: Boolean,
      default: false
    },
    focused: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    inRange: {
      type: Boolean,
      default: true
    },
    dateFormatter: {
      type: Object,
      default: null
    }
  },
  emits: ['click', 'dateSelect', 'keydown'],
  computed: {
    tag () {
      return this.disabled ? 'span' : 'button';
    },
    currentDate () {
      return this.date.getDate();
    },
    formattedCurrentDate () {
      return this.dateFormatter.format(this.date);
    },
    isOutsideRange () {
      return !this.inRange;
    }
  },
  methods: {
    onClick ($event) {
      this.$emit('click', $event);
      this.$emit('dateSelect', this.date);
    },
    onKeydown ($event) {
      this.$emit('keydown', $event);
    },
    focus () {
      this.$refs.date.focus();
    }
  }
};
</script>

