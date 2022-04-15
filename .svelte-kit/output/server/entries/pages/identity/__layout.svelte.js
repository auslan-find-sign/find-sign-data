import { c as create_ssr_component, v as validate_component } from "../../../chunks/index-94118fce.js";
import { M as MainWithSidebar, L as ListSidebar, a as MainBlock } from "../../../chunks/MainWithSidebar-fd4910a5.js";
import "../../../chunks/site-config-b274994e.js";
import "../../../chunks/Icon-64ece6d3.js";
/* empty css                               */const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
      return `${validate_component(MainBlock, "MainBlock").$$render($$result, {}, {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}`;
    }
  })}`;
});
export { _layout as default };
