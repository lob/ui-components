<template>
  <div>
    <input
      :id="id"
      type="radio"
      class="absolute top-1/2 left-1/2 opacity-0 peer"
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
          <div :class="['font-semibold', {'text-center text-3xl': megaText}]">
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
    text: {
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
  computed: {
    checked () {
      return this.modelValue === this.value;
    },
    hasDisabledBanner () {
      return this.disabled && this.disabledBanner;
    }
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
  background: linear-gradient(to top right, #fff calc(50% - 1px), #c4c4c4, #fff calc(50% + 1px));
}

label {
  box-shadow: 0 4.32px 12.95px rgba(0, 0, 0, 0.08);
}

input[type="radio"]:disabled + label {
  border: 1px solid #c4c4c4;
  color: #8c8c8c;
  box-shadow: none;
}

</style>
