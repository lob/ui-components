<template>
  <div
    ref="searchBar"
    class="relative rounded-lg focus-within:shadow focus-visible:outline-none"
    :class="`focus-visible:ring-${ringState} focus-within:ring-${ringState}`"
    tabindex="0"
    @focus="addRingOnFocus"
  >
    <text-input
      id="searchBar"
      ref="textInput"
      v-model="searchTerm"
      class="min-w-full"
      :label="t('search.textLabel')"
      :sr-only-label="true"
      :placeholder="placeholder"
      :disabled="disabled"
      :container-class="`focus-within:ring-${ringState}`"
      input-class="rounded-lg my-2 text-gray-700 font-light pl-4.5 placeholder-gray-500 focus-within:bg-white-300"
      @click="preventRingOnClick"
    >
      <template #iconLeft>
        <Search :class="['w-6 h-6 ml-2.5 mr-2.5 text-gray-700', { 'text-gray-100' : disabled }]" />
      </template>
      <template #iconRight>
        <button
          :class="[{ 'invisible' : !searchTerm }, {'block' : searchTerm}]"
          :aria-label="t('search.closeLabel')"
          data-testid="clearSearchButton"
          @click="clearSearch"
        >
          <Close class="w-3.5 h-3.5 mr-5 ml-3 text-gray-700" />
        </button>
      </template>
    </text-input>
    <div
      v-if="visible"
      class="bg-white rounded-lg shadow overflow-y-auto min-w-full absolute"
      role="results"
    >
      <div
        v-if="searchTerm && header"
        class="text-center py-4 rounded-lg border-white-300 text-gray-500 font-light"
      >
        <template v-if="searching">
          {{ t('search.loading') }}
        </template>
        <template v-else-if="searchResults.length">
          <LobLink
            :to="link"
            :underline="false"
            class="text-primary-500 underline font-light"
            @click="hide"
          >
            {{ t('search.resultsPrefix') }} {{ totalResults }} {{ t('search.resultsSuffix') }}
          </LobLink>
        </template>
        <template v-else>
          {{ t('search.noResults') }}
        </template>
      </div>
      <LobTable
        v-if="searchTerm && !searching && searchResults.length"
        class="min-w-full divide-y divide-gray-200"
        space="sm"
      >
        <TableBody>
          <TableRow
            v-for="result in searchResults"
            :key="result"
            class="text-gray-700  font-light hover:bg-white-300 border-l-4 border-l-transparent hover:border-l-primary-500 cursor-pointer active:bg-primary-500 active:text-white-300"
            @click="hide"
          >
            <slot :result="result" />
          </TableRow>
        </TableBody>
      </LobTable>
    </div>
  </div>
</template>

<script>
import TextInput from '../TextInput/TextInput';
import LobTable from '../Table/Table';
import TableBody from '../Table/TableBody';
import TableRow from '../Table/TableRow';
import LobLink from '../Link/Link.vue';
import Search from '../Icons/Search';
import Close from '../Icons/Close';

export default {
  name: 'SearchBar',
  components: { TextInput, LobTable, TableBody, TableRow, LobLink, Search, Close },
  props: {
    searchFunction: {
      type: Function,
      required: true
    },
    count: {
      type: Number,
      default: 0
    },
    link: {
      type: String,
      default: ''
    },
    header: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchTerm: '',
      searchResults: [],
      searching: false,
      timeout: null,
      visible: false,
      ringState: ''
    };
  },
  computed: {
    totalResults () {
      return this.count ? this.count : this.searchResults.length;
    }
  },
  watch: {
    searchTerm (val) {
      if (val) {
        this.visible = true;
        this.debounceSearch(val);
      }
    }
  },
  mounted () {
    window.addEventListener('click', this.onClickOutside);
  },
  unmounted () {
    window.removeEventListener('click', this.onClickOutside);
  },
  methods: {
    debounceSearch (searchTerm, delayMs)  {
      this.searching = true;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.search(searchTerm);
      }, delayMs || 500);
    },
    search (val) {
      this.searchResults = [];
      this.searchFunction(val).then((results) => {
        this.searchResults = results;
      }).finally(() => {
        this.searching = false;
      });
    },
    clearSearch () {
      this.searchTerm = '';
      this.searchResults = [];
    },
    onClickOutside ($event) {
      if (this.$refs.searchBar) {
        const clickOnTheContainer = this.$refs.searchBar === $event.target;
        const clickOnChild = this.$refs.searchBar && this.$refs.searchBar.contains($event.target);

        if (!clickOnTheContainer && !clickOnChild) {
          this.hide();
        }
      }
    },
    hide () {
      this.visible = false;
    },
    addRingOnFocus () {
      this.ringState = '4';
      this.$refs.textInput.focus();
    },
    preventRingOnClick () {
      this.ringState = 'none';
    }
  }
};
</script>
