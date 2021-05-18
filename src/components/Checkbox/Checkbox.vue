<template>
  <label class="checkbox" :class="{'checkbox__input--disabled': disabled}">
    <input
      :class="['checkbox__input', {'checkbox__input--error': error}]"
      type="checkbox"
      :value="checked"
      @input="onInput"
      :name="name"
      :disabled="disabled"
      :required="required"
    />
    <span class="checkmark"></span>
    <label for="name" class="checkbox__label">{{label}}</label>
  </label>
</template>

<script>
  export default {
    name: 'Checkbox',
    props: {
      label: {
        type: String,
        required: true
      },
      value: {
        type: Boolean,
        required: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      required: {
        type: Boolean,
        default: false
      },
      error: {
        type: Boolean,
        default: false
      },
      name: { 
        type: String,
        default: ''
      }
    },
    computed: {
      checked() {
        return this.value
      }
    },
    methods: {
      onInput({target: {checked}}) {
        this.$emit('input', checked)
      }
    }
  }
</script>

<style scoped lang="scss">
  input.checkbox__input[type=checkbox] { /* hides default input for specificity reasons */
    position: absolute;
    margin: 0 !important;
    padding: 0 !important;
    opacity: 0;
    height: 0;
    width: 0;
    pointer-events: none;
  }

  .checkbox {    
    position: relative;
    display: block;
    min-height: 21px;
    margin-top: 0;
    margin-bottom: 5px;
    margin-left: 25px;
    margin-right: 10px;
    cursor: pointer;
    text-align: left;
  }

  .checkbox__input--disabled {
    cursor: not-allowed;

    .checkmark { 
      background: var(--color-white-mist);
      border-color: var(--color-gray-xl-dove);
    }  

    /* locked state */
    input:checked ~ .checkmark {
      background: var(--color-gray-xl-dove) !important;
      border-color: var(--color-gray-xl-dove) !important;
    }
  }

  .checkbox__label {
    margin-top: 3px;
    text-align: left;
    display: inline-block;
  }

  .checkbox__label__tooltip {
    font-size: 12px;
    position: absolute;
    right: auto;
    top: 5px;
    margin-left: 8px;
  }

  .checkmark {
    content: "";
    width: 14px;
    height: 14px;
    margin-right: 5px;
    border-radius: 2px;
    border-style: solid;
    border-width: 1px;
    border-color: var(--color-gray-xl-dove);
    left: -20px;
    position: absolute;
    top: 5px;
  }

  .checkbox:hover input ~ .checkmark {
    box-shadow: 0px 0px 4px #{'rgba(var(--color-primary-rgb), 0.4)'};
  }

  .checkbox__input:focus ~ .checkmark {
    border-color: var(--color-primary-xl);
  }

  .checkbox__input--error ~ .checkmark { 
    border-color: var(--color-feedback-error);
  }

  .checkbox input:checked ~ .checkmark {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  .checkbox input:checked ~ .checkmark:after {
    display: block;
  }

  .checkbox .checkmark:after {
    left: 4px;
    top: 0px;
    width: 3px;
    height: 8px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
</style>
