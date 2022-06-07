<template>
  <component
    :is="tag"
    ref="date"
    :class="[
      'rounded-full text-small leading-6 text-gray-900 bg-transparent p-4 my-1 cursor-pointer inline-flex items-center justify-center w-6 h-6 relative text-center hover:bg-white-300 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent',
      {'!text-gray-100 !bg-transparent': disabled},
      {'cursor-default pointer-events-none': isOutsideRange},
      {'bg-gray-100': today},
      {'z-10 !bg-primary-500 text-white shadow-input border border-white': selected},
      {'border border-gray-100 rounded-full hover:border-white hover:shadow-input' : selectable},
      {'cursor-not-allowed focus:ring-0 hover:bg-transparent' : notSelectable}
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
import { addDays } from 'date-fns';

export default {
  name: 'CalendarDay',
  props: {
    date: {
      type: Date,
      default: null
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
      return new Intl.DateTimeFormat().format(this.date);
    },
    isOutsideRange () {
      return !this.inRange;
    },
    selectable () {
      return (new Date(this.date) > new Date() || this.today) && new Date(this.date) < addDays(new Date(), 180);
    },
    notSelectable () {
      return !this.selectable;
    }
  },
  methods: {
    onClick ($event) {
      if (this.selectable) {
        this.$emit('click', $event);
        this.$emit('dateSelect', this.date);
      }
    },
    onKeydown ($event) {
      if (this.selectable) {
        this.$emit('keydown', $event);
      }
    },
    focus () {
      this.$refs.date.focus();
    }
  }
};
</script>
