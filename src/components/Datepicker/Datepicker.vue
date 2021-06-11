<template>
  <div
    :class="[
      'duet-date__dialog',
      {'is-left': direction === 'left'},
      { 'is-active': open }
    ]"
    role="dialog"
    aria-modal="true"
    :aria-hidden:="this.open ? 'false' : 'true'"
    :aria-:labelledby="dialogLabelId"
    :onTouchMove="handleTouchMove"
    :onTouchStart="handleTouchStart"
    :onTouchEnd="handleTouchEnd"
  >
    <div
      :ref="element => (dialogWrapperNode = element)"
      class="duet-date__dialog-content"
      :onKeyDown="handleEscKey"
    >
      <div
        class="duet-date__vhidden duet-date__instructions"
        aria-live="polite"
      >
        {this.localization.keyboardInstruction}
      </div>
      {/**
      * With onFocusIn, which is what TS types expect, Stencil ends up listening to a
      * focusIn event, which is wrong as it needs to be focusin. So we had to use onFocusin
      * here which is wrong for the TS types, but ends up with the correct event listener
      * in Stencil. See issue: https://github.com/ionic-team/stencil/issues/2628
      */}
      {/* @ts-ignore */}
      <div
        class="duet-date__mobile"
        onFocusin:="this.disableActiveFocus"
      >
        <label class="duet-date__mobile-heading">{this.localization.calendarHeading}</label>
        <button
          :ref="element =>(firstFocusableElement = element)"
          class="duet-date__close"
          :onKeyDown="handleFirstFocusableKeydown"
          :onClick="() => hide()"
          type="button"
        >
          <svg
            aria-hidden="true"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <path
              d="M0 0h24v24H0V0z"
              fill="none"
            />
            <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
          </svg>
          <span class="duet-date__vhidden">{this.localization.closeLabel}</span>
        </button>
      </div>
      {/* @ts-ignore */}
      <div
        class="duet-date__header"
        onFocusin:="this.disableActiveFocus"
      >
        <div>
          <h2
            :id="dialogLabelId"
            class="duet-date__vhidden"
            aria-live="polite"
            aria-atomic="true"
          >
            {this.localization.monthNames[focusedMonth]} {this.focusedDay.getFullYear()}
          </h2>

          <label
            :htmlFor="monthSelectId"
            class="duet-date__vhidden"
          >
            {this.localization.monthSelectLabel}
          </label>
          <div class="duet-date__select">
            <select
              :id="monthSelectId"
              :ref="element => (monthSelectNode = element)"
              class="duet-date__select--month"
              :onChange="handleMonthSelect"
            >
              {this.localization.monthNames.map((month, i) => (
              <option
                :key="month"
                :value="i"
                :selected="i === focusedMonth"
              >
                {month}
              </option>
              ))}
            </select>
            <div
              class="duet-date__select-label"
              aria-hidden="true"
            >
              <span>{this.localization.monthNamesShort[focusedMonth]}</span>
              <svg
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z" />
              </svg>
            </div>
          </div>

          <label
            :htmlFor="yearSelectId"
            class="duet-date__vhidden"
          >
            {this.localization.yearSelectLabel}
          </label>
          <div class="duet-date__select">
            <select
              :id="yearSelectId"
              class="duet-date__select--year"
              onChange:="this.handleYearSelect"
            >
              {range(minYear, maxYear).map(year => (
              <option
                :key="year"
                :selected="year === focusedYear"
              >
                {year}
              </option>
              ))}
            </select>
            <div
              class="duet-date__select-label"
              aria-hidden="true"
            >
              <span>{this.focusedDay.getFullYear()}</span>
              <svg
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="duet-date__nav">
          <button
            class="duet-date__prev"
            :onClick="handlePreviousMonthClick"
            :disabled="prevMonthDisabled"
            type="button"
          >
            <svg
              aria-hidden="true"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
            >
              <path d="M14.71 15.88L10.83 12l3.88-3.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z" />
            </svg>
            <span class="duet-date__vhidden">{this.localization.prevMonthLabel}</span>
          </button>
          <button
            class="duet-date__next"
            :onClick="handleNextMonthClick"
            :disabled="nextMonthDisabled"
            type="button"
          >
            <svg
              aria-hidden="true"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
            >
              <path d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z" />
            </svg>
            <span class="duet-date__vhidden">{this.localization.nextMonthLabel}</span>
          </button>
        </div>
      </div>
      <DatepickerMonth
        :date-formatter="dateFormatShort"
        :selected-date="valueAsDate"
        :focused-date="focusedDay"
        :on-date-select="handleDaySelect"
        :on-keyboard-navigation="handleKeyboardNavigation"
        :labelled-by-id="dialogLabelId"
        :localization="localization"
        :first-day-of-week="firstDayOfWeek"
        :focused-day-ref="processFocusedDayNode"
        :min="minDate"
        :max="maxDate"
        :is-date-disabled="isDateDisabled"
      />
    </div>
  </div>
</template>

<script>
import DatepickerMonth from './DatepickerMonth.vue';

export default {
  name: 'Datepicker',
  components: { DatepickerMonth },
  props: {

  },
  computed: {

  },
  methods: {

  }
};
</script>

<style scoped lang="scss">

</style>
