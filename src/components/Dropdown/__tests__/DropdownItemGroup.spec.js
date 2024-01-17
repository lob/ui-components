import "@testing-library/jest-dom";
import { render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import DropdownItemGroup from "../DropdownItemGroup.vue";

const initialProps = {
  id: "id",
  group: {
    label: "group",
    options: ["opt 1", "opt 2"],
  },
  activeIndex: 0,
  placeholderText: "",
  flattenedOptions: ["opt 1", "opt 2", "opt 3"],
};

const renderComponent = (options) => render(DropdownItemGroup, { ...options });

describe("DropdownItemGroup", () => {
  it("renders an option for each item in the group", () => {
    const props = initialProps;
    const { queryAllByRole, queryByText } = renderComponent({ props });

    const options = queryAllByRole("option");
    expect(options.length).toEqual(props.group.options.length);

    const opt1 = queryByText(props.group.options[0]);
    expect(opt1).toBeInTheDocument();

    const opt2 = queryByText(props.group.options[1]);
    expect(opt2).toBeInTheDocument();
  });

  it("emits a mousedown event", async () => {
    const props = initialProps;
    const { queryAllByRole, emitted } = renderComponent({ props });

    const option = queryAllByRole("option")[0];

    await userEvent.pointer({ keys: "[MouseLeft>]", target: option });

    const emittedEvents = emitted();
    expect(emittedEvents).toHaveProperty("mousedown");
  });

  it("emits a click event", async () => {
    const props = initialProps;
    const { queryAllByRole, emitted } = renderComponent({ props });

    const option = queryAllByRole("option")[0];

    await userEvent.click(option);

    const emittedEvents = emitted();
    expect(emittedEvents).toHaveProperty("click");

    // eslint-disable-next-line no-unused-vars
    const [event, index] = emittedEvents.click[0];
    expect(index).toEqual(0);
  });

  it("emits a mouseenter event", async () => {
    const props = initialProps;
    const { queryAllByRole, emitted } = renderComponent({ props });

    const option = queryAllByRole("option")[0];

    await userEvent.pointer({ pointerName: "mouse", target: option });

    const emittedEvents = emitted();
    expect(emittedEvents).toHaveProperty("mouseenter");

    // eslint-disable-next-line no-unused-vars
    const [event, index] = emittedEvents.mouseenter[0];
    expect(index).toEqual(0);
  });
});
