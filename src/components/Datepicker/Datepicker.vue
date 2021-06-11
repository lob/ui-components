<template>
  <div
    :class="[
      'hidden shadow px-6 py-4.5 absolute',
      { '!block': open }
    ]"
    role="dialog"
    aria-modal="true"
    :aria-hidden="!open"
    :aria-:labelledby="id"
  >
    <div
      @keydown="handleEscKey"
    >
      <div
        class="sr-only duet-date__instructions"
        aria-live="polite"
      >
        {{ localization.keyboardInstruction }}
      </div>
      <div
        class="flex justify-between pb-4.5"
        @focusin="activeFocus = false"
      >
        <button
          ref="firstFocusableElement"
          class="text-primary-500"
          :disabled="prevMonthDisabled"
          @click="onPreviousMonthClick"
        >
          <arrow-left class="w-4 h-4" />
          <span class="sr-only">{{ localization.prevMonthLabel }}</span>
        </button>
        <div>
          <span
            :id="id"
            class="text-sm text-gray-900 font-medium"
            aria-live="polite"
            aria-atomic="true"
          >
            {{ localization.monthNames[focusedMonth] }} {{ focusedDay.getFullYear() }}
          </span>
        </div>
        <button
          class="text-primary-500"
          :disabled="nextMonthDisabled"
          @click="onNextMonthClick"
        >
          <arrow-right class="w-4 h-4" />
          <span class="sr-only">{{ localization.nextMonthLabel }}</span>
        </button>
      </div>
      <DatepickerMonth
        ref="month"
        :date-formatter="dateFormatter"
        :selected-day="selectedDay"
        :focused-day="focusedDay"
        :labelled-by-id="id"
        :localization="localization"
        :first-day-of-week="firstDayOfWeek"
        :min="minDate"
        :max="maxDate"
        :is-day-disabled="isDayDisabled"
        @daySelect="onDaySelect"
        @keydown="onKeydown"
      />
    </div>
  </div>
</template>

<script>
import  ArrowLeft from '../Icons/ArrowLeft';
import  ArrowRight from '../Icons/ArrowRight';
import DatepickerMonth from './DatepickerMonth.vue';
import { Keys, startOfWeek, endOfWeek, startOfMonth, endOfMonth, setMonth, setYear, addDays, clamp, parseISODate, inRange, printISODate } from '../../utils';

