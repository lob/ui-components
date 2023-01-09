import '@testing-library/jest-dom';
import { createRouter, createMemoryHistory } from 'vue-router';
import { render, fireEvent, waitFor } from '@testing-library/vue';
import { constants } from '@/config';
import MainNavigationItem from '../MainNavigationItem.vue';

const initialProps = {
  title: 'Overview',
  iconSrc: 'path/to/image.svg',
  iconAltText: 'very descriptive alt text',
  active: false,
  subNavCollapsed: false
};

const routes = [
  { path: '', component: { template: '<div></div>' } },
  { path: '/', component: { template: '<div>/</div>' } },
  { path: '/overview', component: { template: '<div>overview</div>' } }
];
const router = createRouter({
  history: createMemoryHistory(),
  routes
});

const renderComponent = async (options) => {
  const result = render(MainNavigationItem, {
    ...options,
    global: { plugins: [router, constants] }
  });
  await router.isReady();
  return result;
};

const slots = {
  icon: `<template #icon="{ title }">
          <HouseChimney data-testid="overview-icon" size="xl" />
        </template>`
};

describe('Main Navigation Item', () => {

  it('renders correctly', async () => {
    const props = initialProps;
    const { queryByText, queryByTestId } = await renderComponent({ props, slots });

    const item = queryByText(props.title);
    expect(item).toBeInTheDocument();

    const icon = queryByTestId('overview-icon');
    expect(icon).toBeInTheDocument();
  });

  describe('with a to prop', () => {

    it('renders a link', async () => {
      const props = {
        ...initialProps,
        to: '/overview'
      };
      const { queryByRole } = await renderComponent({ props });

      const link = queryByRole('link');
      expect(link).toBeInTheDocument();

      const button = queryByRole('button');
      expect(button).not.toBeInTheDocument();
    });

    describe('when clicked', () => {

      it('emits a nav event', async () => {
        const props = {
          ...initialProps,
          to: '/overview'
        };
        const { queryByRole, emitted } = await renderComponent({ props });

        const link = queryByRole('link');
        expect(link).toBeInTheDocument();

        await fireEvent.click(link);
        const emittedEvent = emitted();
        expect(emittedEvent).toHaveProperty('nav');
        expect(emittedEvent.nav[0][0]).toEqual('/overview');
      });

    });

  });

  describe('without a to prop', () => {

    it('renders a button', async () => {
      const props = initialProps;
      const { queryByRole } = await renderComponent({ props });

      const link = queryByRole('link');
      expect(link).not.toBeInTheDocument();

      const button = queryByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('does not emit a nav event', async () => {
      const props = initialProps;
      const { queryByRole, emitted } = await renderComponent({ props });

      const button = queryByRole('button');
      expect(button).toBeInTheDocument();

      await fireEvent.click(button);
      const emittedEvent = emitted();
      expect(emittedEvent).not.toHaveProperty('nav');
    });

    describe('without chld nav items', () => {

      it('does not render a collapse/expand icon', async () => {
        const props = initialProps;
        const { queryByTestId } = await renderComponent({ props });

        const collapseExpandIcon = queryByTestId('collapse-expand-icon');
        expect(collapseExpandIcon).not.toBeInTheDocument();
      });

    });

    describe('with child nav items', () => {

      let slots;
      let slotContent;

      beforeEach(() => {
        slotContent = 'I\'m a child';
        slots = { default: [`<ul><li>${slotContent}</li></ul>`] };
      });

      it('renders the slot content', async () => {
        const props = initialProps;
        const { queryByText } = await renderComponent({ props, slots });

        const slot = queryByText(new RegExp(slotContent));
        expect(slot).toBeInTheDocument();
      });

      describe('when collapsible', () => {

        it('renders a collapse/expand icon', async () => {
          const props = initialProps;
          const { queryByTestId } = await renderComponent({ props, slots });

          const collapseExpandIcon = queryByTestId('collapse-expand-icon');
          expect(collapseExpandIcon).toBeInTheDocument();
        });

        describe('and expanded', () => {

          let props;

          beforeEach(() => {
            props = {
              ...initialProps,
              subNavCollapsed: false
            };
          });

          it('renders a collapse icon', async () => {
            const { queryByTestId } = await renderComponent({ props, slots });

            const collapseExpandIcon = queryByTestId('collapse-expand-icon');
            expect(collapseExpandIcon).toBeInTheDocument().toHaveClass('-rotate-180');
          });

          it('collapses the sub navigation when clicked', async () => {
            const { getByText, queryByText, queryByTestId } = await renderComponent({ props, slots });

            const button = getByText(props.title);
            fireEvent.click(button);

            await waitFor(() => {
              const slot = queryByText(new RegExp(slotContent));
              expect(slot).not.toBeVisible();
            });

            await waitFor(() => {
              const collapseExpandIcon = queryByTestId('collapse-expand-icon');
              expect(collapseExpandIcon).toBeInTheDocument().not.toHaveClass('-rotate-180');
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

          it('renders an expand icon', async () => {
            const { queryByTestId } = await renderComponent({ props, slots });

            const collapseExpandIcon = queryByTestId('collapse-expand-icon');
            expect(collapseExpandIcon).toBeInTheDocument().not.toHaveClass('-rotate-180');
          });

          it('expands the sub navigation when clicked', async () => {
            const { getByText, queryByText, queryByTestId } = await renderComponent({ props, slots });

            const button = getByText(props.title);
            fireEvent.click(button);

            await waitFor(() => {
              const slot = queryByText(new RegExp(slotContent));
              expect(slot).toBeVisible();
            });

            await waitFor(() => {
              const collapseExpandIcon = queryByTestId('collapse-expand-icon');
              expect(collapseExpandIcon).toBeInTheDocument().toHaveClass('-rotate-180');
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

        it('does not render a collapse/expand icon', async () => {
          const { queryByTestId } = await renderComponent({ props, slots });

          const collapseExpandIcon = queryByTestId('collapse-expand-icon');
          expect(collapseExpandIcon).not.toBeInTheDocument();
        });

        it('does not collapse the sub navigation when clicked', async () => {
          const { getByText, queryByText } = await renderComponent({ props, slots });

          const button = getByText(props.title);
          fireEvent.click(button);

          await waitFor(() => {
            const slot = queryByText(new RegExp(slotContent));
            expect(slot).toBeInTheDocument();
          });
        });

      });

    });

  });

  describe('with a itemClass prop', () => {

    it('renders a link', async () => {
      const props = {
        ...initialProps,
        itemClass: 'font-bold'
      };
      const { queryByText } = await renderComponent({ props });

      const item = queryByText(props.title);
      expect(item).toBeInTheDocument();
      expect(item).toHaveClass('font-bold');
    });

  });

  describe('when parent nav is expanded', () => {

    it('expands its content appropriately', async () => {
      const props = initialProps;
      const { queryByTestId } = await renderComponent({ props });

      const collapsibleElement = queryByTestId('collapsibleElement');
      expect(collapsibleElement).toHaveClass('xl:max-w-full');
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

    it('collapses its content appropriately', async () => {
      const { queryByTestId } = await renderComponent({ props });

      const collapsibleElement = queryByTestId('collapsibleElement');
      expect(collapsibleElement).not.toHaveClass('xl:max-w-full');
    });

  });

});

