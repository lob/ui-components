import "@testing-library/jest-dom";
import { render } from "@testing-library/vue";
import { createRouter, createMemoryHistory } from "vue-router";
import { constants } from "@/config";
import TopNavDropdownItem from "../TopNavDropdownItem.vue";

const routes = [
  { path: "", component: { template: "<div></div>" } },
  { path: "/", component: { template: "<div>/</div>" } },
  { path: "/settings", component: { template: "<div>settings</div>" } },
];
const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

const renderComponent = async (options) => {
  const result = render(TopNavDropdownItem, {
    ...options,
    global: { plugins: [router, constants] },
  });
  await router.isReady();
  return result;
};

describe("TopNavDropdownItem", () => {
  it("renders correctly", async () => {
    const props = { to: "/settings" };
    const slots = { default: "settings" };
    const { queryByText } = await renderComponent({ props, slots });

    const itemTitle = queryByText("settings");
    expect(itemTitle).toBeInTheDocument();
  });
});
