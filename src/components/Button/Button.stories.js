import LobButton from './Button.vue';
// import mdx from './Button.mdx';

export default {
  title: 'Components/ Button',
  component: LobButton
//	parameters: {
//		docs: {
//			page: mdx
//		}
//	},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {  LobButton },
  template: '<lob-button v-bind="$props">Woooooo</lob-button>'
});

export const Primary = Template.bind({});
