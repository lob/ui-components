import Dropdown from './Dropdown.vue';
//import mdx from './Dropdown.mdx';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  decorators: [
    () => ({ template: '<div class="w-48"><story /></div>' })
  ]
//	parameters: {
//		docs: {
//			page: mdx
//		}
//	},
};
const vModel = 'Squirtle';

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {  Dropdown },
  data: () => ({ vModel }),
  setup: () => ({ args }),
  template: '<dropdown v-bind="args" v-model="vModel"></dropdown>'
});

export const Primary = Template.bind({});
Primary.args = {
  id: 'test',
  label: 'Test dropdown',
  options: ['Prudence', 'Jenny', 'Ginny', 'Brie']
};

export const Secondary = Template.bind({});
Secondary.args = {
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

export const Tertiary = Template.bind({});
Tertiary.args = {
  id: 'test',
  label: 'Test dropdown',
  options: [
    { label: 'California', value: 'California', disabled: true },
    { label: 'Colorado', value: 'CO' },
    { label: 'Illinois', value: 'IL', disabled: true },
    { label: 'Oklahoma', value: 'OK' },
    { label: 'Texas', value: 'TX', disabled: true }
  ]
};

const TestTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <select>
      <option value="1">Opt 1</option>
      <option value="2">Opt 2</option>
      <option value="3" disabled="true">Opt 3</option>
      <option value="4">Opt 4</option>
    </select>
  `
});

export const Test = TestTemplate.bind({});
