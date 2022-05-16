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
      @input="onInput"
      @click="onClick"
    >
    <label
      :for="id"
      :class="[
        'h-full',
        'flex flex-column items-center rounded-lg m-5 inline-block border-2 border-transparent ring-4 ring-transparent relative shadow-input cursor-pointer',
        'peer-focus:ring-primary-100 peer-focus:ring-4',
        'peer-hover:shadow',
        'peer-checked:border-2 peer-checked:border-primary-500 peer-checked:shadow',
        'peer-disabled:cursor-not-allowed peer-disabled:shadow-none peer-disabled:text-gray-100',
        'peer-disabled:border-2 peer-checked:border-disabled-gray',
        { 'w-72': smallText }
      ]"
    >
      <div>
        <div
          v-if="disabled && !disabledBanner"
          data-testId="strikethru"
          class="strikethru-line absolute top-0 h-full w-full"
        />
        <div
          v-if="imageSource"
          data-testId="imageContainer"
          class="mx-16 mt-9 mb-8"
        >
          <div
            v-if="hasDisabledBanner"
            class="bottom-[60%] inset-x-0 absolute text-center bg-turquoise-100 uppercase text-gray-700 text-sm tracking-wide font-bold p-1"
            data-testId="imageDisabledBanner"
          >
            {{ disabledBanner }}
          </div>
          <img
            class="w-36 h-28"
            :src="imageSource"
          >
        </div>

        <div
          v-if="hasDisabledBanner && !imageSource"
          class="mt-0 top-0 inset-x-0 absolute text-center bg-turquoise-100 uppercase text-gray-700 text-sm tracking-wide font-bold p-1 rounded-t-lg"
          data-testId="disabledBanner"
        >
          {{ disabledBanner }}
        </div>

        <div>
          <div :class="['mx-8', { 'mt-8 mb-9': !hasDisabledBanner }, { 'mt-12 mb-6': hasDisabledBanner && !imageSource }, { 'mt-12 mb-6': hasDisabledBanner }]">
            <div :class="['font-semibold', { 'text-lg text-left': smallText }, { 'text-center text-[2.25rem]': megaText }]">
              <slot name="label">
                {{ label }}
              </slot>
            </div>
            <div
              v-if="smallText"
              class="text-left"
            >
              <slot name="text">
                <p>{{ text }}</p>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  name: 'MegaButton',
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
    text: {
      type: String,
      default: ''
    },
    disabledBanner: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    imageSource: {
      type: String,
      default: null
    }
  },
  emits: ['update:modelValue', 'input', 'click'],
  computed: {
    checked () {
      return this.modelValue === this.value;
    },
    hasDisabledBanner () {
      return this.disabled && this.disabledBanner;
    },
    megaText () {
      return this.labelContent && !this.textContent;
    },
    smallText () {
      return this.labelContent && this.textContent;
    },
    labelContent () {
      return this.$slots.label || this.label;
    },
    textContent () {
      return this.$slots.text || this.text;
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
  background: linear-gradient(to top right, rgba(255, 255, 255, 0) calc(50% - 1px), #c4c4c4, rgba(255, 255, 255, 0) calc(50% + 1px));
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
