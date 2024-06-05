<template>
  <div v-if="$slots.toolbar" class="uic-datatable-toolbar">
    <slot name="toolbar" />
  </div>
  <DataTable
    :class="[`uic-datatable`, { 'uic-clickable': onRowClick }]"
    data-testid="uic-datatable"
    :lazy="async"
    :loading
    :paginator="!list"
    paginator-template="PrevPageLink NextPageLink"
    :pt="{ wrapper: { class: 'uic-datatable-wrapper' } }"
    :rows
    :scrollable
    :total-records="total"
    :value="data"
    v-bind="$attrs"
    @row-click="
      $emit('rowClick', {
        event: $event.originalEvent,
        data: $event.data,
        index: $event.index
      })
    "
    @page="
      !list
        ? $emit('paginate', {
            first: $event.first,
            page: $event.page,
            rows: $event.rows
          })
        : undefined
    "
  >
    <template #empty>
      <template v-if="!loading">
        <Alert v-if="error" variant="error">{{ error }}</Alert>
        <Alert v-else-if="!$slots['empty']" variant="info">No results</Alert>
        <slot v-else name="empty" />
      </template>
    </template>

    <template #loading>
      <LoadingSpinnerIcon :size="24" />
    </template>

    <slot />

    <Column v-if="onRowClick" class="w-14 text-center">
      <template #body>
        <Icon :icon="IconName.DETAILS" size="xl" class="mx-auto" />
      </template>
    </Column>

    <template #paginatorstart>
      <PaginationTotal :loading :total="total ?? data?.length" />
    </template>

    <template #paginatorprevpagelinkicon>
      <Icon :icon="IconName.PREVIOUS" />
    </template>

    <template #paginatornextpagelinkicon>
      <Icon :icon="IconName.NEXT" />
    </template>
  </DataTable>

  <!-- This is custom pagination for next/ previous endpoints. -->
  <Pagination
    v-if="list"
    :loading
    :next
    :previous
    :total="total || data?.length"
    :previous-button-props="{ 'data-testid': 'uic-datatable-list-previous' }"
    :next-button-props="{ 'data-testid': 'uic-datatable-list-next' }"
    @next="$emit('next')"
    @previous="$emit('previous')"
  />
</template>

<script
  setup
  lang="ts"
  generic="Data extends Record<string | number | symbol, any>"
>
import Alert from '@/components/Alert/Alert.vue';
import { Pagination, PaginationTotal } from '@/components/Pagination';
import Column from 'primevue/column';
import DataTable, {
  DataTablePageEvent,
  DataTableRowClickEvent
} from 'primevue/datatable';
import { DataTableRowSize } from './constants';
import { Icon, IconName } from '@/components/Icon';
import { LoadingSpinnerIcon } from '@/components/LoadingSpinnerIcon';

defineOptions({ inheritAttrs: false });

withDefaults(
  defineProps<{
    /** The table will not change the data, you pass in the most accurate data. */
    async?: boolean;
    data?: Data[];
    dataKey: keyof Data;
    error?: string;
    /** This is mainly for support `next_url`/ `previous_url` requests, if you can use the true pagination, opt for that. */
    list?: boolean;
    loading?: boolean;
    next?: string;
    onRowClick?: (e: DataTableRowClickEvent) => void; // eslint-disable-line no-unused-vars
    previous?: string;
    rows?: DataTableRowSize;
    scrollable?: boolean;
    /** The total number of records, overrides the length of `data`. Generally used with `async`. */
    total?: number;
  }>(),
  {
    async: false,
    data: undefined,
    error: undefined,
    list: false,
    loading: false,
    next: undefined,
    onRowClick: undefined,
    previous: undefined,
    rows: DataTableRowSize.TEN,
    scrollable: true,
    total: undefined
  }
);

