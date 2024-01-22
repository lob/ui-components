<template>
  <div
    ref="container"
    :class="['px-6 py-4.5 h-[450px]']"
    role="dialog"
    :aria-labelledby="id"
    @keydown="handleEscKey"
  >
    <div class="flex justify-between pb-10">
      <div>
        <span
          :id="id"
          class="caps-large text-gray-900"
          aria-live="polite"
          aria-atomic="true"
        >
          {{ monthNames[focusedMonth] }} {{ focusedDate.getFullYear() }}
        </span>
      </div>
      <div>
        <button
          :class="[
            'text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent',
            { '!text-gray-100': prevMonthDisabled }
          ]"
          :disabled="prevMonthDisabled"
          @click="onPreviousMonthClick"
        >
          <chevron-left size="s" class="mr-2" />
          <span class="sr-only">{{ t('datepicker.prevMonthLabel') }}</span>
        </button>
        <button
          :class="[
            'text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent',
            { '!text-gray-100': nextMonthDisabled }
          ]"
          :disabled="nextMonthDisabled"
          @click="onNextMonthClick"
        >
          <chevron-right size="s" />
          <span class="sr-only">{{ t('datepicker.nextMonthLabel') }}</span>
        </button>
      </div>
    </div>
    <CalendarMonth
      ref="month"
      :selected-date="selectedDate"
      :focused-date="focusedDate"
      :labelled-by-id="id"
      :first-day-of-week="firstDayOfWeek"
      :min="minDate"
      :max="maxDate"
      :is-date-disabled="isDateDisabled"
      :selectable-range="selectableRange"
      @dateSelect="onDateSelect"
      @keydown="onKeydown"
    />
  </div>
</template>

<script>
import { ChevronLeft, ChevronRight } from '@/components/Icons';
import CalendarMonth from './CalendarMonth.vue';
import {
  Keys,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  setMonth,
  setYear,
  addDays,
  clamp,
  inRange
} from '@/utils';

