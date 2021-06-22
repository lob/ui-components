<template>
  <text-input v-model="searchTerm" class="w-max bg-white-300">
    <template v-slot:iconLeft>
      <search class="w-6 h-6 bg-white-300" />
    </template>
    <template v-slot:iconRight>
      <button v-if="searchTerm !== ''" @click="eraseSearchTerm">
        <close class="w-6 h-6"/>
      </button>
    </template>
  </text-input>
  <div class="bg-white shadow">
    <table class="table-auto">
      <tbody>
        <tr class="border-b border-white-300"><td colspan=5 class="text-center py-4">View all {{ searchResults.length }} results...</td></tr>
        <tr v-for="result in searchResults">
          <td class="max-w-md px-4 py-2" v-for="key in Object.keys(result)">
            {{result[key]}}
          </td>
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
    searchFunction: {
      type: Function,
      required : true,
    },
  },
  data() {
    return {
      searchTerm : '',
      searchResults : [],
    }

  },
  watch: {
    searchTerm(val) {
      this.searchFunction(val).then(results=>{
        this.searchResults = results
      })
      .catch(e=>{
        console.error("error searching for results", e)
      })
    },
  },
  methods: {
    eraseSearchTerm() {
      this.searchTerm = '';
    },
  }
};
</script>

<style scoped lang="scss">

</style>

