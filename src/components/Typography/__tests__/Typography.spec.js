import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import { H1, H2, H3, P, Caption } from '../';

const c = (name, value) => ({ name, value });

const components = [
  c('H1', H1),
  c('H2', H2),
  c('H3', H3),
  c('P', P),
  c('Caption', Caption)
];

for (const component of components) {
  describe('typography', () => {

    it('renders correctly', () => {
      let content = 'This is text that will render inside the component';
      if (component.value === H3) {
        content = content.toUpperCase();
      }
      const slots = { default: content };
      const { queryByText } = render(component.value, { slots });
      const contentElement = queryByText(content);
      expect(contentElement).toBeInTheDocument();
    });

  });
}
