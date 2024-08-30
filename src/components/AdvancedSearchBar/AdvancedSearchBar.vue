<template>
  <div ref="searchBar" class="relative">
    <TextInput
      id="searchBar"
      v-model="searchTerm"
      class="min-w-full"
      data-testid="searchBar"
      :label="t('search.textLabel')"
      :sr-only-label="true"
      @focus="visible = true"
    >
      <template #iconLeft>
        <Icon icon="MagnifyingGlass" />
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
          <Icon icon="Close" />
        </button>
      </template>
    </TextInput>
    <div
      v-if="visible || searchTerm.value"
      class="bg-white shadow overflow-y-auto min-w-full absolute"
      role="results"
    >
      <!-- If search is still running do not perform any action and show a searching bar -->
      <template v-if="searchTerm && searching">
        {{ t('search.loading') }}
      </template>
      <!-- If search is done and seach has results, show the results -->
      <template v-else-if="!searching && searchResults">
        <div class="search-body m-2 border-b">
          <div v-for="itemGroup in searchResults" :key="itemGroup">
            <LobTable v-if="itemGroup" class="min-w-full mb-4" space="sm">
              <TableHeader>
                <slot name="header" :result="itemGroup" />
              </TableHeader>
              <TableBody>
                <TableRow
                  v-for="item in itemGroup?.items"
                  :key="item"
                  class="text-gray-500 hover:text-primary-700 cursor-pointer"
                  @click="hide"
                >
                  <slot name="body" :result="item" />
                </TableRow>
              </TableBody>
            </LobTable>
          </div>
        </div>
        <!-- If search has results and user wants to show a footer, the total number of results -->
        <div
          v-if="searchTerm && footer"
          class="search-footer m-2 flow-root text-sm text-gray-700"
        >
          <div class="float-left">
            {{ totalResults }} {{ t('search.matchingResults') }}
          </div>
          <div class="float-right flex">
            <LobLink
              :to="link"
              :underline="false"
              class="text-sm hover:text-primary-900"
              @click="hide"
            >
              {{ t('search.seeAllResults') }}
              <Icon class="inline" :icon="IconName.NEXT" />
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
import TextInput from '../TextInput/TextInput.vue';
import LobTable from '../Table/Table.vue';
import TableHeader from '../Table/TableHeader.vue';
import TableBody from '../Table/TableBody.vue';
import TableRow from '../Table/TableRow.vue';
import LobLink from '../Link/Link.vue';
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
import { Icon, IconName } from '../Icon';

const searchTerm = ref('');
const searchResults = ref([]);
const searching = ref(false);
const visible = ref(false);
const timeout = ref<number | null>(null);
const searchBar = ref<null | HTMLDivElement>(null);

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

const disabled = computed(() => !searchTerm.value);
const totalResults = computed(() => props.count);

async function search(searchTerm: string) {
  searchResults.value = [];
  searching.value = true;
  searchResults.value = await props.searchFunction(searchTerm);
  searching.value = false;
}

function debounceSearch(searchTerm: string, delayMs: number = 0) {
  if (timeout.value !== null) {
    clearTimeout(timeout.value);
  }
  timeout.value = setTimeout(async () => {
    search(searchTerm);
  }, delayMs) as unknown as number;
}

watch(searchTerm, (newSearchTerm) => {
  if (newSearchTerm && newSearchTerm !== '') {
    visible.value = true;
    debounceSearch(newSearchTerm);
  }
});

function clearSearch() {
  if (searchTerm.value) {
    searchTerm.value = '';
    searchResults.value = [];
    visible.value = false;
  }
}

function hide() {
  visible.value = false;
}

function onClickOutside($event: MouseEvent) {
  if (searchBar.value) {
    const clickOnTheContainer = searchBar.value === $event.target;
    const clickOnChild =
      searchBar.value && searchBar.value.contains($event.target as Node);

    if (!clickOnTheContainer && !clickOnChild) {
      hide();
    }
  }
}

onMounted(() => {
  window.addEventListener('click', onClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('click', onClickOutside);
});
</script>
