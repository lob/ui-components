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
          :ref="isFocused(day) ? 'focusedDay' : null"
          :day="day"
          :today="isToday(day)"
          :focused="isFocused(day)"
          :selected="isSelected(day)"
          :disabled="isDisabled(day)"
          :in-range="isInRange(day, min, max)"
          :date-formatter="dateFormatter"
          @keydown="onKeydown"
          @daySelect="onDaySelect"
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
    focusedDay: {
      type: Date,
      default: null
    },
    selectedDay: {
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
    isDayDisabled: {
      type: Function,
      default: null
    }
  },
  emits: ['daySelect', 'keyboardNavigation', 'keydown'],
  data () {
    return {
      today: new Date()
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
    isToday (day) {
      return isEqual(day, this.today);
    },
    isFocused (day) {
      return isEqual(day, this.focusedDay);
    },
    isSelected (day) {
      return isEqual(day, this.selectedDay);
    },
    isDisabled (day) {
      return this.isDayDisabled ? this.isDayDisabled(day) : false;
    },
    isInRange (day) {
      return inRange(day, this.min, this.max);
    },
    onDaySelect (value) {
      this.$emit('daySelect', value);
    },
    onKeydown ($event) {
      this.$emit('keydown', $event);
    },
    focusDay () {
      this.$refs.focusedDay.focus();
    }
  }
};
</script>

<style scoped lang="scss">

</style>
