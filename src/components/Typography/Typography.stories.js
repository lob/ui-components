import { Typography, H1, H2, H3, P, Caption } from '../Typography';
import mdx from './Typography.mdx';

export default {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    content: {
      control: {
        type: 'text'
      },
      description: 'Text to display',
      table: {
        defaultValue: 'I am typography.',
        type: 'text'
      }
    },
    variant: {
      options: ['heading1', 'heading2', 'heading3', 'body1', 'caption'],
      control: {
        defaultValue: 'body1',
        type: 'select'
      }
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Typography },
  setup: () => ({ args }),
  template: '<typography v-bind="args">{{ args.content }}</typography>'
});

export const Primary = Template.bind({});
Primary.args = {
  content: 'I am typography.',
  variant: 'body1'
};

const LoremIpsumTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Typography },
  setup: () => ({ args }),
  template: `
	<typography variant="heading1">
	It is also the story of a book
	</typography>
	<typography variant="heading2">
	a book called the Hitchhiker's Guide to the Galaxy
	</typography>
	<typography variant="heading3">
	not  an  Earth  book,  never  published  on  Earth,
	</typography>
	<typography variant="body1">
	and  until  the  terrible  catastrophe  occurred,  never  seen  or  heard  of  by  any  Earthman. 
	Nevertheless,  a  wholly  remarkable  book.  
	In  fact  it  was  probably  the  most  remarkable  book  ever  to  come  out  of  the  great  publishing  houses  of  Ursa  Minorʹof  which  no  Earthman  had  ever  heard  either. 
	</typography>
	<typography variant="body1">
	Not  only  is  it  a  wholly  remarkable  book,  it  is  also  a  highly  successful  one - more  popular  than  the  Celestial  Home  Care  Omnibus,  better  selling  than  Fifty  More  Things  to  do  in  Zero  Gravity,  and  more  controversial  than  Oolon  Colluphid's  trilogy  of  philosophical  blockbusters  Where  God  Went  Wrong,  Some  More  of  God's  Greatest  Mistakes  and  Who  is  this  God  Person  Anyway?  
	</typography>
	<typography variant="body1">
  In  many  of  the  more  relaxed  civilizations  on  the  Outer  Eastern  Rim  ofthe  Galaxy,  the  Hitch  Hiker's  Guide  has  already  supplanted  the  great  Encyclopedia  Galactica  as  the  standard  repository  of  all  knowledge  and  wisdom,  for  though  it  has  many  omissions  and  contains  much  that  is  apocryphal,  or  at  least  wildly  inaccurate,  it  scores  over  the  older,  more  pedestrian  work  in  two  important  respects. 
	</typography>
	<typography variant="caption">
	First,  it  is  slightly  cheaper;  and  secondly  it  has  the  words  DON'T  PANIC  inscribed  in  large  friendly  letters  on  its  cover. 
	</typography>
	`
});

export const LoremIpsum = LoremIpsumTemplate.bind({});
LoremIpsum.args = { };

const H1Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { H1 },
  setup: () => ({ args }),
  template: '<H1>{{ args.content }}</H1>'
});

export const AliasH1 = H1Template.bind({});
AliasH1.args = {
  content: 'Heading 1'
};

const H2Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { H2 },
  setup: () => ({ args }),
  template: '<H2>{{ args.content }}</H2>'
});

export const AliasH2 = H2Template.bind({});
AliasH2.args = {
  content: 'Heading 2'
};

const H3Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { H3 },
  setup: () => ({ args }),
  template: '<H3>{{ args.content }}</H3>'
});

export const AliasH3 = H3Template.bind({});
AliasH3.args = {
  content: 'Heading 3'
};

const PTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { P },
  setup: () => ({ args }),
  template: '<P>{{ args.content }}</P>'
});

export const AliasP = PTemplate.bind({});
AliasP.args = {
  content: 'Paragraph/body'
};

const CaptionTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Caption },
  setup: () => ({ args }),
  template: '<Caption>{{ args.content }}</Caption>'
});

export const AliasCaption = CaptionTemplate.bind({});
AliasCaption.args = {
  content: 'Caption'
};