defineEmits<{
  /** These will only fire when using the `list` prop. */
  (e: 'next'): void; // eslint-disable-line no-unused-vars
  (
    e: 'paginate', // eslint-disable-line no-unused-vars
    event: Pick<DataTablePageEvent, 'first' | 'page' | 'rows'> // eslint-disable-line no-unused-vars
  ): void;
  /** These will only fire when using the `list` prop. */
  (e: 'previous'): void; // eslint-disable-line no-unused-vars
  (
    e: 'rowClick', // eslint-disable-line no-unused-vars
    // eslint-disable-next-line no-unused-vars
    event: {
      event: DataTableRowClickEvent['originalEvent']; // eslint-disable-line no-unused-vars
      data: Data; // eslint-disable-line no-unused-vars
      index: DataTableRowClickEvent['index']; // eslint-disable-line no-unused-vars
    }
  ): void;
}>();

defineSlots<{
  default(): any;
  toolbar(): any;
  empty(): any;
}>();
</script>

<style scoped lang="scss">
.uic-datatable {
  @apply relative;

  &.uic-clickable {
    :deep(.uic-datatable-wrapper) {
      tbody tr:not([data-pc-section='emptymessage']) {
        @apply cursor-pointer;
        @apply transition-colors;

        &:hover {
          @apply bg-gray-25;
        }
      }
    }
  }

  :deep(.uic-datatable-wrapper) {
    @apply border-gray-100;
    @apply border rounded-lg;

    // Scroll shadows.
    background-image: linear-gradient(to right, white, white),
      linear-gradient(to right, white, white),
      linear-gradient(to right, rgba(0, 0, 0, 0.125), rgba(255, 255, 255, 0)),
      linear-gradient(to left, rgba(0, 0, 0, 0.125), rgba(255, 255, 255, 0));

    background-position:
      left center,
      right center,
      left center,
      right center;
    background-repeat: no-repeat;
    background-color: white;
    background-size:
      30px 100%,
      30px 100%,
      15px 100%,
      15px 100%;

    background-attachment: local, local, scroll, scroll;

    table {
      table-layout: fixed;
      border-collapse: separate;
      border-spacing: 0;
      width: 100%;
    }

    // Row borders.
    thead tr th,
    tbody tr:not(:last-of-type) td {
      @apply border-b border-gray-100;
    }
    tfoot tr td {
      @apply border-t border-gray-100;
    }

    thead tr,
    tfoot tr {
      @apply type-small-600 text-gray-800 text-left;
    }
    th [data-pc-section='headercontent'] {
      @apply inline-flex flex-row gap-2 items-center;
    }
    th,
    tfoot td {
      @apply px-6 py-3;
    }

    tbody tr {
      @apply type-small-400 text-black;
    }

    // Body rows have additional padding
    tbody td {
      @apply px-6 py-4;
    }
  }

  :deep([data-pc-section='loadingoverlay']) {
    @apply bg-white;
    @apply border border-gray-100;
    @apply rounded-xl;
    @apply shadow-xl;
    @apply p-2;
    @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
    @apply z-10;
  }

  :deep([data-pc-section='paginatorwrapper']) {
    [data-pc-name='paginator'] {
      @apply flex items-center;
      @apply py-2;
    }

    [data-pc-section='start'] {
      @apply mr-auto;
    }

    .uic-datatable-total {
      @apply inline;
      @apply type-small-600 text-gray-800;
    }

    [data-pc-section='previouspagebutton'] {
      @apply mr-1;
    }
    [data-pc-section='previouspagebutton'],
    [data-pc-section='nextpagebutton'] {
      @apply p-2;
      @apply bg-white;
      @apply border;
      @apply border-gray-100;
      @apply text-gray-800;
      @apply rounded-lg;

      &:hover {
        @apply bg-gray-50;
        @apply border-gray-200;
      }

      &:active,
      &:focus {
        @apply bg-gray-100;
        @apply border-gray-200;
      }

      &:disabled {
        @apply cursor-not-allowed;
        @apply bg-white;
        @apply border-gray-200;
        @apply text-gray-400;
      }
    }
  }
}

.uic-list-pagination {
  @apply flex items-center;
  @apply py-2;
}
.uic-datatable-toolbar {
  @apply pb-6;
}
</style>
