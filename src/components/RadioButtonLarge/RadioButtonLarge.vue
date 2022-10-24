<template>
  <div
    :class="[
      {'min-h-[60px]': revealText},
      {'!cursor-not-allowed': disabled}
    ]"
  >
    <div
      :class="[
        'min-h-[3rem] cursor-pointer bg-white top-1 inline-block mr-4 border border-gray-100 rounded-lg pl-2',
        fullWidth ? 'w-full' : 'w-[200px]',
        {'hover:border-gray-300': !disabled},
        {'!border-primary-500 ring-inset ring-1 ring-primary-500': checked && !disabled && !error},
        {'bg-white-100 !cursor-not-allowed': disabled},
        {'!border-error': error}
      ]"
      @mouseenter="onContainerHover"
      @mouseleave="onContainerLeaveHover"
      @click="onLargeButtonClick"
    >
      <div
        ref="contentContainer"
        class="pb-1"
      >
        <RadioButton
          :id="id"
          class="w-full"
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
        <div
          v-if="revealText"
          ref="revealText"
          :class="[
            'hidden ml-8 text-sm text-gray-300 !font-normal cursor-pointer',
            {'!block !text-primary-500' : checked},
            {'!text-gray-100 cursor-not-allowed' : disabled}
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
    revealText: {
      type: String,
      default: ''
    },
    fullWidth: {
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
      const revealText = this.$refs.revealText;
      const contentContainer = this.$refs.contentContainer;
      if (revealText) {
        revealText.classList.add('!block');
        contentContainer.classList.add('!-mt-1.5');
      }
      this.largeHover = true;
    },
    async onContainerLeaveHover () {
      const revealText = this.$refs.revealText;
      const contentContainer = this.$refs.contentContainer;
      if (revealText && !this.checked) {
        revealText.classList.remove('!block');
        contentContainer.classList.remove('!-mt-1.5');
      }
      this.largeHover = false;
    }
  }
};
</script>
