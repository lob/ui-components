<template>
  <text-input v-model="searchValue" class="w-full">
    <template v-slot:iconLeft>
      <search class="w-6 h-6" />
    </template>
  </text-input>
  <div class="bg-primary-500">
    <table class="table-auto">
    <tbody>
      <tr><td colspan="5" class="text-center">View all 3566 results...</td></tr>
      <tr v-for="result in searchResults">
        <td>{{result.img}}</td>
        <td>{{result.description}}</td>
        <td>{{result.user}}</td>
        <td>{{result.date}}</td>
        <td>{{result.type}}</td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
// SEARCH RESULTS DROPDOWN
import textInput from '../TextInput/TextInput';
import search from '../Icons/Search';
export default {
  name: 'SearchBar',
  components: { textInput, search },
  props: {
  },
  watch: {
    searchValue(val) {
      // API call
      // log results
      if (val) {
        this.searchResults.push({
          img: 'image',
          description: 'description',
          user: this.number++,
          date: new Date(),
          type: 'Postcard'
        })
      } else {
        this.searchResults = []
      }
    },
  },
  data() {
    return {
      number: 1,
      searchValue: '',
      searchResults: []
    }
  },
  emits: [],
  computed: {
    
  },
  methods: {
    
  }
};
</script>

<style scoped lang="scss">

</style>

