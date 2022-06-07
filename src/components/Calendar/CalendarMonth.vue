<template>
  <div
    class="text-sm grid gap-y-3"
    :aria-labelledby="labelledById"
  >
    <header class="grid grid-cols-7 gap-2">
      <div
        v-for="dayName in mapWithOffset(dayNames, firstDayOfWeek)"
        :key="dayName"
        class="text-gray-500 text-center text-xs font-bold leading-3"
        scope="col"
      >
        <span aria-hidden="true">{{ dayName.substr(0, 1) }}</span>
        <span class="sr-only">{{ dayName }}</span>
      </div>
    </header>
    <div
      v-for="week in chunk(days, 7)"
      :key="week"
      class="grid grid-cols-7 gap-2"
    >
      <div
        v-for="date in week"
        :key="date"
        class=""
      >
        <CalendarDay
          :ref="isFocused(date) ? 'focusedDate' : null"
          :date="date"
          :today="isToday(date)"
          :focused="isFocused(date)"
          :selected="isSelected(date)"
          :disabled="isDisabled(date)"
          :in-range="isInRange(date, min, max)"
          @keydown="onKeydown"
          @click="onClick"
          @dateSelect="onDateSelect"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getViewOfMonth, isEqual, inRange, isEqualMonth } from '@/utils';
import CalendarDay from './CalendarDay.vue';

export default {
  name: 'CalendarMonth',
  components: { CalendarDay },
  props: {
    focusedDate: {
      type: Date,
      default: null
    },
    selectedDate: {
      type: Date,
      default: null
    },
    labelledById: {
      type: String,
      default: ''
    },
    firstDayOfWeek: {
      type: Number,
      default: 0
    },
    min: {
      type: Date,
      required: true
    },
    max: {
      type: Date,
      required: true
    },
    isDateDisabled: {
      type: Function,
      default: null
    },
    selectableRange: {
      type: Number,
      default: 180
    }
  },
  emits: ['dateSelect', 'click', 'keydown'],
  data () {
    return {
      today: new Date()
    };
  },
  computed: {
    days () {
      return getViewOfMonth(this.focusedDate, this.firstDayOfWeek);
    },
    dayNames () {
      return [
        this.t('datepicker.dayNameZero'),
        this.t('datepicker.dayNameOne'),
        this.t('datepicker.dayNameTwo'),
        this.t('datepicker.dayNameThree'),
        this.t('datepicker.dayNameFour'),
        this.t('datepicker.dayNameFive'),
        this.t('datepicker.dayNameSix')
      ];
    }
  },
  methods: {
    chunk (array, chunkSize) {
      const result = [];

      for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
      }

      return result;
    },
    mapWithOffset (array, startingOffset) {
      return array.map((_, i) => {
        const adjustedIndex = (i + startingOffset) % array.length;
        return array[adjustedIndex];
      });
    },
    isToday (date) {
      return isEqual(date, this.today);
    },
    isFocused (date) {
      return isEqual(date, this.focusedDate);
    },
    isSelected (date) {
      return isEqual(date, this.selectedDate);
    },
    isDisabled (date) {
      const isInSameMonth = isEqualMonth(date, this.focusedDate);
      const isInRange = inRange(date, this.min, this.max);
      const isDateDisabled = this.isDateDisabled ? this.isDateDisabled(date) : false;
      return !isInSameMonth || !isInRange || isDateDisabled;
    },
    isInRange (date) {
      return inRange(date, this.min, this.max);
    },
    onDateSelect (value) {
      this.$emit('dateSelect', value);
    },
    onClick (value) {
      this.$emit('click', value);
    },
    onKeydown ($event) {
      this.$emit('keydown', $event);
    },
    focusDate () {
      if (this.$refs.focusedDate) {
        // focusedDate is an array because it's set inside a v-for but there should only ever be 1
        this.$refs.focusedDate[0].focus();
      }
    }
  }
};
</script>
