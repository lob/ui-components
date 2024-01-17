<template>
  <input
    :id="name"
    type="checkbox"
    :checked="checked"
    :value="value"
    :name="name"
    :disabled="disabled"
    :required="required"
    @input="onInput"
    @click="onClick"
  />
</template>

<script>
export default {
  name: "BaseCheckbox",
  props: {
    modelValue: {
      type: [Array, Boolean],
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Boolean],
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "input", "click"],
  computed: {
    checked() {
      if (this.modelValue && typeof this.modelValue === "object") {
        return this.modelValue.includes(this.value);
      }
      return this.modelValue;
    },
  },
  methods: {
    onInput($event) {
      if (this.modelValue && typeof this.modelValue === "object") {
        const checked = [...this.modelValue];
        if (checked.includes(this.value)) {
          checked.splice(checked.indexOf(this.value), 1);
        } else {
          checked.push(this.value);
        }
        this.$emit("update:modelValue", checked);
        this.$emit("input", checked);
      } else {
        this.$emit("update:modelValue", $event.target.checked);
        this.$emit("input", $event.target.checked);
      }
    },
    onClick($event) {
      this.$emit("click", $event);
    },
  },
};
</script>
