import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/vue";
import Checkbox from "../Checkbox.vue";

const initialProps = {
  modelValue: false,
  name: "Test name",
  label: "Test",
  disabled: false,
};

const renderComponent = (options) => render(Checkbox, { ...options });

describe("Checkbox", () => {
  it("renders correctly", () => {
    const props = {
      ...initialProps,
    };

    const { queryByText, queryByLabelText } = renderComponent({ props });

    const label = queryByText(props.label);
    expect(label).toBeInTheDocument();
    const checkbox = queryByLabelText(props.label);
    expect(checkbox).toBeInTheDocument();
  });

  it("disables the input when disabled prop is true", () => {
    const props = {
      ...initialProps,
      disabled: true,
    };

    const { getByLabelText } = renderComponent({ props });

    const checkbox = getByLabelText(props.label);
    expect(checkbox).toBeDisabled();
  });

  it("requires the input when required prop is true", () => {
    const props = {
      ...initialProps,
      required: true,
    };

    const { getByLabelText } = renderComponent({ props });

    const checkbox = getByLabelText(new RegExp(props.label));
    expect(checkbox).toBeRequired();
  });

  it("fires the input event when the input is clicked", async () => {
    const props = initialProps;
    const { getByLabelText, emitted } = renderComponent({ props });

    const checkbox = getByLabelText(props.label);

    await fireEvent.click(checkbox); // checks de checkbox
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty("input");
    expect(emittedEvent.input[0]).toEqual([true]);
    expect(checkbox).toBeChecked();
  });

  it("fires the click event when the input is clicked", async () => {
    const props = initialProps;
    const { getByLabelText, emitted } = renderComponent({ props });

    const checkbox = getByLabelText(props.label);

    await fireEvent.click(checkbox); // checks de checkbox
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty("click");
  });

  describe("when the v-model is a simple boolean", () => {
    describe("when the v-model is false", () => {
      it("does not check the input", () => {
        const props = initialProps;
        const { getByLabelText } = renderComponent({ props });

        const checkbox = getByLabelText(props.label);
        expect(checkbox).not.toBeChecked();
      });

      it("emits an input event with the value true when clicked", async () => {
        const props = initialProps;
        const { getByLabelText, emitted } = renderComponent({ props });

        const checkbox = getByLabelText(props.label);

        await fireEvent.click(checkbox);
        const emittedEvent = emitted();
        expect(emittedEvent).toHaveProperty("input");
        expect(emittedEvent.input[0]).toEqual([true]);
        expect(checkbox).toBeChecked();
      });
    });

    describe("when the v-model is true", () => {
      it("checks the input when the v-model is true", () => {
        const props = {
          ...initialProps,
          modelValue: true,
        };
        const { getByLabelText } = renderComponent({ props });

        const checkbox = getByLabelText(props.label);
        expect(checkbox).toBeChecked();
      });

      it("emits an input event with the value true when clicked", async () => {
        const props = {
          ...initialProps,
          modelValue: true,
        };
        const { getByLabelText, emitted } = renderComponent({ props });

        const checkbox = getByLabelText(props.label);

        await fireEvent.click(checkbox);
        const emittedEvent = emitted();
        expect(emittedEvent).toHaveProperty("input");
        expect(emittedEvent.input[0]).toEqual([false]);
        expect(checkbox).not.toBeChecked();
      });
    });
  });

  describe("when the v-model is an array", () => {
    it("does not check the input when the v-model does not contain the value", () => {
      const props = {
        ...initialProps,
        value: "test",
        modelValue: ["not test", "also not test"],
      };

      const { getByLabelText } = renderComponent({ props });

      const checkbox = getByLabelText(props.label);
      expect(checkbox).not.toBeChecked();
    });

    it("checks the input when the v-model does contain the value", () => {
      const props = {
        ...initialProps,
        value: "test",
        modelValue: ["not test", "test"],
      };
      const { getByLabelText } = renderComponent({ props });

      const checkbox = getByLabelText(props.label);
      expect(checkbox).toBeChecked();
    });

    it("emits an input event that contains value of the checkbox when clicked", async () => {
      const props = {
        ...initialProps,
        value: "test",
        modelValue: ["not a test"],
      };
      const { getByLabelText, emitted } = renderComponent({ props });

      const checkbox = getByLabelText(props.label);

      await fireEvent.click(checkbox);
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty("input");
      expect(emittedEvent.input[0][0]).toContain("test");
      expect(checkbox).toBeChecked();
    });
  });
});
