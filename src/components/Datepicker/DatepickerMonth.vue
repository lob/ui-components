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
        v-for="day in week"
        :key="day"
        class=""
      >
        <DatepickerDay
          :day="day"
          :today="today"
          :focused-day="focusedDay"
          :selected="isSelected(day, selectedDay)"
          :disabled="isDisabled(day)"
          :in-range="isInRange(day, min, max)"
          :on-day-select="onDateSelect"
          :date-formatter="dateFormatter"
          :on-keyboard-navigation="onKeyboardNavigation"
          :focused-day-ref="focusedDayRef"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getViewOfMonth, isEqual, DaysOfWeek, inRange } from '../../utils';
import DatepickerDay from './DatepickerDay.vue';

export default {
  name: 'DatepickerMonth',
  components: { DatepickerDay },
  props: {
    selectedDay: {
      type: Date,
      default: null
    },
    focusedDay: {
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
    }
    // onDateSelect,
    // onKeyboardNavigation,
    // focusedDayRef
  },
  data () {
    return {
      today: new Date(),
      focusedDayRef: null
    };
  },
  computed: {
    days () {
      return getViewOfMonth(this.focusedDay, this.firstDayOfWeek);
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
    isSelected (day) {
      return isEqual(day, this.selectedDay);
    },
    isDisabled (day) {
      const dayOfWeek = day.getDay();
      return dayOfWeek === DaysOfWeek.Saturday || dayOfWeek === DaysOfWeek.Sunday;
    },
    isInRange (day) {
      return inRange(day, this.min, this.max);
    },
    onDateSelect () {
      return;
    },
    onKeyboardNavigation () {
      return;
    }
  }
};
</script>

<style scoped lang="scss">

</style>
