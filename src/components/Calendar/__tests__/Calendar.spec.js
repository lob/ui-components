import "@testing-library/jest-dom";
import { render } from "@testing-library/vue";
import { translate } from "@/mixins";
import en from "@/mixins/en";
import userEvent from "@testing-library/user-event";
import Calendar from "../Calendar.vue";

const mixins = [translate];

const initialProps = {
  id: "test",
};

const renderComponent = (options) =>
  render(Calendar, { ...options, global: { mixins } });

describe("Calendar", () => {
  let component;
  const RealDate = global.Date;
  const modelValue = new Date(2021, 5, 14);

  beforeEach(() => {
    const props = { ...initialProps };
    const oldGlobalDate = global.Date;
    global.Date = vi.fn((...args) => {
      if (args.length) {
        return new RealDate(...args);
      }
      return new Date(2021, 5, 14);
    });
    global.Date.now = RealDate.now;
    global.Date.UTC = oldGlobalDate.UTC;
    component = renderComponent({ props });
  });

  afterAll(() => {
    global.Date = RealDate;
  });

  it("renders a previous month button", () => {
    const { queryByText } = component;

    const button = queryByText(en.datepicker.prevMonthLabel);
    expect(button).toBeInTheDocument();
  });

  it("renders a next month button", () => {
    const { queryByText } = component;

    const button = queryByText(en.datepicker.nextMonthLabel);
    expect(button).toBeInTheDocument();
  });

  it("renders text for the current month and year", () => {
    const { queryByText } = component;

    const monthText = queryByText("June 2021");
    expect(monthText).toBeInTheDocument();
  });

  it("focuses back inside calendar on focused day when typing Tab from next button", async () => {
    const { queryByText } = component;

    // tab to prev button
    // tab to next button
    // tab back to focused date
    await userEvent.keyboard("{Tab}{Tab}{Tab}");

    const focusedDate = queryByText(modelValue.getDate()).closest("button");
    expect(focusedDate).toHaveFocus();
  });

  it("goes to the previous month when clicking previous month button", async () => {
    const { queryByText } = component;

    const button = queryByText(en.datepicker.prevMonthLabel);
    await userEvent.click(button);

    const monthText = queryByText("May 2021");
    expect(monthText).toBeInTheDocument();
  });

  it("goes to the next month when clicking next month button", async () => {
    const { queryByText } = component;

    const button = queryByText(en.datepicker.nextMonthLabel);
    await userEvent.click(button);

    const monthText = queryByText("July 2021");
    expect(monthText).toBeInTheDocument();
  });

  it("typing ArrowRight, it focuses on the next non-disabled date", async () => {
    const { queryByText, emitted } = component;

    await userEvent.keyboard("{Tab}{Tab}{Tab}{ArrowRight}");
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty("keydown");

    const focusedDate = queryByText(modelValue.getDate() + 1).closest("button");
    expect(focusedDate).toHaveFocus();
  });

  it("typing ArrowLeft, it focuses on the next non-disabled date", async () => {
    const { queryByText, emitted } = component;

    await userEvent.keyboard("{Tab}{Tab}{Tab}{ArrowRight}{ArrowLeft}");
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty("keydown");

    const focusedDate = queryByText(modelValue.getDate()).closest("button");
    expect(focusedDate).toHaveFocus();
  });

  it("typing ArrowDown, it focuses on the next non-disabled date", async () => {
    const { queryByText, emitted } = component;

    await userEvent.keyboard("{Tab}{Tab}{Tab}{ArrowDown}");
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty("keydown");

    const focusedDate = queryByText(modelValue.getDate() + 7).closest("button");
    expect(focusedDate).toHaveFocus();
  });

  it("typing ArrowUp, it focuses on the next non-disabled date", async () => {
    const { queryByText, emitted } = component;

    await userEvent.keyboard("{Tab}{Tab}{Tab}{ArrowUp}");
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty("keydown");

    const focusedDate = queryByText(modelValue.getDate() - 7).closest("button");
    expect(focusedDate).toHaveFocus();
  });

  it("typing PageDown (without shift key), it focuses on the same date one month in the future", async () => {
    const { queryByText, emitted } = component;

    await userEvent.keyboard("{Tab}{Tab}{Tab}{PageDown}");
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty("keydown");

    const monthText = queryByText("July 2021");
    expect(monthText).toBeInTheDocument();

    const focusedDate = queryByText(modelValue.getDate()).closest("button");
    expect(focusedDate).toHaveFocus();
  });

  it("typing Home, it focuses on the day at the start of the current week", async () => {
    const { queryByText, emitted } = component;

    await userEvent.keyboard("{Tab}{Tab}{Tab}{Home}");
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty("keydown");

    const focusedDate = queryByText(13).closest("button");
    expect(focusedDate).toHaveFocus();
  });

  it("typing End, it focuses on the day at the end of the current week", async () => {
    const { queryByText, emitted } = component;

    await userEvent.keyboard("{Tab}{Tab}{Tab}{End}");
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty("keydown");

    const focusedDate = queryByText(19).closest("button");
    expect(focusedDate).toHaveFocus();
  });

  describe("selecting a date", () => {
    let dateToSelect;

    beforeEach(() => {
      const { queryByText } = component;
      dateToSelect = queryByText(23).closest("button");
    });

    it("emits an input event", async () => {
      const { emitted } = component;

      await userEvent.click(dateToSelect);
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty("input");

      expect(emittedEvent.input[0][0]).toEqual(new Date(2021, 5, 23));
    });

    it("emits an update:modelValue event", async () => {
      const { emitted } = component;

      await userEvent.click(dateToSelect);
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty("update:modelValue");

      expect(emittedEvent["update:modelValue"][0][0]).toEqual(
        new Date(2021, 5, 23),
      );
    });
  });
});
