<template>
  <component
    :is="tag"
    ref="day"
    :class="[
      'text-sm text-gray-900 bg-transparent px-2 py-1 cursor-pointer inline-flex items-center justify-center w-6 h-6 relative text-center',
      {'!text-gray-100 !bg-transparent': disabled},
      {'cursor-default pointer-events-none': isOutsideRange},
      {'bg-white-300': today},
      {'z-10 bg-primary-500 text-white rounded-full': selected}
    ]"
    :role="disabled ? 'button' : null"
    :tab-index="focused ? 0: -1"
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
    day: {
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
  emits: ['click', 'daySelect', 'keydown'],
  computed: {
    tag () {
      return this.disabled ? 'span' : 'button';
    },
    currentDate () {
      return this.day.getDate();
    },
    formattedCurrentDate () {
      return this.dateFormatter.format(this.day);
    },
    isOutsideRange () {
      return !this.inRange;
    }
  },
  methods: {
    onClick ($event) {
      this.$emit('click', $event);
      this.$emit('daySelect', this.day);
    },
    onKeydown ($event) {
      this.$emit('keydown', $event);
    },
    focus () {
      this.$refs.day.focus();
    },
    isDisabled () {
      console.log('this.day:', this.day);
      console.log('this.$refs.day.getAttribute(\'disabled\'):', this.$refs.day.getAttribute('disabled'));
      return this.$refs.day.getAttribute('disabled') === 'true';
    }
  }
};
</script>

