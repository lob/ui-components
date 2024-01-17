import "@testing-library/jest-dom";
import { render } from "@testing-library/vue";
import TableRow from "../TableRow.vue";

const renderComponent = (options = {}) => render(TableRow, { ...options });

describe("TableRow", () => {
  it("renders TableRow correctly for 2 components in 2 separate cells", () => {
    const slotContent1 = "Hello";
    const slotContent2 = "Full Line Item";
    const slots = { default: [slotContent1, slotContent2] };

    const { queryByText } = renderComponent({ slots });

    const slot1 = queryByText("Hello");
    expect(slot1).toBeInTheDocument();
    expect(slot1.outerHTML).toEqual("<td>Hello</td>");

    const slot2 = queryByText("Full Line Item");
    expect(slot2).toBeInTheDocument();
    expect(slot2.outerHTML).toEqual("<td>Full Line Item</td>");
  });

  it("singleCellRow renders 2 components in a single cells", () => {
    const slotContent1 = "Hello ";
    const slotContent2 = "Full Line Item";
    const slots = { default: [slotContent1, slotContent2] };
    const props = { singleCellRow: true };
    const { queryByRole } = renderComponent({ props, slots });

    const cell = queryByRole("cell");
    expect(cell).toBeInTheDocument();
    expect(cell.outerHTML).toEqual(
      '<td colspan="100%">HelloFull Line Item</td>',
    );
  });
});
