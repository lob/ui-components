<template>
    <div ref="searchBar" class="relative">
      <TextInput
        id="searchBar"
        v-model="searchTerm"
        class="min-w-full"
        :label="t('search.textLabel')"
        :sr-only-label="true"
      >
        <template #iconLeft>
          <MagnifyingGlass size="l" />
        </template>
        <template #iconRight>
          <button
            :class="[
              'block',
              searchTerm ? 'opacity-100 cursor-pointer' : 'opacity-0'
            ]"
            :aria-label="t('search.closeLabel')"
            :disabled="disabled"
            data-testid="clearSearchButton"
            @click="clearSearch"
          >
            <XmarkLarge />
          </button>
        </template>
      </TextInput>
      <div
        v-if="visible || searchTerm.value"
        class="bg-white shadow overflow-y-auto min-w-full absolute"
        role="results"
      >
        <!-- If search is still running do not perform any action and show a searching bar -->
        <template v-if="searching">
            {{ t('search.loading') }}
        </template>
        <!-- If search is done and seach has results, show the results -->
        <template v-else-if="!searching && searchResults.length">
            <div v-for="eachSearch in searchResults">
                <LobTable
                  class="min-w-full divide-y divide-gray-200"
                  space="sm"
                >
                    <TableHeader>
                        <slot name="header" :result="eachSearch" /> 
                    </TableHeader>
                    <TableBody>
                        <TableRow
                            v-for="result in eachSearch.results"
                            :key="result"
                            class="text-gray-500 hover:text-primary-700 cursor-pointer"
                            @click="hide"
                        >
                            <slot name="body" :result="result" />
                        </TableRow>
                    </TableBody>
                </LobTable>
            </div>
            <!-- If search has results and user wants to show a footer, the total number of results -->
            <div v-if="footer" class="flow-root">
                <div class="float-left">
                    {{ totalResults }} {{ t('search.matchingResults') }}
                </div>
                <div class="float-right">
                    <LobLink
                        :to="link"
                        :underline="false"
                        class="hover:text-primary-700"
                        @click="hide"
                    >
                        {{ t('search.seeAllResults') }}
                    </LobLink>
                </div>
            </div>
        </template>
        <!-- If no results are found show a no results message -->
        <template v-else>
            {{ t('search.noResults') }}
        </template>
      </div>
    </div>
  </template>
<script setup lang="ts">

import TextInput from '../TextInput/TextInput';
import LobTable from '../Table/Table';
import TableHeader from '../Table/TableHeader';
import TableBody from '../Table/TableBody';
import TableRow from '../Table/TableRow';
import LobLink from '../Link/Link.vue';
import MagnifyingGlass from '../Icons/MagnifyingGlass';
import XmarkLarge from '../Icons/XmarkLarge';
import { ref, watch, computed } from 'vue';

const searchTerm = ref('');
const searchResults = ref([]);
const searching = ref(false);
const visible = ref(false);
const timeout = ref(null);

const props = withDefaults(
  defineProps<{
    searchFunction: Function;
    count?: number;
    link?: string;
    footer?: boolean;
  }>(),
  {
    count: 0,
    link: '',
    footer: true
  }
);

const disabled = computed(() => !searchTerm);
const totalResults = computed(() => props.count);

watch(searchTerm, async (newSearchTerm) => {
  if (newSearchTerm) {
    visible.value = true;
    debounceSearch();
  }
});

function debounceSearch(searchTerm: string, delayMs: number = 500) {
    searching.value = true;
    clearTimeout(timeout);
    timeout.value = setTimeout(async () => {
        search(searchTerm);
    }, delayMs);
}

function testFunction() {
  return [
    {
      title: 'Test 1',
      icon: 'Creative',
      results: [
        'tess1',
        'test2'
      ]
    }
  ]
}

function search(searchTerm: string) {
    searchResults.value = ref([]);
    searchResults.value = testFunction(searchTerm);
    searching.value = false;
}

function clearSearch(){
    if(searchTerm.value){
        searchTerm.value = '';
        searchResults.value = [];
        visible.value = false;
    }
}

function hide(){
    visible.value = false;
}


</script>