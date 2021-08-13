<template>
  <div class="relative">
    <TextInput
      :id="inputId"
      v-model="dateString"
      :label="label"
      :sr-only-label="srOnlyLabel"
      @click.stop="isOpen = !isOpen"
      @keydown.space.stop="isOpen = !isOpen"
    />
    <Datepicker
      :id="datepickerId"
      v-model="date"
      v-model:open="isOpen"
      :min="min"
      :max="max"
      :class="['absolute w-72', {'right-0' : rightJustified}]"
    />
  </div>
</template>

<script>
import { format } from 'date-fns';
import TextInput from '../TextInput/TextInput';
import Datepicker from '../Datepicker/Datepicker';

export default {
  name: 'DateInput',
  components: { TextInput, Datepicker },
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
      required: true
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
      return format(this.date, this.t('dateFormat'));
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