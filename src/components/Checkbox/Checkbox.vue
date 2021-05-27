<template>
  <label
    :class="['checkbox relative block mt-0 mb-1 ml-6 mr-3 cursor-pointer text-left min-h-5',
             {'cursor-not-allowed': disabled},
             {'inline-block': sameLine}]"
  >
    <input
      :id="name"
      type="checkbox"
      class="absolute m-0 p-0 h-0 w-0 opacity-0 pointer-events-none"
      :checked="checked"
      :value="value"
      :name="name"
      :disabled="disabled"
      :required="required"
      @input="onInput"
    >
    <span
      style="content: ''"
      :class="['checkmark w-4 h-4 mr-1 rounded-sm border-solid border border-gray-l -left-5 absolute top-1', 
               {'bg-gray-xxl': disabled},
               {'bg-gray-l': disabled && checked},
               {'border-error': error},
               {'border-primary bg-primary': checked}]"
    />
    <span
      class="cursor-pointer"
    >
      {{ required ? label + '*' : label}}
    </span>
  </label>
</template>

<script>
export default {
  name: 'Checkbox',
  model: {
    prop: 'modelValue',
    event: 'input'
  },
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
  computed: {
    checked () {
      if (this.modelValue && typeof this.modelValue === 'object') {
        return this.modelValue.includes(this.value);
      }
      return this.modelValue;
    }
  },
  methods: {
    onInput ($event) {
      if (this.modelValue && typeof this.modelValue === 'object') {
        const checked = [...this.modelValue];
        if (checked.includes(this.value)) {
          checked.splice(checked.indexOf(this.value), 1);
        } else {
          checked.push(this.value);
        }
        this.$emit('input', checked);
      } else {
        this.$emit('input', $event.target.checked);
      }
    }
  }
};
</script>

<style scoped lang="scss">
  .checkbox:hover input ~ .checkmark {
    box-shadow: 0px 0px 4px var(--color-primary-rgb-l);
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
    border-width: 0 3px 3px 0;
    top: 1px;
    width: 5px;
    height: 9px;
    left: 4px;
    @apply border-solid;
    @apply border-white;
    @apply transform;
    @apply rotate-45;
  }

</style>
