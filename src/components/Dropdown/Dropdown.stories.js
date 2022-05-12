import Dropdown from './Dropdown.vue';
import mdx from './Dropdown.mdx';

import LobLabel from '@/components/LobLabel/LobLabel.vue';
import Tooltip from '@/components/Tooltip/Tooltip.vue';
import { Eye } from '@/components/Icons';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  decorators: [
    () => ({ template: '<div class="w-48"><story /></div>' })
  ],
  parameters: {
    docs: {
      page: mdx
    },
    layout: 'padded'
  },
  argTypes: {
    size: {
      options: ['small', 'default'],
      control: {
        type: 'select'
      }
    }
  }
};
const vModel = 'Squirtle';

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {  Dropdown },
  data: () => ({ vModel }),
  setup: () => ({ args }),
  template: '<dropdown v-bind="args" v-model="vModel"></dropdown>'
});

export const WithObjectOptions = Template.bind({});
WithObjectOptions.args = {
  id: 'state',
  label: 'State',
  placeholder: 'Pick a state',
  options: [
    { label: 'Alabama', value: 'AL' },
    { label: 'Alaska', value: 'AK', disabled: true },
    { label: 'Arizona', value: 'AZ' },
    { label: 'Arkansas', value: 'AR' },
    { label: 'California', value: 'CA' },
    { label: 'Colorado', value: 'CO' },
    { label: 'Connecticut', value: 'CT' },
    { label: 'Delaware', value: 'DE' },
    { label: 'District of Columbia', value: 'DC' },
    { label: 'Florida', value: 'FL' },
    { label: 'Georgia', value: 'GA' },
    { label: 'Hawaii', value: 'HI', disabled: true },
    { label: 'Idaho', value: 'ID' },
    { label: 'Illinois', value: 'IL' },
    { label: 'Indiana', value: 'IN' },
    { label: 'Iowa', value: 'IA' },
    { label: 'Kansas', value: 'KS' },
    { label: 'Kentucky', value: 'KY' },
    { label: 'Louisiana', value: 'LA' },
    { label: 'Maine', value: 'ME' },
    { label: 'Maryland', value: 'MD' },
    { label: 'Massachusetts', value: 'MA' },
    { label: 'Michigan', value: 'MI' },
    { label: 'Minnesota', value: 'MN' },
    { label: 'Mississippi', value: 'MS' },
    { label: 'Missouri', value: 'MO' },
    { label: 'Montana', value: 'MT' },
    { label: 'Nebraska', value: 'NE' },
    { label: 'Nevada', value: 'NV' },
    { label: 'New Hampshire', value: 'NH' },
    { label: 'New Jersey', value: 'NJ' },
    { label: 'New Mexico', value: 'NM' },
    { label: 'New York', value: 'NY' },
    { label: 'North Carolina', value: 'NC' },
    { label: 'North Dakota', value: 'ND' },
    { label: 'Ohio', value: 'OH' },
    { label: 'Oklahoma', value: 'OK' },
    { label: 'Oregon', value: 'OR' },
    { label: 'Pennsylvania', value: 'PA' },
    { label: 'Rhode Island', value: 'RI' },
    { label: 'South Carolina', value: 'SC' },
    { label: 'South Dakota', value: 'SD' },
    { label: 'Tennessee', value: 'TN' },
    { label: 'Texas', value: 'TX' },
    { label: 'Utah', value: 'UT' },
    { label: 'Vermont', value: 'VT' },
    { label: 'Virginia', value: 'VA' },
    { label: 'Washington', value: 'WA' },
    { label: 'West Virginia', value: 'WV' },
    { label: 'Wisconsin', value: 'WI' },
    { label: 'Wyoming', value: 'WY' },
    { label: 'American Samoa', value: 'AS' },
    { label: 'Guam', value: 'GU' },
    { label: 'Northern Mariana Islands', value: 'MP' },
    { label: 'Puerto Rico', value: 'PR' },
    { label: 'Virgin Islands', value: 'VI' }
  ]
};

