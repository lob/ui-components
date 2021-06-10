<template>
  <component
    :is="tag"
    :ref="isFocused && el && focusedDayRef && focusedDayRef(el)"

    :class="[
      'text-sm text-gray-900 bg-transparent rounded-full px-2 py-1 cursor-pointer inline-flex items-center justify-center w-6 h-6 relative text-center',
      {'!text-gray-100 !bg-transparent': disabled},
      {'cursor-default pointer-events-none': isOutsideRange},
      {'z-10 bg-primary-500 text-white': isToday},
      {'is-month': isMonth}
    ]"
    :role="disabled ? 'button' : null"
    :tab-index="isFocused ? 0: -1"
    :disabled="disabled || isOutsideRange"
    :aria-pressed="disabled ? false : selected"
    :aria-disabled="disabled"
    @click="onClick"
    @onKeydown="onKeyboardNavigation"
  >
    <span aria-hidden="true">{{ currentDate }}</span>
    <span class="sr-only">{{ formattedCurrentDate }}</span>
  </component>
</template>

<script>
import { isEqual, isEqualMonth } from '../../utils';

export default {
  name: 'DatepickerDay',
  props: {
    focusedDay: {
      type: Date,
      default: ''
    },
    today: {
      type: Date,
      default: ''
    },
    day: {
      type: Date,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    inRange: {
      type: Boolean,
      default: true
    },
    selected: {
      type: Boolean,
      default: false
    },
    dateFormatter: {
      type: Object,
      default: null
    }
    // onDaySelect: (event: MouseEvent, day: Date) => void
    // onKeyboardNavigation: (event: KeyboardEvent) => void
    // focusedDayRef?: (element: HTMLElement) => void

  },
  emits: ['click'],
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
    isToday () {
      return isEqual(this.day, this.today);
    },
    isMonth () {
      return isEqualMonth(this.day, this.focusedDay);
    },
    isFocused () {
      return isEqual(this.day, this.focusedDay);
    },
    isOutsideRange () {
      return !this.inRange;
    }
  },
  methods: {
    onClick ($event) {
      this.$emit('click', $event);
    },
    onKeyboardNavigation () {
      return;
    }
  }
};
</script>

<style scoped lang="scss">

</style>

