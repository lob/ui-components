<template>
  <text-input v-model="searchTerm" class="w-max bg-white-300 h-12" id="searchBar" :grey=true>
    <template v-slot:iconLeft>
      <search class="w-4 h-6" />
    </template>
    <template v-slot:iconRight>
      <button :disabled="!searchTerm" @click="eraseSearchTerm">
        <close class="w-4 h-6"/>
      </button>
    </template>
  </text-input>
  <div class="bg-white shadow overflow-y-auto max-h-1/4">
    <table class="table-auto">
      <tbody v-if="searchTerm !== ''">
        <tr class="border-b border-white-300 rounded-t-lg"><td colspan=5 class="text-center py-4">View all {{ searchResults.length }} results...</td></tr>
        <tr v-for="(result, index) in searchResults" :key="index">
          <td class="max-w-md px-4 py-2 text-gray-500" v-for="(key, index) in Object.keys(result)" :key="index">
            <img :src="result[key]"  v-if="key === 'img'" class="w-5 h-5">
            <p v-else>{{result[key]}}</p>
          </td>
          <td>
            <button @click="tempFunction">
              <chevron-right class="pt-2 pl-2 w-6 h-6"/>
            </button>
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
import ChevronRight from '../Icons/ChevronRight.vue';
export default {
  name: 'SearchBar',
  components: { textInput, search, close, ChevronRight },
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
    tempFunction() {

    },
  }
};
</script>

<style scoped lang="scss">

</style>