export const WithStringOptions = Template.bind({});
WithStringOptions.args = {
  id: 'pokemon',
  label: 'Choose a Pokemon',
  options: [
    'Bulbasaur',
    'Ivysaur',
    'Venusaur',
    'Charmander',
    'Charmeleon',
    'Charizard',
    'Squirtle',
    'Wartortle',
    'Blastoise',
    'Caterpie',
    'Metapod',
    'Butterfree',
    'Weedle',
    'Kakuna',
    'Beedrill',
    'Pidgey',
    'Pidgeotto',
    'Pidgeot',
    'Rattata',
    'Raticate',
    'Spearow',
    'Fearow',
    'Ekans',
    'Arbok',
    'Pikachu',
    'Raichu',
    'Sandshrew',
    'Sandslash',
    'Nidoran♀',
    'Nidorina',
    'Nidoqueen',
    'Nidoran♂',
    'Nidorino',
    'Nidoking',
    'Clefairy',
    'Clefable',
    'Vulpix',
    'Ninetales',
    'Jigglypuff',
    'Wigglytuff',
    'Zubat',
    'Golbat',
    'Oddish',
    'Gloom',
    'Vileplume',
    'Paras',
    'Parasect',
    'Venonat',
    'Venomoth',
    'Diglett',
    'Dugtrio',
    'Meowth',
    'Persian',
    'Psyduck',
    'Golduck',
    'Mankey',
    'Primeape',
    'Growlithe',
    'Arcanine',
    'Poliwag',
    'Poliwhirl',
    'Poliwrath',
    'Abra',
    'Kadabra',
    'Alakazam',
    'Machop',
    'Machoke',
    'Machamp',
    'Bellsprout',
    'Weepinbell',
    'Victreebel',
    'Tentacool',
    'Tentacruel',
    'Geodude',
    'Graveler',
    'Golem',
    'Ponyta',
    'Rapidash',
    'Slowpoke',
    'Slowbro',
    'Magnemite',
    'Magneton',
    'Farfetch’d',
    'Doduo',
    'Dodrio',
    'Seel',
    'Dewgong',
    'Grimer',
    'Muk',
    'Shellder',
    'Cloyster',
    'Gastly',
    'Haunter',
    'Gengar',
    'Onix',
    'Drowzee',
    'Hypno',
    'Krabby',
    'Kingler',
    'Voltorb',
    'Electrode',
    'Exeggcute',
    'Exeggutor',
    'Cubone',
    'Marowak',
    'Hitmonlee',
    'Hitmonchan',
    'Lickitung',
    'Koffing',
    'Weezing',
    'Rhyhorn',
    'Rhydon',
    'Chansey',
    'Tangela',
    'Kangaskhan',
    'Horsea',
    'Seadra',
    'Goldeen',
    'Seaking',
    'Staryu',
    'Starmie',
    'Mr. Mime',
    'Scyther',
    'Jynx',
    'Electabuzz',
    'Magmar',
    'Pinsir',
    'Tauros',
    'Magikarp',
    'Gyarados',
    'Lapras',
    'Ditto',
    'Eevee',
    'Vaporeon',
    'Jolteon',
    'Flareon',
    'Porygon',
    'Omanyte',
    'Omastar',
    'Kabuto',
    'Kabutops',
    'Aerodactyl',
    'Snorlax',
    'Articuno',
    'Zapdos',
    'Moltres',
    'Dratini',
    'Dragonair',
    'Dragonite',
    'Mewtwo',
    'Mew'
  ]
};

export const WithOptGroups = Template.bind({});
WithOptGroups.args = {
  id: 'dinosaur',
  label: 'Pick a dinosaur',
  options: [
    {
      label: 'Theropods',
      options: [
        'Tyrannosaurus',
        'Velociraptor',
        'Deinonychus'
      ]
    },
    {
      label: 'Sauropods',
      options: [
        'Diplodocus',
        'Saltasaurus',
        'Apatosaurus'
      ]
    },
    'Brontosaurus'
  ]
};

const moonVModel = 'Ganymede';

const WithTooltipTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {  Dropdown, Eye, LobLabel, Tooltip },
  data: () => ({ moonVModel }),
  setup: () => ({ args }),
  template: `
    <LobLabel
      label="Favorite Galilean Moon"
      labelFor="galilean-moons"
      tooltipContent="Dropdown tooltip"
    >
      <template v-slot:tooltip>
        <Tooltip>
          <template #trigger>
            <Eye class="w-5 h-5" />
          </template>
          <template #content>
            Tough choice, I know!
          </template>
        </Tooltip>
      </template>
    </LobLabel>
    <dropdown v-bind="args" v-model="moonVModel" />
  `
});

export const WithTooltip = WithTooltipTemplate.bind({});
WithTooltip.args = {
  id: 'galilean-moons',
  options: [
    'Io',
    'Europa',
    'Ganymede',
    'Callisto'
  ]
};
