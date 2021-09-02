<template>
  <label
    :for="id"
    v-bind="$attrs"
    class="text-center"
  >
    <span
      role="button"
      aria-controls="filename"
      tabindex="0"
      :class="[
        'button bg-white-200 border border-primary-500 text-primary-500 active:text-primary-700 active:border-primary-700 disabled:border-gray-100 rounded disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent cursor-pointer inline-block truncate',
        { 'px-6 py-3.5': defaultSize },
        { 'px-3 py-2': small },
        { 'px-6 py-4.5': large }
      ]"
      @keydown.enter="onKeydown"
      @keydown.space="onKeydown"
    >
      {{ fileSelected ? fileSelected : label }}
    </span>
  </label>
  <input
    v-bind="$attrs"
    :id="id"
    ref="fileInput"
    type="file"
    :accept="accept"
    readonly
    class="hidden"
    @change="onFilePicked"
  >
</template>

<script>
export default {
  name: 'FileUpload',
  props: {
    label: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    accept: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['default', 'small', 'large'].includes(value);
      }
    }
  },
  emits: ['fileUpload'],
  data () {
    return {
      fileSelected: ''
    };
  },
  computed: {
    defaultSize () {
      return this.size === 'default';
    },
    small () {
      return this.size === 'small';
    },
    large () {
      return this.size === 'large';
    }
  },
  methods: {
    onKeydown () {
      this.$refs.fileInput.click();
    },
    onFilePicked (event) {
      const file = event.target.files[0];
      if (file) {
        this.fileSelected = file.name;
        this.$emit('fileUpload', event);
      }
    },
    clear () {
      this.$refs.fileInput.value = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.button:hover:not(:disabled):not(:focus) {
  box-shadow: 0 0 10px rgba(65, 101, 129, 0.2);
}
</style>
