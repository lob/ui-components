<template>
  <TextInput
    :id="id"
    ref="textInput"
    :readonly="false"
    v-bind="inputProps"
    @focus="onFocus"
    @blur="onBlur"
    @input="onInput"
    @change="onChange"
  />
</template>
<script>
import TextInput from '../TextInput/TextInput';
import CurrencyFormatter from './currencyFormatter';
import { escapeRegExp, stringDiff } from '@/utils';

const ZERO = '$0.00';

/**
 * Helper to count the occurrences of a given substring in a string
 * @param {string} str
 * @param {string} substr
 * @returns {number}
 */
function countOccurrences(str, substr) {
  return str.match(new RegExp(escapeRegExp(substr), 'g'))?.length || 0;
}

export default {
  name: 'CurrencyInput',
  components: {
    TextInput
  },
  props: {
    id: {
      type: String,
      default: null
    },
    modelValue: {
      type: Number,
      default: 0
    },
    inputProps: {
      type: Object,
      default: () => ({})
    },
    max: {
      type: Number,
      default: null
    },
    min: {
      type: Number,
      default: null
    },
    selectOnFocus: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'input', 'change', 'focus', 'blur'],
  data() {
    return {
      focused: false,
      formattedValue: '',
      formatter: new CurrencyFormatter({
        locale: 'en-US',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    };
  },
  watch: {
    modelValue(value) {
      this.format(value);
    }
  },
  mounted() {
    this.format.call(this, this.modelValue);
  },
  methods: {
    onBlur() {
      this.format(this.modelValue);
      this.$emit('blur');
    },
    onFocus() {
      this.format(this.modelValue);
      if (this.selectOnFocus) {
        this.getInputEl().select();
      }
      this.$emit('focus');
    },
    onChange($event) {
      this.$emit('change', $event);
    },
    onInput(v) {
      const { diff, type } = stringDiff(this.formattedValue, v ?? '');

      // if the user deletes the decimal,
      if (diff === '.' && type === 'deletion') {
        // if the user deletes the decimal, specifically, re-insert it to avoid unexpected behavior
        v = this.formattedValue;
      }

      let val = this.formatter.parse(v);

      // enforce min/max
      if (this.max !== null && val > this.max) {
        val = this.max;
      }
      if (this.min !== null && val < this.min) {
        val = this.min;
      }

      // handle formatting and emit numeric value as input event
      this.format(val);
      this.$emit('input', val);
    },
    /**
     * takes a number, formats it as currency, and updates the input value
     * @param {number|null} value
     */
    format(value) {
      const inputEl = this.getInputEl();

      // if user deletes all characters, set value to 0
      if (value === null) {
        this.$emit('update:modelValue', 0);
        this.formattedValue = ZERO;
        return;
      }

      const formattedValue = this.formatter.format(value);

      const { type, prevValue, editIndex } = stringDiff(
        this.formattedValue,
        formattedValue
      );

      // if formatted value is invalid or a noop, do nothing, but keep the caret's behavior consistent
      if (!formattedValue || formattedValue === this.formattedValue) {
        const caretPosition = inputEl.selectionStart;
        inputEl.value = this.formattedValue;
        this.setCaretPosition(caretPosition <= 1 ? 2 : caretPosition);
        return;
      }

      // If the number of commas in the formatted value has changed, adjust the caret position
      const separatorOffset =
        countOccurrences(formattedValue, ',') -
        countOccurrences(this.formattedValue, ',');
      let newCaretPosition = inputEl.selectionStart + separatorOffset;

      // If the user is inputting or deleting at the 0th index (the `$` sign), increment the caret position by an additional 1
      if (newCaretPosition === 0 || newCaretPosition === 1) {
        newCaretPosition = 2;
      }

      // If the user replaces a '0' value, keep the caret position on the integer side of the decimal
      if (
        type === 'edit' &&
        editIndex <= this.formattedValue.indexOf('.') &&
        prevValue === '0'
      ) {
        newCaretPosition--;
      }

      // Update the value and formatted value
      this.$emit('update:modelValue', this.formatter.parse(formattedValue));
      this.formattedValue = formattedValue;

      // Update the input value and caret position
      inputEl.value = formattedValue;
      this.setCaretPosition(newCaretPosition);
    },
    /**
     * Sets the position of the caret in the input
     * @param {number} start
     * @param {number} end
     */
    setCaretPosition(start, end = start) {
      const input = this.getInputEl();
      input.setSelectionRange(start, end);
    },
    /**
     * Returns the input element of the TextInput. Unfortunate that we need to do it this way, but in order
     * to enforce the currency format within the input itself, and keep the caret position consistent
     * we need to access the input element directly.
     * @returns {HTMLInputElement}
     */
    getInputEl() {
      return this.$refs.textInput.$refs.input;
    }
  }
};
</script>
