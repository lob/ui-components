<template>
  <input
    :id="id"
    type="radio"
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
      'megabutton flex flex-col rounded-lg m-5 inline-block py-9 px-8 border-4 border-transparent relative'
    ]"
  >
    <div
      v-if="disabled && disabledBanner"
      class="absolute mt-0 text-center bg-turquoise-100 uppercase text-gray-700 font-bold p-1 inset-x-0 top-0"
    >
      {{ disabledBanner }}
    </div>

    <div>

      <div
        v-if="textWithImage"
        class="w-28"
      >
        <img
          :src="
            imageSource"
        >
      </div>

      <!-- TODO: Make height and width consistent across a group -->
      <div :class="['font-semibold', { 'text-lg w-36': withText }, { 'text-center text-xl': largeText }]">
        <slot>
          {{ label }}
        </slot>
      </div>
      <div
        v-if="withText"
        class="text-left"
      >
        <p>{{ text }}</p>
      </div>
    </div></label>
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
    text: {
      type: String,
      default: ''
    },
    disabledBanner: {
      type: String,
      default: null
    },
    imageSource: {
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
    textWithoutImage () {
      return !this.imageSource && this.label && this.text;
    },
    textWithImage () {
      return this.imageSource && this.label && this.text;
    },
    largeText () {
      return !this.imageSource && this.label && !this.text;
    },
    withText () {
      return this.label && this.text;
    },
    withDisabledBanner () {
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
primary-cobalt {
    color: #1876DB;
}

input[type='radio'] {
    @apply hidden;

    &:not(:disabled) ~ label {
        @apply cursor-pointer;
    }
}

/* TODO: Make strike line show only when there's no disabled banner */
input[type="radio"]:disabled + label {
    cursor: not-allowed;
    border: 1px solid rgba(196, 196, 196, 1);
    box-shadow: none;
    color: #8c8c8c;
    background: linear-gradient(to top right, #fff calc(50% - 1px), #C4C4C4, #fff calc(50% + 1px) );
}

input[type="radio"]:hover + label {
    box-shadow: 2px 4px 16px 1px rgba(0, 0, 0, 0.06), 0px 44.8255px 29.6538px rgba(0, 0, 0, 0.0425185), 0px 23.2748px 15.1286px rgba(0, 0, 0, 0.035), 0px 9.48231px 7.58585px rgba(0, 0, 0, 0.0274815), 0px 2.15507px 3.66362px rgba(0, 0, 0, 0.0168519)
}

/* TODO: get behavior right with focused and selected simultaneously */
input[type="radio"]:focus + label {
    border: 4px solid #7CC6DD;
}

input[type="radio"]:checked + label {
    box-sizing: border-box;
    border: 2px solid rgba(24, 118, 219, 1);

    box-shadow: 2px 4px 16px 1px rgba(0, 0, 0, 0.06), 0px 44.8255px 29.6538px rgba(0, 0, 0, 0.0425185), 0px 23.2748px 15.1286px rgba(0, 0, 0, 0.035), 0px 9.48231px 7.58585px rgba(0, 0, 0, 0.0274815), 0px 2.15507px 3.66362px rgba(0, 0, 0, 0.0168519)
}

label {
    box-shadow: 0px 4.32px 12.95px rgba(0, 0, 0, 0.08);
}
</style>
