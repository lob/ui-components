import "@testing-library/jest-dom";
import { render } from "@testing-library/vue";
import TableHeader from "../TableHeader.vue";

const renderComponent = (options = {}) => render(TableHeader, { ...options });

describe("TableHeader", () => {
  it("renders TableHeader correctly", () => {
    const slotContent = "Hello";
    const slots = { default: [slotContent] };

    const { queryByRole, queryByText } = renderComponent({ slots });

    const thead = queryByRole("rowgroup");
    expect(thead).toBeInTheDocument();

    const slot = queryByText("Hello");
    expect(slot).toBeInTheDocument();
  });
});
