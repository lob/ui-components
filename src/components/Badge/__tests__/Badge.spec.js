import "@testing-library/jest-dom";
import { render } from "@testing-library/vue";
import Badge from "../Badge.vue";

let slots;

const renderComponent = (options) => render(Badge, { ...options });

describe("Badge", () => {
  it("renders correctly", () => {
    const slotContent = "Hello, this is a badge.";
    slots = { default: slotContent };
    const { queryByText } = renderComponent({ slots });

    const badgeContent = queryByText(slotContent);
    expect(badgeContent).toBeInTheDocument();
  });
});