export default {
  name: 'Calendar',
  components: { CalendarMonth, ChevronLeft, ChevronRight },
  props: {
    modelValue: {
      type: Date,
      default: null
    },
    id: {
      type: String,
      required: true
    },
    max: {
      type: Date,
      default: null
    },
    min: {
      type: Date,
      default: null
    },
    firstDayOfWeek: {
      type: Number,
      default: 0
    },
    isDateDisabled: {
      type: Function,
      default: () => false
    },
    hideable: {
      type: Boolean,
      default: true
    },
    positionAbsolute: {
      type: Boolean,
      default: true
    },
    selectableRange: {
      type: Number,
      default: null
    }
  },
  emits: ['update:modelValue', 'input'],
  data() {
    return {
      focusedDate: this.modelValue || new Date()
    };
  },
  computed: {
    selectedDate() {
      return this.modelValue || new Date();
    },
    focusedMonth() {
      return this.focusedDate.getMonth();
    },
    focusedYear() {
      return this.focusedDate.getFullYear();
    },
    prevMonthDisabled() {
      return (
        this.minDate &&
        this.minDate.getMonth() === this.focusedMonth &&
        this.minDate.getFullYear() === this.focusedYear
      );
    },
    nextMonthDisabled() {
      return (
        this.maxDate &&
        this.maxDate.getMonth() === this.focusedMonth &&
        this.maxDate.getFullYear() === this.focusedYear
      );
    },
    minDate() {
      return (
        this.min || new Date(new Date().setMonth(new Date().getMonth() - 12))
      );
    },
    maxDate() {
      return (
        this.max || new Date(new Date().setMonth(new Date().getMonth() + 12))
      );
    },
    minYear() {
      return this.minDate ? this.minDate.getFullYear() : this.selectedYear - 10;
    },
    maxYear() {
      return this.maxDate ? this.maxDate.getFullYear() : this.selectedYear + 10;
    },
    monthNames() {
      return [
        this.t('datepicker.monthNameZero'),
        this.t('datepicker.monthNameOne'),
        this.t('datepicker.monthNameTwo'),
        this.t('datepicker.monthNameThree'),
        this.t('datepicker.monthNameFour'),
        this.t('datepicker.monthNameFive'),
        this.t('datepicker.monthNameSix'),
        this.t('datepicker.monthNameSeven'),
        this.t('datepicker.monthNameEight'),
        this.t('datepicker.monthNameNine'),
        this.t('datepicker.monthNameTen'),
        this.t('datepicker.monthNameEleven')
      ];
    }
  },
  mounted() {
    this.$refs.month.focusDate();
  },
  updated() {
    this.$refs.month.focusDate();
  },
  methods: {
    range(from, to) {
      const result = [];
      for (let i = from; i <= to; i++) {
        result.push(i);
      }
      return result;
    },
    addDays(days) {
      this.setFocusedDate(addDays(this.focusedDate, days));
    },
    addMonths(months) {
      this.setMonth(this.focusedDate.getMonth() + months);
    },
    addYears(years) {
      this.setYear(this.focusedDate.getFullYear() + years);
    },
    startOfWeek() {
      this.setFocusedDate(startOfWeek(this.focusedDate, this.firstDayOfWeek));
    },
    endOfWeek() {
      this.setFocusedDate(endOfWeek(this.focusedDate, this.firstDayOfWeek));
    },
    setFocusedDate(date) {
      this.focusedDate = clamp(date, this.minDate, this.maxDate);
    },
    setMonth(month) {
      const min = setMonth(startOfMonth(this.focusedDate), month);
      const max = endOfMonth(min);
      const date = setMonth(this.focusedDate, month);

      this.setFocusedDate(clamp(date, min, max));
    },
    setYear(year) {
      const min = setYear(startOfMonth(this.focusedDate), year);
      const max = endOfMonth(min);
      const date = setYear(this.focusedDate, year);

      this.setFocusedDate(clamp(date, min, max));
    },
    handleDisabledDate(days) {
      while (this.isDateDisabled(this.focusedDate)) {
        this.addDays(days);
      }
    },
    handleEscKey($event) {
      if ($event.key === Keys.Escape) {
        this.hide();
      }
    },
    handleFirstFocusableKeydown($event) {
      // this ensures focus is trapped inside the dialog
      if ($event.key === Keys.Tab && $event.shiftKey) {
        this.$refs.month.focusDate();
        $event.preventDefault();
      }
    },
    onPreviousMonthClick($event) {
      $event.preventDefault();
      this.addMonths(-1);
    },
    onNextMonthClick($event) {
      $event.preventDefault();
      this.addMonths(1);
    },
    onKeydown($event) {
      var handled = true;

      switch ($event.key) {
        case Keys.Right:
          this.addDays(1);
          this.handleDisabledDate(1);
          break;
        case Keys.Left:
          this.addDays(-1);
          this.handleDisabledDate(-1);
          break;
        case Keys.Down:
          this.addDays(7);
          this.handleDisabledDate(1);
          break;
        case Keys.Up:
          this.addDays(-7);
          this.handleDisabledDate(-1);
          break;
        case Keys.PageUp:
          if ($event.shiftKey) {
            this.addYears(-1);
            this.handleDisabledDate(-1);
          } else {
            this.addMonths(-1);
            this.handleDisabledDate(-1);
          }
          break;
        case Keys.PageDown:
          if ($event.shiftKey) {
            this.addYears(1);
            this.handleDisabledDate(1);
          } else {
            this.addMonths(1);
            this.handleDisabledDate(1);
          }
          break;
        case Keys.Home:
          this.startOfWeek();
          this.handleDisabledDate(1);
          break;
        case Keys.End:
          this.endOfWeek();
          this.handleDisabledDate(-1);
          break;
        default:
          handled = false;
      }

      if (handled) {
        $event.preventDefault();
      }
    },
    onDateSelect(date) {
      if (!inRange(date, this.minDate, this.maxDate)) {
        return;
      }

      this.setValue(date);
    },
    setValue(date) {
      const value = date;
      this.focusedDate = date;
      this.$emit('input', value);
      this.$emit('update:modelValue', value);
    }
  }
};
</script>
