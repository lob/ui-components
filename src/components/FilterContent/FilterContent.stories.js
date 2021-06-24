import FilterContent from './FilterContent.vue';
import { LobButton, Checkbox, RadioGroup, RadioButton } from '@/components';
import mdx from './FilterContent.mdx';

export default {
  title: 'Components/FilterContent',
  component: FilterContent,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const open = false;
const selectedFilters = [];

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {  FilterContent, LobButton, Checkbox },
  data: () => ({ open, selectedFilters }),
  setup: () => ({ args }),
  template: `
    <div class="relative">
      <LobButton @click.stop="open = !open" size="small">Filter by</LobButton>
      <filter-content v-model:open="open">
        <checkbox
          label="Postcards"
          v-model="selectedFilters"
          name="postcards"
          value="postcards"
          class="mb-2"
        />
        <checkbox
          label="Letters"
          v-model="selectedFilters"
          name="letters"
          value="letters"
          class="mb-2"
        />
        <checkbox
          label="Checks"
          v-model="selectedFilters"
          name="checks"
          value="checks"
          class="mb-2"
        />
        <checkbox
          label="Self Mailer"
          v-model="selectedFilters"
          name="selfMailer"
          value="selfMailer"
          class="mb-2"
        />
        <div class="mt-4 flex">
          <LobButton variant="secondary" size="small" @click="selectedFilters = []">Reset</LobButton>
          <LobButton size="small" class="ml-2" @click="open = false">Apply</LobButton>
        </div>
      </filter-content>
    </div>
  `
});

export const Primary = Template.bind({});

const selectedFilter = '';

const WithHeaderTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {  FilterContent, LobButton, RadioGroup, RadioButton },
  data: () => ({ open, selectedFilter }),
  setup: () => ({ args }),
  template: `
    <div class="relative">
      <LobButton @click.stop="open = !open" size="small">Filter by</LobButton>
      <filter-content v-model:open="open">
        <template v-slot:header>
          <div>
            Filter By
          </div>
        </template>
        <radio-group legend="Mail Type" sr-only-legend>
          <radio-button 
            name="mail-type" 
            value="usps-first-class" 
            label="USPS First Class" 
            v-model="selectedFilter" 
            class="mb-2" 
          />
          <radio-button 
            name="mail-type" 
            value="usps-standard" 
            label="USPS Standard" 
            v-model="selectedFilter" 
            class="mb-2" 
          />
        </radio-group>
        <div class="mt-4 flex">
          <LobButton variant="secondary" size="small" @click="selectedFilter = ''">Reset</LobButton>
          <LobButton size="small" class="ml-2" @click="open = false">Apply</LobButton>
        </div>
      </filter-content>
    </div>
  `
});

export const WithHeader = WithHeaderTemplate.bind({});

