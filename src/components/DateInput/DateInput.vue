<template>
  <div class="relative">
    <TextInput
      :id="inputId"
      v-model="dateString"
      :label="label"
      :sr-only-label="srOnlyLabel"
      :size="size"
      :error="error"
      :aria-describedby="error ? 'error-message' : ''"
      @click.stop="isOpen = !isOpen"
      @keydown.space.stop="isOpen = !isOpen"
    >
      <template #iconRight>
        <Calendar
          :class="['text-gray-900',
                   { 'w-3.5 h-3.5': size === 'small',
                     'w-5 h-5': size === 'default' } ]"
        />
      </template>
    </TextInput>
    <Datepicker
      :id="datepickerId"
      v-model="date"
      v-model:open="isOpen"
      :min="min"
      :max="max"
      :class="['absolute w-72', {'right-0' : rightJustified}]"
      :disable-weekends="disableWeekends"
      :disable-holidays="disableHolidays"
    />
    <div
      v-show="error && errorMessage"
      id="error-message"
      aria-live="polite"
      class="mt-2 ml-1 text-error text-xs flex items-center"
    >
      <CircleExclamation class="w-4 h-4 mr-1" /> {{ error && errorMessage }}
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';
import TextInput from '../TextInput/TextInput';
import Datepicker from '../Datepicker/Datepicker';
import Calendar from '../Icons/Calendar.vue';
import CircleExclamation from '../Icons/CircleExclamation.vue';

export default {
  name: 'DateInput',
  components: { TextInput, Datepicker, Calendar, CircleExclamation },
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: Date,
      default: null
    },
    open: {
      type: Boolean,
      required: true
    },
    srOnlyLabel: {
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
    rightJustified: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['default', 'small'].includes(value);
      }
    },
    disableWeekends: {
      type: Boolean,
      default: false
    },
    disableHolidays: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: [String, null],
      default: null
    }
  },
  emits: ['update:modelValue', 'update:open'],
  computed: {
    date: {
      get () {
        return this.modelValue;
      },
      set (date) {
        this.$emit('update:modelValue', date);
      }
    },
    isOpen: {
      get () {
        return this.open;
      },
      set (isOpen) {
        this.$emit('update:open', isOpen);
      }
    },
    dateString () {
      if (this.date) {
        return format(this.date, this.t('dateFormat'));
      } else {
        return '';
      }
    },
    datepickerId () {
      return `${this.id}-datepicker`;
    },
    inputId () {
      return `${this.id}-input`;
    }
  }
};
</script>
