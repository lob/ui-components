import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/vue';
import FilterContent from '../FilterContent.vue';

const renderComponent = (options = {}) => render(FilterContent, { ...options });

describe('FilterContent', () => {

  it('does not render when open is false', () => {
    const props = { open: false };
    const { queryByTestId } = renderComponent({ props });

    const filterContent = queryByTestId('container');
    expect(filterContent).not.toBeInTheDocument();
  });

  it('does render when open is true', () => {
    const props = { open: true };
    const { queryByTestId } = renderComponent({ props });

    const filterContent = queryByTestId('container');
    expect(filterContent).toBeInTheDocument();
  });

  it('closes the filter content when clicking outside the component and bound elements', async () => {
    const props = { open: true };

    const { emitted } = renderComponent({ props });
    await fireEvent.click(document);

    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('update:open');

    expect(emittedEvent['update:open'][0][0]).toEqual(false);
  });

  describe('without a bound element', () => {

    const Component = {
      components: { FilterContent },
      template: `
        <div>
          <button @click="filterOpen = !filterOpen">button</button>
          <filter-content v-model:open="filterOpen"><span>content</span></filter-content>
        </div>
      `,
      data () {
        return {
          filterOpen: false
        };
      }
    };

    it('always bubbles the click event when the element mutation v-model:open is clicked', async () => {
      const { getByText, findByText  } = render(Component);
      const button = getByText('button');
      await fireEvent.click(button);
      await findByText('content');
      await fireEvent.click(button);

      const content = await findByText('content');
      expect(content).toBeInTheDocument();
    });

  });

  describe('with a bound element', () => {

    const Component = {
      components: { FilterContent },
      template: `
        <div>
          <button ref="filterContentCtrl" @click="filterOpen = !filterOpen">button</button>
          <filter-content v-model:open="filterOpen" :bound-element="$refs.filterContentCtrl"><span>content</span></filter-content>
        </div>
      `,
      data () {
        return {
          filterOpen: false
        };
      }
    };

    it('does not bubble the click event when the element mutation v-model:open is clicked', async () => {
      const { getByText, queryByText, findByText  } = render(Component);
      const button = getByText('button');
      await fireEvent.click(button);
      await findByText('content');
      await fireEvent.click(button);

      await waitFor(() => {
        const content = queryByText('content');
        expect(content).not.toBeInTheDocument();
      });
    });

  });

  describe('only one FilterContent can be open at a time', () => {

    const Component = {
      components: { FilterContent },
      template: `
        <div>
          <button ref="buttonOne" @click="filter1Open = true">button 1</button>
          <filter-content v-model:open="filter1Open" :bound-element="$refs.buttonOne"><span>content 1</span></filter-content>
          <button ref="buttonTwo" @click="filter2Open = true" data-testId="buttonToClick">button 2</button>
          <filter-content v-model:open="filter2Open" :bound-element="$refs.buttonTwo"><span>content 2</span></filter-content>
        </div>
      `,
      data () {
        return {
          filter1Open: true,
          filter2Open: false
        };
      }
    };

    it('closes the filter when opening another filter', async () => {
      const { queryByTestId, queryByText  } = render(Component);
      const button = queryByTestId('buttonToClick');
      await fireEvent.click(button);

      await waitFor(() => {
        const content1 = queryByText('content 1');
        const content2 = queryByText('content 2');
        expect(content1).not.toBeInTheDocument();
        expect(content2).toBeInTheDocument();
      });
    });

  });

});