export default {
  name: 'Datepicker',
  components: { DatepickerMonth, ArrowLeft, ArrowRight },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    open: {
      type: Boolean,
      default: false
    },
    localization: {
      type: Object,
      default: () => ({})
    },
    min: {
      type: String,
      default: null
    },
    max: {
      type: String,
      default: null
    },
    dateFormatter: {
      type: Object,
      default: null
    },
    firstDayOfWeek: {
      type: Number,
      default: 0
    },
    isDayDisabled: {
      type: Function,
      default: null
    }
  },
  emits: ['update:modelValue', 'update:open', 'input'],
  data () {
    return {
      activeFocus: false,
      focusedDay: parseISODate(this.modelValue) || new Date(),
      minDate: parseISODate(this.min),
      maxDate: parseISODate(this.max)
    };
  },
  computed: {
    selectedDay () {
      return parseISODate(this.modelValue);
    },
    focusedMonth () {
      return this.focusedDay.getMonth();
    },
    focusedYear () {
      return this.focusedDay.getFullYear();
    },
    prevMonthDisabled () {
      return this.minDate && this.minDate.getMonth() === this.focusedMonth && this.minDate.getFullYear() === this.focusedYear;
    },
    nextMonthDisabled () {
      return this.maxDate && this.maxDate.getMonth() === this.focusedMonth && this.maxDate.getFullYear() === this.focusedYear;
    },
    minYear () {
      return this.minDate ? this.minDate.getFullYear() : this.selectedYear - 10;
    },
    maxYear () {
      return this.maxDate ? this.maxDate.getFullYear() : this.selectedYear + 10;
    }
  },
  mounted () {
    this.handleFirstFocusableKeydown();
  },
  updated () {
    if (this.activeFocus && this.open) {
      this.$refs.month.focusDay();
    }
  },
  methods: {
    range (from, to) {
      const result = [];
      for (let i = from; i <= to; i++) {
        result.push(i);
      }
      return result;
    },
    addDays (days) {
      this.setFocusedDay(addDays(this.focusedDay, days));
    },
    addMonths (months) {
      this.setMonth(this.focusedDay.getMonth() + months);
    },
    addYears (years) {
      this.setYear(this.focusedDay.getFullYear() + years);
    },
    startOfWeek () {
      this.setFocusedDay(startOfWeek(this.focusedDay, this.firstDayOfWeek));
    },
    endOfWeek () {
      this.setFocusedDay(endOfWeek(this.focusedDay, this.firstDayOfWeek));
    },
    setFocusedDay (day) {
      this.focusedDay = clamp(day, parseISODate(this.min), parseISODate(this.max));
    },
    setMonth (month) {
      const min = setMonth(startOfMonth(this.focusedDay), month);
      const max = endOfMonth(min);
      const date = setMonth(this.focusedDay, month);

      this.setFocusedDay(clamp(date, min, max));
    },
    setYear (year) {
      const min = setYear(startOfMonth(this.focusedDay), year);
      const max = endOfMonth(min);
      const date = setYear(this.focusedDay, year);

      this.setFocusedDay(clamp(date, min, max));
    },
    handleDisabledDay (days) {
      while (this.isDayDisabled(this.focusedDay)) {
        this.addDays(days);
      }
    },
    handleEscKey ($event) {
      if ($event.key === Keys.Escape) {
        this.hide();
      }
    },
    handleFirstFocusableKeydown () {
      this.$refs.month.focusDay();
    },
    onPreviousMonthClick ($event) {
      $event.preventDefault();
      this.addMonths(-1);
    },
    onNextMonthClick ($event) {
      $event.preventDefault();
      this.addMonths(1);
    },
    onKeydown ($event) {
      // handle tab separately, since it needs to be treated
      // differently to other keyboard interactions
      if ($event.key === Keys.TAB && !$event.shiftKey) {
        $event.preventDefault();
        this.firstFocusableElement.focus();
        return;
      }

      var handled = true;

      switch ($event.key) {
        case Keys.Right:
          this.addDays(1);
          this.handleDisabledDay(1);
          break;
        case Keys.Left:
          this.addDays(-1);
          this.handleDisabledDay(-1);
          break;
        case Keys.Down:
          this.addDays(7);
          this.handleDisabledDay(1);
          break;
        case Keys.Up:
          this.addDays(-7);
          this.handleDisabledDay(-1);
          break;
        case Keys.PageUp:
          if ($event.shiftKey) {
            this.addYears(-1);
            this.handleDisabledDay(-1);
          } else {
            this.addMonths(-1);
            this.handleDisabledDay(-1);
          }
          break;
        case Keys.PageDown:
          if ($event.shiftKey) {
            this.addYears(1);
            this.handleDisabledDay(1);
          } else {
            this.addMonths(1);
            this.handleDisabledDay(1);
          }
          break;
        case Keys.Home:
          this.startOfWeek();
          this.handleDisabledDay(1);
          break;
        case Keys.End:
          this.endOfWeek();
          this.handleDisabledDay(-1);
          break;
        default:
          handled = false;
      }

      if (handled) {
        $event.preventDefault();
        this.activeFocus = true;
      }
    },
    onDaySelect (day) {
      if (!inRange(day, parseISODate(this.min), parseISODate(this.max))) {
        return;
      }

      this.setValue(day);
      this.hide();
    },
    hide () {
      this.$emit('update:open', false);
    },
    setValue (date) {
      const value = printISODate(date);
      this.$emit('input', value);
      this.$emit('update:modelValue', value);
    }
  }

};
</script>

<style scoped lang="scss">

</style>
