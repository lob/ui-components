<template>
  <div :class="[{'h-[60px]' : revealText}]">
    <div
      :class="[
        'cursor-pointer bg-white h-12 top-2 inline-block mr-4 -ml-2.5 mt-1 border border-gray-100 w-[200px] rounded-lg hover:shadow pl-6 focus-within:shadow focus-within:ring-4 focus-within:ring-tertiary-bluebird',
        {'!border-primary-500' : checked && !disabled},
        {'h-[60px]' : helperText},
        {'hover:h-[60px]' : revealText},
        {'h-[60px]' : revealText && checked},
        { 'bg-white-100 cursor-not-allowed': disabled},
        {'!border-coral-700 !bg-coral-100' : error}
      ]"
      @mouseenter="showRevealText"
      @mouseleave="hideRevealText"
      @click="onLargeButtonClick"
    >
      <div
        ref="contentContainer"
        :class="[
          '-ml-1',
          {'-mt-1.5'
            :
            checked
            &&
            revealText}
        ]"
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
            'hidden ml-3.5 text-sm text-gray-300 !font-normal cursor-pointer',
            {'!block !text-primary-500' : checked},
            {'!text-gray-100 cursor-not-allowed' : disabled},
            {'!text-coral-900' : error}
          ]"
        >
          {{ revealText }}
        </div>
      </div>
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
    onLargeButtonClick () {
      this.$emit('update:modelValue', this.value);
    },
    showRevealText () {
      const revealText = this.$refs.revealText;
      const contentContainer = this.$refs.contentContainer;
      if (revealText) {
        revealText.classList.add('!block');
        contentContainer.classList.add('!-mt-1.5');
      }
    },
    hideRevealText () {
      const revealText = this.$refs.revealText;
      const contentContainer = this.$refs.contentContainer;
      if (revealText && !this.checked) {
        revealText.classList.remove('!block');
        contentContainer.classList.remove('!-mt-1.5');
      }
    }
  }
};
</script>
