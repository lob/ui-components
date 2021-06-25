<!-- Implementation inspired by Duet Date Picker https://github.com/duetds/date-picker -->

<template>
  <div
    ref="container"
    :class="[
      'hidden shadow px-6 py-4.5 absolute',
      { '!block': open }
    ]"
    role="dialog"
    aria-modal="true"
    :aria-hidden="!open"
    :aria-:labelledby="id"
    @keydown="handleEscKey"
  >
    <div
      class="sr-only"
      aria-live="polite"
    >
      {{ t('keyboardInstruction') }}
    </div>
    <button
      ref="firstFocusableElement"
      class="text-gray-700 opacity-0 focus:opacity-100 absolute right-2 top-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
      @keydown="handleFirstFocusableKeydown"
      @click="hide"
    >
      <close class="w-4 h-4 p-0.5" />
      <span class="sr-only">{{ t('closeLabel') }}</span>
    </button>
    <div
      class="flex justify-between pb-4.5"
    >
      <button
        :class="[
          'text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent',
          {'!text-gray-100': prevMonthDisabled}
        ]"
        :disabled="prevMonthDisabled"
        @click="onPreviousMonthClick"
      >
        <arrow-left class="w-4 h-4" />
        <span class="sr-only">{{ t('prevMonthLabel') }}</span>
      </button>
      <div>
        <span
          :id="id"
          class="text-sm text-gray-900 font-medium"
          aria-live="polite"
          aria-atomic="true"
        >
          {{ t('monthNames')[focusedMonth] }} {{ focusedDate.getFullYear() }}
        </span>
      </div>
      <button
        :class="[
          'text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent',
          {'!text-gray-100': nextMonthDisabled}
        ]"
        :disabled="nextMonthDisabled"
        @click="onNextMonthClick"
      >
        <arrow-right class="w-4 h-4" />
        <span class="sr-only">{{ t('nextMonthLabel') }}</span>
      </button>
    </div>
    <DatepickerMonth
      ref="month"
      :selected-date="selectedDate"
      :focused-date="focusedDate"
      :labelled-by-id="id"
      :first-day-of-week="firstDayOfWeek"
      :min="min"
      :max="max"
      :is-date-disabled="isDateDisabled"
      @dateSelect="onDateSelect"
      @keydown="onKeydown"
    />
  </div>
</template>

<script>
import { ArrowLeft, ArrowRight, Close } from '@/components/Icons';
import DatepickerMonth from './DatepickerMonth.vue';
import { Keys, startOfWeek, endOfWeek, startOfMonth, endOfMonth, setMonth, setYear, addDays, clamp, inRange } from '@/utils';

export default {
  name: 'Datepicker',
  components: { DatepickerMonth, ArrowLeft, ArrowRight, Close },
  props: {
    modelValue: {
      type: Date,
      default: new Date()
    },
    id: {
      type: String,
      required: true
    },
    open: {
      type: Boolean,
      default: false
    },
    min: {
      type: Date,
      default: new Date(new Date().setMonth(new Date().getMonth() - 12))
    },
    max: {
      type: Date,
      default: new Date(new Date().setMonth(new Date().getMonth() + 12))
    },
    firstDayOfWeek: {
      type: Number,
      default: 0
    },
    isDateDisabled: {
      type: Function,
      default: () => false
    }
  },
  emits: ['update:modelValue', 'update:open', 'input'],
  data () {
    return {
      focusedDate: this.modelValue || new Date()
    };
  },
  computed: {
    selectedDate () {
      return this.modelValue;
    },
    focusedMonth () {
      return this.focusedDate.getMonth();
    },
    focusedYear () {
      return this.focusedDate.getFullYear();
    },
    prevMonthDisabled () {
      return this.min && this.min.getMonth() === this.focusedMonth && this.min.getFullYear() === this.focusedYear;
    },
    nextMonthDisabled () {
      return this.max && this.max.getMonth() === this.focusedMonth && this.max.getFullYear() === this.focusedYear;
    },
    minYear () {
      return this.min ? this.min.getFullYear() : this.selectedYear - 10;
    },
    maxYear () {
      return this.max ? this.max.getFullYear() : this.selectedYear + 10;
    }
  },
  mounted () {
    if (this.open) {
      this.$refs.month.focusDate();
    }
    window.addEventListener('click', this.onClickOutside);
  },
  unmounted () {
    window.removeEventListener('click', this.onClickOutside);
  },
  updated () {
    if (this.open) {
      this.$refs.month.focusDate();
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
      this.setFocusedDate(addDays(this.focusedDate, days));
    },
    addMonths (months) {
      this.setMonth(this.focusedDate.getMonth() + months);
    },
    addYears (years) {
      this.setYear(this.focusedDate.getFullYear() + years);
    },
    startOfWeek () {
      this.setFocusedDate(startOfWeek(this.focusedDate, this.firstDayOfWeek));
    },
    endOfWeek () {
      this.setFocusedDate(endOfWeek(this.focusedDate, this.firstDayOfWeek));
    },
    setFocusedDate (date) {
      this.focusedDate = clamp(date, this.min, this.max);
    },
    setMonth (month) {
      const min = setMonth(startOfMonth(this.focusedDate), month);
      const max = endOfMonth(min);
      const date = setMonth(this.focusedDate, month);

      this.setFocusedDate(clamp(date, min, max));
    },
    setYear (year) {
      const min = setYear(startOfMonth(this.focusedDate), year);
      const max = endOfMonth(min);
      const date = setYear(this.focusedDate, year);

      this.setFocusedDate(clamp(date, min, max));
    },
    handleDisabledDate (days) {
      while (this.isDateDisabled(this.focusedDate)) {
        this.addDays(days);
      }
    },
    handleEscKey ($event) {
      if ($event.key === Keys.Escape) {
        this.hide();
      }
    },
    handleFirstFocusableKeydown ($event) {
      // this ensures focus is trapped inside the dialog
      if ($event.key === Keys.Tab && $event.shiftKey) {
        this.$refs.month.focusDate();
        $event.preventDefault();
      }
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
      if ($event.key === Keys.Tab && !$event.shiftKey) {
        $event.preventDefault();
        this.$refs.firstFocusableElement.focus();
        return;
      }

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
    onDateSelect (date) {
      if (!inRange(date, this.min, this.max)) {
        return;
      }

      this.setValue(date);
      this.hide();
    },
    onClickOutside ($event) {
      if (typeof this.$refs.container !== 'undefined') {
        const clickOnTheDatepickerContainer = this.$refs.container === $event.target;
        const clickOnDatepickerChild = this.$refs.container && this.$refs.container.contains($event.target);

        if (!clickOnTheDatepickerContainer && !clickOnDatepickerChild) {
          this.hide();
        }
      }
    },
    hide () {
      this.$emit('update:open', false);
    },
    setValue (date) {
      const value = date;
      this.focusedDate = date;
      this.$emit('input', value);
      this.$emit('update:modelValue', value);
    }
  }

};
</script>
