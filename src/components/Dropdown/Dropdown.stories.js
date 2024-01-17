import Dropdown from "./Dropdown.vue";
import mdx from "./Dropdown.mdx";

import LobLabel from "@/components/Label/Label.vue";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  decorators: [
    () => ({
      template: '<div style="width: 250px; margin: auto;"> <story /></div>',
    }),
  ],
  parameters: {
    docs: {
      page: mdx,
    },
    layout: "padded",
  },
};
const vModel = "Squirtle";

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Dropdown },
  data: () => ({ vModel }),
  setup: () => ({ args }),
  template: '<dropdown v-bind="args" v-model="vModel"></dropdown>',
});

export const WithObjectOptions = Template.bind({});
WithObjectOptions.args = {
  id: "state",
  label: "State",
  placeholder: "Pick a state",
  options: [
    { label: "Alabama", value: "AL" },
    { label: "Alaska", value: "AK", disabled: true },
    { label: "Arizona", value: "AZ" },
    { label: "Arkansas", value: "AR" },
    { label: "California", value: "CA" },
    { label: "Colorado", value: "CO" },
    { label: "Connecticut", value: "CT" },
    { label: "Delaware", value: "DE" },
    { label: "District of Columbia", value: "DC" },
    { label: "Florida", value: "FL" },
    { label: "Georgia", value: "GA" },
    { label: "Hawaii", value: "HI", disabled: true },
    { label: "Idaho", value: "ID" },
    { label: "Illinois", value: "IL" },
    { label: "Indiana", value: "IN" },
    { label: "Iowa", value: "IA" },
    { label: "Kansas", value: "KS" },
    { label: "Kentucky", value: "KY" },
    { label: "Louisiana", value: "LA" },
    { label: "Maine", value: "ME" },
    { label: "Maryland", value: "MD" },
    { label: "Massachusetts", value: "MA" },
    { label: "Michigan", value: "MI" },
    { label: "Minnesota", value: "MN" },
    { label: "Mississippi", value: "MS" },
    { label: "Missouri", value: "MO" },
    { label: "Montana", value: "MT" },
    { label: "Nebraska", value: "NE" },
    { label: "Nevada", value: "NV" },
    { label: "New Hampshire", value: "NH" },
    { label: "New Jersey", value: "NJ" },
    { label: "New Mexico", value: "NM" },
    { label: "New York", value: "NY" },
    { label: "North Carolina", value: "NC" },
    { label: "North Dakota", value: "ND" },
    { label: "Ohio", value: "OH" },
    { label: "Oklahoma", value: "OK" },
    { label: "Oregon", value: "OR" },
    { label: "Pennsylvania", value: "PA" },
    { label: "Rhode Island", value: "RI" },
    { label: "South Carolina", value: "SC" },
    { label: "South Dakota", value: "SD" },
    { label: "Tennessee", value: "TN" },
    { label: "Texas", value: "TX" },
    { label: "Utah", value: "UT" },
    { label: "Vermont", value: "VT" },
    { label: "Virginia", value: "VA" },
    { label: "Washington", value: "WA" },
    { label: "West Virginia", value: "WV" },
    { label: "Wisconsin", value: "WI" },
    { label: "Wyoming", value: "WY" },
    { label: "American Samoa", value: "AS" },
    { label: "Guam", value: "GU" },
    { label: "Northern Mariana Islands", value: "MP" },
    { label: "Puerto Rico", value: "PR" },
    { label: "Virgin Islands", value: "VI" },
  ],
};

export const WithStringOptions = Template.bind({});
WithStringOptions.args = {
  id: "fav-pet",
  label: "Favorite pet",
  placeholder: "Choose a pet",
  options: ["Dog", "Cat", "Bunny", "Parrot", "Goldfish", "Iguana", "Other"],
};

export const WithOptGroups = Template.bind({});
WithOptGroups.args = {
  id: "dinosaur",
  label: "Pick a dinosaur",
  options: [
    {
      label: "Theropods",
      options: ["Tyrannosaurus", "Velociraptor", "Deinonychus"],
    },
    {
      label: "Sauropods",
      options: ["Diplodocus", "Saltasaurus", "Apatosaurus"],
    },
    "Brontosaurus",
  ],
};

const holidayVModel = "Beach";

const WithTooltipTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Dropdown, LobLabel },
  data: () => ({ holidayVModel }),
  setup: () => ({ args }),
  template: `
    <LobLabel
      label="Best holiday destination"
      labelFor="holiday-destination"
      tooltipContent="Where would you go?"
   />
    <Dropdown v-bind="args" v-model="holidayVModel" />
  `,
});

export const WithTooltip = WithTooltipTemplate.bind({});
WithTooltip.args = {
  id: "holiday-destination",
  label: "Best holiday destination",
  srOnlyLabel: true,
  options: ["Beach", "Mountains", "Old town", "Metropolis", "Jungle"],
};

const WithConfirmChangeModalTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Dropdown },
  data: () => ({ vModel }),
  setup: () => ({ args }),
  template:
    '<dropdown v-bind="args" v-model="vModel" confirm-change-modal></dropdown>',
});

export const WithConfirmChangeModal = WithConfirmChangeModalTemplate.bind({});
WithConfirmChangeModal.args = {
  id: "fav-pet",
  label: "Favorite pet",
  placeholder: "Choose a pet",
  options: ["Dog", "Cat", "Bunny", "Parrot", "Goldfish", "Iguana", "Other"],
};
