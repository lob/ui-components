<template>
  <div :class="['radio', {'radio--next-line': nextLine}, {'radio--disabled': disabled}]">
    <input
      type="radio"
      :class="['radio__input', {'radio__input--error': error}]"
      :name="name"
      :id="value"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      @click="onClick($event)"
    />
    <label :for="value">{{label}}</label>
  </div>
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
    onClick(event) {
      this.$emit('click', event)
      this.$emit('input', this.value)
      if (!this.checked) {
        this.$emit('change', event)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .radio {
    display: inline-block;
    cursor: pointer;
    margin-top: 5px;
    margin-right: 15px;
  }

  .radio--next-line {
    display: block;
    margin-bottom: 5px;
  }

  .radio--disabled {
    cursor: not-allowed;
  }

  .radio__input {
    position: absolute;
    margin: 0;
    padding: 0;
    opacity: 0;
    height: 0;
    width: 0;
    pointer-events: none;
    margin-top: 4px;
  
    + label {
      font-size: 14px;
      font-weight: 300;
      position: relative;
      display: inline-block;
      cursor: pointer;
      margin-left: 25px;

      &::before {
        content: '';
        position: absolute;
        display: inline-block;
        left: -20px;
        top: 2px;
        border-radius: 50%;
        border: 1px solid var(--color-gray-xl-dove);
        width: 12px;
        height: 12px;
        background: transparent;
      }

      &::after {
        content: '';
        position: absolute;
        display: inline-block;
        left: -17px;
        top: 5px;
        border-radius: 50%;
        width: 8px;
        height: 8px;
      }
    }

    &:checked {
      + label::after {
        background: var(--color-primary);
        border-color: var(--color-gray-xl-dove);
        box-shadow: 0px 0px 4px #{'rgba(var(--color-primary-rgb), 0.2)'};
      }
    }

    &:hover {
      + label::before {
        box-shadow: 0px 0px 4px #{'rgba(var(--color-primary-rgb), 0.4)'};
      }
    }

    &:focus {
      + label::before {
        border-color: var(--color-primary-xl);
      }
    }

    &:disabled {
      + label::before {
        background: var(--color-white-mist);
        border-color: var(--color-gray-xl-dove);
        box-sizing: border-box;
      }
    }
  }

  .radio__input--error {
    + label::before {
      border-color: var(--color-feedback-error);
    }
  }
</style>
