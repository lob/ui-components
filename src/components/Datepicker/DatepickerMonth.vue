<template>
  <div
    class="text-sm grid gap-y-3"
    aria-labelledby="{labelledById}"
  >
    <header class="grid grid-cols-7 gap-3">
      <div
        v-for="dayName in mapWithOffset(localization.dayNames, firstDayOfWeek)"
        :key="dayName"
        class="text-gray-500"
        scope="col"
      >
        <span aria-hidden="true">{{ dayName.substr(0, 2) }}</span>
        <span class="sr-only">{{ dayName }}</span>
      </div>
    </header>
    <div
      v-for="week in chunk(days, 7)"
      :key="week"
      class="grid grid-cols-7 gap-3"
    >
      <div
        v-for="date in week"
        :key="date"
        class=""
      >
        <DatepickerDay
          :ref="isFocused(date) ? 'focusedDate' : null"
          :date="date"
          :today="isToday(date)"
          :focused="isFocused(date)"
          :selected="isSelected(date)"
          :disabled="isDisabled(date)"
          :in-range="isInRange(date, min, max)"
          @keydown="onKeydown"
          @dateSelect="onDateSelect"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getViewOfMonth, isEqual, inRange } from '../../utils';
import DatepickerDay from './DatepickerDay.vue';

export default {
  name: 'DatepickerMonth',
  components: { DatepickerDay },
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
    localization: {
      type: Object,
      default: () => ({})
    },
    firstDayOfWeek: {
      type: Number,
      default: 0
    },
    min: {
      type: Date,
      default: null
    },
    max: {
      type: Date,
      default: null
    },
    dateFormatter: {
      type: Object,
      default: null
    },
    isDateDisabled: {
      type: Function,
      default: null
    }
  },
  emits: ['dateSelect', 'keyboardNavigation', 'keydown'],
  data () {
    return {
      today: new Date()
    };
  },
  computed: {
    days () {
      return getViewOfMonth(this.focusedDate, this.firstDayOfWeek);
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
      return this.isDateDisabled ? this.isDateDisabled(date) : false;
    },
    isInRange (date) {
      return inRange(date, this.min, this.max);
    },
    onDateSelect (value) {
      this.$emit('dateSelect', value);
    },
    onKeydown ($event) {
      this.$emit('keydown', $event);
    },
    focusDate () {
      this.$refs.focusedDate.focus();
    }
  }
};
</script>
