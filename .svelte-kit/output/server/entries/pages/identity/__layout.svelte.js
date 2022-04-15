import { c as create_ssr_component, v as validate_component } from "../../../chunks/index-9328c9de.js";
/* empty css                                                                */import { L as ListSidebar } from "../../../chunks/ListSidebar-ab43ec0c.js";
import { M as MainWithSidebar } from "../../../chunks/MainWithSidebar-c2d2c4b0.js";
import "../../../chunks/Icon-678427fc.js";
/* empty css                                                           *//* empty css                               */const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const links = Object.entries({
    "Login": "/identity/login",
    "Create Identity": "/identity/create"
  });
  return `${validate_component(MainWithSidebar, "MainWithSidebar").$$render($$result, {}, {}, {
    sidebar: () => {
      return `${validate_component(ListSidebar, "ListSidebar").$$render($$result, {
        slot: "sidebar",
        icon: "user-circle",
        items: links
      }, {}, {})}`;
    },
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
export { _layout as default };
