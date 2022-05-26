<template>
  <div
    :class="[
      'bg-white relative h-12 inline-block mr-6 mt-1 border border-gray-100 w-[200px] rounded-lg hover:shadow pl-6 focus-within:shadow focus-within:ring-4 focus-within:ring-tertiary-bluebird',
      { '!block mb-1': parent.props.separateLines },
      {'bg-white-100' : disabled},
      { 'cursor-not-allowed': disabled || readonly },
      {'!border-primary-500' : checked},
      {'!h-[60px]' : helperText},
      {'hover:h-[60px]' : revealText},
      {'!h-[60px]' : revealText && checked}
    ]"
    @click="onButtonClick"
    @mouseenter="showRevealText"
    @mouseleave="hideRevealText"
  >
    <RadioButton
      :id="id"
      class="w-full"
      :v-model="modelValue"
      :value="value"
      :name="name"
      :label="label"
      :error="error"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :helper-text="helperText"
      :large="true"
      :large-checked="checked"
      @click="onClick"
      @input="onInput"
    />
    <div
      v-if="revealText"
      ref="revealText"
      :class="[
        'hidden ml-3.5 text-sm text-gray-300 !font-normal',
        {'!block !text-primary-500' : checked}
      ]"
    >
      {{ revealText }}
    </div>
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
    label: {
      type: String,
      default: ''
    },
    error: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    helperText: {
      type: String,
      default: ''
    },
    revealText: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'input', 'click'],
  data () {
    return {
      parent: null
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
    showRevealText () {
      const revealText = this.$refs.revealText;
      if (revealText) {
        revealText.classList.add('!block');
      }
    },
    hideRevealText () {
      const revealText = this.$refs.revealText;
      if (revealText && !this.checked) {
        revealText.classList.remove('!block');
      }
    }
  }
};
</script>
