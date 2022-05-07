<template>
  <div>
    <input
      :id="id"
      type="radio"
      class="hidden peer"
      :name="name"
      :value="value.toString()"
      :checked="checked"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      @input="onInput"
      @click="onClick"
    >
    <label
      :for="id"
      :class="[
        'h-full',
        'flex items-center rounded-lg m-5 inline-block border-4 border-transparent relative shadow-input cursor-pointer',
        'peer-focus:ring-primary-100 peer-focus:ring-4',
        'peer-hover:shadow',
        'peer-checked:border-2 peer-checked:border-primary-500',
        'peer-disabled:cursor-not-allowed peer-disabled:shadow-none peer-disabled:text-gray-100',
        'peer-disabled:border-2 peer-checked:border-disabled-gray',
        { 'strikethru-line': disabled && !disabledBanner }
      ]"
    >
      <div
        v-if="hasDisabledBanner"
        class="absolute mt-0  text-center bg-turquoise-100 uppercase text-gray-700 text-sm tracking-wide font-bold p-1 inset-x-0 top-0"
      >
        {{ disabledBanner }}
      </div>

      <div>
        <div :class="['mx-8', { 'mt-8 mb-9': !hasDisabledBanner }, {'mt-12 mb-6': hasDisabledBanner }]">
          <div class="font-semibold text-center text-3xl">
            <slot name="label">
              {{ label }}
            </slot>
          </div>
        </div>
      </div>
    </label>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue';

export default {
  name: 'RadioButton',
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
    disabledBanner: {
      type: String,
      default: null
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
    },
    hasDisabledBanner () {
      return this.disabled && this.disabledBanner;
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
    }
  }
};
</script>

<style scoped lang="scss">
.strikethru-line {
    background: linear-gradient(to top right, #fff calc(50% - 1px), #C4C4C4, #fff calc(50% + 1px) );
}

input[type="radio"]:disabled + label {
    border: 1px solid #c4c4c4;
    color: #8c8c8c;
    box-shadow: none;
}

label {
    box-shadow: 0px 4.32px 12.95px rgba(0, 0, 0, 0.08);
}
</style>
