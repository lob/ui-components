<template>
  <label :class="['radio', {'radio--next-line': nextLine}]">
    <input
      type="radio"
      :class="['radio__input', {'radio__input--error': error}]"
      :name="name"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      @change="onChange"
    />
    <span class="radio__label">{{label}}</span>
  </label>
</template>

<script>
export default {
  name: 'RadioButton',
  props: {
    modelValue: {
      default: ''
    },
    nextLine: Boolean,
    error: Boolean,
    name: String,
    value: String,
    label: String,
    disabled: Boolean,
  },
  model: {
    prop: 'modelValue',
    event: 'input'
  },
  computed: {
    checked() {
      return this.modelValue == this.value
    }
  },
  methods: {
    onChange() {
      this.$emit('change', this.value)
    }
  }
}
</script>

<style scoped lang="scss">
  .radio {
    margin-top: 0;
    margin-bottom: 5px;
    margin-left: 25px;
    margin-right: 10px;
    cursor: pointer;
    display: inline-block;
  }

  .radio--next-line {
    display: block;
  }

  .radio--disabled {
    cursor: not-allowed;
  }

  .radio__input {
    position: absolute;
    margin: 0 !important;
    padding: 0 !important;
    opacity: 0;
    height: 0;
    width: 0;
    pointer-events: none;
  }

  .radio__input + *::before {
    content: "";
    width: 14px;
    height: 14px;
    margin-right: 5px;
    border-radius: 50%;
    border-style: solid;
    border-width: 1px;
    border-color: var(--color-gray-xl-dove);
    left: -20px;
    position: absolute;
    top: 4px;
  }

  .radio__input:checked + *::before {
    background: radial-gradient(var(--color-primary) 0%, var(--color-primary) 40%, transparent 50%, transparent);
    border-color: var(--color-gray-xl-dove);
    box-shadow: 0px 0px 4px #{'rgba(var(--color-primary-rgb), 0.2)'};
  }

  .radio__input:hover + *::before {
    box-shadow: 0px 0px 4px #{'rgba(var(--color-primary-rgb), 0.4)'};
  }

  .radio__input:focus + *::before {
    border-color: var(--color-primary-xl);
  }

  .radio__input[disabled] + *::before {
    background: var(--color-white-mist);
    border-color: var(--color-gray-xl-dove);
    box-sizing: border-box;
  }

  .radio__input--error + *::before {
    border-color: var(--color-feedback-error);
  }

  .radio__label {
    margin-bottom: 0;
    text-align: left;
    display: inline-block;
    font-weight: 300;
  }
</style>
