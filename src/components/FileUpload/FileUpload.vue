<template>
  <label :for="id">
    <span
      role="button"
      aria-controls="filename"
      tabindex="0"
      class="button py-3 px-6 bg-white-200 border border-primary-500 text-primary-500 active:text-primary-700 active:border-primary-700 disabled:border-gray-100 rounded disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent cursor-pointer"
      @keydown.enter="onKeydown"
      @keydown.space="onKeydown"
    >
      {{ fileSelected ? fileSelected : label }}
    </span>
  </label>
  <input
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
    }
  },
  emits: ['fileUpload'],
  data () {
    return {
      fileSelected: ''
    };
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
    }
  }
};
</script>

<style lang="scss" scoped>
.button:hover:not(:disabled):not(:focus) {
  box-shadow: 0 0 10px rgba(65, 101, 129, 0.2);
}
</style>
