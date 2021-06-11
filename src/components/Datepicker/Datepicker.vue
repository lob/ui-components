<template>
  <div
    :class="[
      'duet-date__dialog shadow px-6 py-4.5',
      { 'is-active': open }
    ]"
    role="dialog"
    aria-modal="true"
    :aria-hidden="!open"
    :aria-:labelledby="dialogLabelId"
    @touchmove="onTouchmove"
    @touchstart="onTouchstart"
    @touchend="onTouchend"
  >
    <div
      ref="dialogWrapperNode"
      class="duet-date__dialog-content"
      @keydown="handleEscKey"
    >
      <div
        class="sr-only duet-date__instructions"
        aria-live="polite"
      >
        {{ localization.keyboardInstruction }}
      </div>
      <div
        class="duet-date__header flex justify-between pb-4.5"
        @focusin="disableActiveFocus"
      >
        <button
          class="duet-date__prev text-primary-500"
          :disabled="prevMonthDisabled"
          type="button"
          @click="onPreviousMonthClick"
        >
          <arrow-left class="w-4 h-4" />
          <span class="sr-only">{{ localization.prevMonthLabel }}</span>
        </button>
        <div>
          <span
            :id="dialogLabelId"
            class="text-sm text-gray-900 font-medium"
            aria-live="polite"
            aria-atomic="true"
          >
            {{ localization.monthNames[focusedMonth] }} {{ focusedDay.getFullYear() }}
          </span>
        </div>
        <button
          class="duet-date__next text-primary-500"
          :disabled="nextMonthDisabled"
          type="button"
          @click="onNextMonthClick"
        >
          <arrow-right class="w-4 h-4" />
          <span class="sr-only">{{ localization.nextMonthLabel }}</span>
        </button>
      </div>
      <DatepickerMonth
        :date-formatter="dateFormatter"
        :selected-date="valueAsDate"
        :focused-day="focusedDay"
        :on-date-select="onDaySelect"
        :on-keyboard-navigation="onKeyboardNavigation"
        :labelled-by-id="dialogLabelId"
        :localization="localization"
        :first-day-of-week="firstDayOfWeek"
        :focused-day-ref="processFocusedDayNode"
        :min="minDate"
        :max="maxDate"
      />
    </div>
  </div>
</template>

<script>
import  ArrowLeft from '../Icons/ArrowLeft';
import  ArrowRight from '../Icons/ArrowRight';
import DatepickerMonth from './DatepickerMonth.vue';
import { Keys, startOfWeek, endOfWeek, startOfMonth, endOfMonth, setMonth, setYear, clamp, parseISODate, inRange, printISODate } from '../../utils';

const TRANSITION_MS = 300;

export default {
  name: 'Datepicker',
  components: { DatepickerMonth, ArrowLeft, ArrowRight },
  props: {
    modelValue: {
      type: String,
      default: ''
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
    }
  },
  emits: ['update:modelValue', 'input', 'close'],
  data () {
    return {
      open: false,
      activeFocus: false,
      dialogLabelId: 'TODO: dialog label',
      monthSelectId: 'TODO: monthselect label',
      yearSelectId: 'TODO: yearselect label',
      initialTouchX: '',
      initialTouchY: '',
      focusTimeoutId: '',
      focusedDay: new Date(),
      minDate: parseISODate(this.min),
      maxDate: parseISODate(this.max)
    };
  },
  computed: {
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
    },
    valueAsDate () {
      return parseISODate(this.modelValue);
    }
  },
  methods: {
    processFocusedDayNode (element) {
      this.$refs.focusedDayNode = element;

      if (this.activeFocus && this.open) {
        setTimeout(() => element.focus(), 0);
      }
    },
    range (from, to) {
      const result = [];
      for (let i = from; i <= to; i++) {
        result.push(i);
      }
      return result;
    },
    hide (moveFocusToButton = true) {
      this.open = false;
      this.$emit('close');
      // this.duetClose.emit({
      //   component: "duet-date-picker",
      // })

      // in cases where calendar is quickly shown and hidden
      // we should avoid moving focus to the button
      clearTimeout(this.focusTimeoutId);

      if (moveFocusToButton) {
      // iOS VoiceOver needs to wait for all transitions to finish.
        setTimeout(() => this.$refs.datePickerButton.focus(), TRANSITION_MS + 200);
      }
    },
    addDays (days) {
      this.setFocusedDay(this.addDays(this.focusedDay, days));
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
    disableActiveFocus () {
      this.activeFocus = false;
    },
    handleEscKey ($event) {
      if ($event.key === Keys.Escape) {
        this.hide();
      }
    },
    handleFirstFocusableKeydown ($event) {
    // this ensures focus is trapped inside the dialog
      if ($event.key === Keys.Tab && $event.shiftKey) {
        this.$refs.focusedDayNode.focus();
        $event.preventDefault();
      }
    },
    onKeyboardNavigation ($event) {
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
          break;
        case Keys.Left:
          this.addDays(-1);
          break;
        case Keys.Down:
          this.addDays(7);
          break;
        case Keys.Up:
          this.addDays(-7);
          break;
        case Keys.PageUp:
          if ($event.shiftKey) {
            this.addYears(-1);
          } else {
            this.addMonths(-1);
          }
          break;
        case Keys.PageDown:
          if ($event.shiftKey) {
            this.addYears(1);
          } else {
            this.addMonths(1);
          }
          break;
        case Keys.Home:
          this.startOfWeek();
          break;
        case Keys.End:
          this.endOfWeek();
          break;
        default:
          handled = false;
      }

      if (handled) {
        $event.preventDefault();
        this.enableActiveFocus();
      }
    },
    onDaySelect (_$event, day) {
      if (!inRange(day, parseISODate(this.min), parseISODate(this.max))) {
        return;
      }

      this.setValue(day);
      this.hide();
    },
    onMonthSelect ($event) {
      this.setMonth(parseInt($event.target.value, 10));
    },
    onYearSelect ($event) {
      this.setYear(parseInt($event.target.value, 10));
    },
    onPreviousMonthClick ($event) {
      $event.preventDefault();
      this.addMonths(-1);
    },
    onNextMonthClick ($event) {
      $event.preventDefault();
      this.addMonths(1);
    },
    onTouchmove ($event) {
      $event.preventDefault();
    },
    onTouchstart ($event) {
      const touch = $event.changedTouches[0];
      this.initialTouchX = touch.pageX;
      this.initialTouchY = touch.pageY;
    },
    onTouchend ($event) {
      const touch = $event.changedTouches[0];
      const distX = touch.pageX - this.initialTouchX; // get horizontal dist traveled
      const distY = touch.pageY - this.initialTouchY; // get vertical dist traveled
      const threshold = 70;

      const isHorizontalSwipe = Math.abs(distX) >= threshold && Math.abs(distY) <= threshold;
      const isDownwardsSwipe = Math.abs(distY) >= threshold && Math.abs(distX) <= threshold && distY > 0;

      if (isHorizontalSwipe) {
        this.addMonths(distX < 0 ? 1 : -1);
      } else if (isDownwardsSwipe) {
        this.hide(false);
        $event.preventDefault();
      }

      this.initialTouchY = null;
      this.initialTouchX = null;
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
