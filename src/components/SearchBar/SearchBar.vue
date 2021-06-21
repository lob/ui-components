<template>
  <text-input v-model="modelValue" class="w-max">
    <template v-slot:iconLeft>
      <search class="w-6 h-6" />
    </template>
    <template v-slot:iconRight>
      <close class="w-6 h-6"/>
    </template>
  </text-input>
  <div class="bg-primary-500">
    <table class="table-auto">
    <tbody>
      <tr><td colspan="5" class="text-center">View all {{ searchResults.length }} results...</td></tr>
      <tr v-for="result in searchResults">
        <td v-for="key in Object.keys(result)">{{key}} {{result[key]}}</td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
import textInput from '../TextInput/TextInput';
import search from '../Icons/Search';
import close from '../Icons/Close';
export default {
  name: 'SearchBar',
  components: { textInput, search, close },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    searchResults: {
      type: Object,
      default: () => ([])
    }
  },
  data() {
  },
  emits: ['update:modelValue', 'input', 'change'],
  computed: {
    
  },
  methods: {
    
  }
};
</script>

<style scoped lang="scss">

</style>

