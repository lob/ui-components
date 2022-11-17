<template>
  <div
    :class="[
      'cursor-pointer border border-gray-300 rounded-sm py-[12px] h-[48px] mr-1 mb-1',
      fullWidth ? 'w-full' : 'w-[234px]',
      {'!h-[64px]' : helperText && !fullHeight},
      {'!h-full' : fullHeight},
      {'hover:border-gray-300': !disabled},
      {'!border-primary-500 ring-inset ring-1 ring-primary-500': checked && !disabled && !error},
      {'bg-white-100 !cursor-not-allowed': disabled},
      {'!border-error': error}
    ]"
    @mouseenter="onContainerHover"
    @mouseleave="onContainerLeaveHover"
    @click="onLargeButtonClick"
  >
    <RadioButton
      :id="id"
      class=""
      :v-model="modelValue"
      :value="value"
      :name="name"
      :label="label"
      :required="required"
      :disabled="disabled"
      :helper-text="helperText"
      :large="true"
      :large-checked="checked"
      :large-hover="largeHover"
      :error="error"
      @click="onClick"
      @input="onInput"
    />
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue';
import RadioButton from '../RadioButton/RadioButton.vue';

export default {
  name: 'RadioButtonLarge',
  components: { RadioButton },
  props: {
    id: {
      type: String,
      required: true
    },
    modelValue: {
      type: [String, Boolean],
      default: null
    },
    name: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Boolean],
      default: ''
    },
    error: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    helperText: {
      type: String,
      default: ''
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    fullHeight: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'input', 'click'],
  data () {
    return {
      parent: null,
      largeHover: false
    };
  },
  computed: {
    checked () {
      return this.modelValue === this.value;
    }
  },
  created () {
    this.parent = getCurrentInstance().parent;
  },
  methods: {
    onInput () {
      this.$emit('update:modelValue', this.value);
      this.$emit('input', this.value);
    },
    onClick ($event) {
      this.$emit('click', $event);
    },
    onLargeButtonClick () {
      if (!this.disabled) {
        this.$emit('update:modelValue', this.value);
      }
    },
    onContainerHover () {
      this.largeHover = true;
    },
    async onContainerLeaveHover () {
      this.largeHover = false;
    }
  }
};
</script>
