<template>
  <div :class="['checkbox relative block mt-0 mb-1 ml-6 mr-3 cursor-pointer text-left min-h-5', 
          {'cursor-not-allowed': disabled},
          {'inline-block': sameLine}]"
  >
    <input
      type="checkbox"
      class="absolute m-0 p-0 h-0 w-0 opacity-0 pointer-events-none"
      :checked="checked"
      :value="value"
      :id="name"
      :name="name"
      :disabled="disabled"
      :required="required"
      @input="onInput"
    />
    <span 
      :class="['checkmark w-4 h-4 mr-1 rounded-sm border-solid border border-gray-l -left-5 absolute top-1', {'border-gray-l bg-gray-xxl': disabled},
        {'border-gray-l bg-gray-l': disabled && checked},
        {'border-error': error}, 
        {'border-primary bg-primary': checked}]"
      style="content: ''"
    ></span>
    <label for="name" class="inline-block">{{label}}<template v-if="required">*</template></label>
  </div>
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
        type: [String, Boolean],
        default: null
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
        required: true
      },
      sameLine: { 
        type: Boolean,
        default: false
      },
      modelValue: {
        type: [Array, Boolean],
        default: null
      }
    },
    model: {
      prop: 'modelValue',
      event: 'input'
    },
    computed: {
      checked() {
        if (typeof this.modelValue === 'object') {
          return this.modelValue.includes(this.value)
        }
        return this.modelValue
      }
    },
    methods: {
      onInput($event) {
        if (typeof this.modelValue === 'object') {
          let checked = [...this.modelValue]
          if (checked.includes(this.value)) {
            checked.splice(checked.indexOf(this.value), 1);
          } else {
            checked.push(this.value);
          }
          this.$emit('input', checked);
        } else {
          this.$emit('input', $event.target.checked)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .checkbox:hover input ~ .checkmark {
    box-shadow: 0px 0px 4px var(--color-primary-rgb-xl);
  }

  .checkbox input:focus ~ .checkmark {
    @apply border-primary-xl;
  }

  .checkmark:after {
    content: "";
    @apply absolute;
    @apply hidden;
  }

  .checkbox input:checked ~ .checkmark:after {
    @apply block; 
  }

  .checkbox .checkmark:after {
    @apply left-1.5;
    @apply top-0.5;
    @apply w-1;
    @apply h-2.5;
    @apply border-solid;
    @apply border-white;
    border-width: 0 3px 3px 0;
    @apply transform;
    @apply rotate-45;
  }

</style>
