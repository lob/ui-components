import '@testing-library/jest-dom';
import Vue from 'vue';

import { render, fireEvent, waitFor } from '@testing-library/vue';
import { constants } from '../../../config';
import MainNavigationItem from '../MainNavigationItem.vue';

Vue.config.silent = true; // suppressing warnings due to known issue with dynamic components and native events

const configureVue = (vue) => {
  vue.use(constants);
};

const routes = [];

const initialProps = {
  title: 'Overview',
  iconSrc: 'path/to/image.svg',
  iconAltText: 'very descriptive alt text',
  active: false,
  subNavCollapsed: false
};

const renderComponent = (options, configure = configureVue) => render(MainNavigationItem, { ...options, routes }, configure);

describe('Main Navigation Item', () => {

  it('renders correctly', () => {
    const props = initialProps;
    const { queryByText, queryByAltText } = renderComponent({ props });

    const item = queryByText(props.title);
    expect(item).toBeInTheDocument();

    const image = queryByAltText(props.iconAltText);
    expect(image).toHaveAttribute('src', props.iconSrc);
  });

  describe('with a to prop', () => {

    it('renders a link', () => {
      const props = {
        ...initialProps,
        to: '/overview'
      };
      const { queryByRole } = renderComponent({ props });

      const link = queryByRole('link');
      expect(link).toBeInTheDocument();

      const button = queryByRole('button');
      expect(button).not.toBeInTheDocument();
    });

  });

  describe('without a to prop', () => {

    it('renders a button', () => {
      const props = initialProps;
      const { queryByRole } = renderComponent({ props });

      const link = queryByRole('link');
      expect(link).not.toBeInTheDocument();

      const button = queryByRole('button');
      expect(button).toBeInTheDocument();
    });

    describe('without chld nav items', () => {

      it('does not render a collapse/expand icon', () => {
        const props = initialProps;
        const { queryByAltText } = renderComponent({ props });

        const image = queryByAltText(/Collapse|Expand/i);
        expect(image).not.toBeInTheDocument();
      });

    });

    describe('with child nav items', () => {

      let slots;
      let slotContent;

      beforeEach(() => {
        slotContent = 'I\'m a child';
        slots = { default: [`<ul><li>${slotContent}</li></ul>`] };
      });

      it('renders the slot content', () => {
        const props = initialProps;
        const { queryByText } = renderComponent({ props, slots });

        const slot = queryByText(slotContent);
        expect(slot).toBeInTheDocument();
      });

      describe('when collapsible', () => {

        it('renders a collapse/expand icon', () => {
          const props = initialProps;
          const { queryByAltText } = renderComponent({ props, slots });

          const image = queryByAltText(/Collapse|Expand/i);
          expect(image).toBeInTheDocument();
        });

        describe('and expanded', () => {

          let props;

          beforeEach(() => {
            props = {
              ...initialProps,
              subNavCollapsed: false
            };
          });

          it('renders a collapse icon', () => {
            const { queryByAltText } = renderComponent({ props, slots });

            const image = queryByAltText(/Collapse/i);
            expect(image).toBeInTheDocument();
          });

          it('collapses the sub navigation when clicked', async () => {
            const { getByText, queryByText, queryByAltText } = renderComponent({ props, slots });

            const button = getByText(props.title);
            fireEvent.click(button);

            await waitFor(() => {
              const slot = queryByText(slotContent);
              expect(slot).not.toBeInTheDocument();
            });

            await waitFor(() => {
              const image = queryByAltText(/Expand/i);
              expect(image).toBeInTheDocument();
            });
          });

        });

        describe('and collapsed', () => {

          let props;

          beforeEach(() => {
            props = {
              ...initialProps,
              subNavCollapsed: true
            };
          });

          it('renders an expand icon', () => {
            const { queryByAltText } = renderComponent({ props, slots });

            const image = queryByAltText(/Expand/i);
            expect(image).toBeInTheDocument();
          });

          it('expands the sub navigation when clicked', async () => {
            const { getByText, queryByText, queryByAltText } = renderComponent({ props, slots });

            const button = getByText(props.title);
            fireEvent.click(button);

            await waitFor(() => {
              const slot = queryByText(slotContent);
              expect(slot).toBeInTheDocument();
            });

            await waitFor(() => {
              const image = queryByAltText(/Collapse/i);
              expect(image).toBeInTheDocument();
            });
          });

        });

      });

      describe('when not collapsible', () => {

        let props;

        beforeEach(() => {
          props = {
            ...initialProps,
            collapsible: false
          };
        });

        it('does not render a collapse/expand icon', () => {
          const { queryByAltText } = renderComponent({ props, slots });

          const image = queryByAltText(/Collapse|Expand/i);
          expect(image).not.toBeInTheDocument();
        });

        it('does not collapse the sub navigation when clicked', async () => {
          const { getByText, queryByText } = renderComponent({ props, slots });

          const button = getByText(props.title);
          fireEvent.click(button);

          await waitFor(() => {
            const slot = queryByText(slotContent);
            expect(slot).toBeInTheDocument();
          });
        });

      });

    });

  });

  describe('when parent nav is expanded', () => {

    it('expands its content appropriately', () => {
      const props = initialProps;
      const { queryByTestId } = renderComponent({ props });

      const collapsibleElement = queryByTestId('collapsibleElement');
      expect(collapsibleElement).toHaveClass('expanded');
    });

  });

  describe('when parent nav is collapsed', () => {

    let props;

    beforeEach(() => {
      props = {
        ...initialProps,
        expanded: false
      };
    });

    it('collapses its content appropriately', () => {
      const { queryByTestId } = renderComponent({ props });

      const collapsibleElement = queryByTestId('collapsibleElement');
      expect(collapsibleElement).not.toHaveClass('expanded');
    });

  });

});

