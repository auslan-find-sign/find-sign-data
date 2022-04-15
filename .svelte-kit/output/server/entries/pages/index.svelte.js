import { c as create_ssr_component, v as validate_component } from "../../chunks/index-94118fce.js";
import { M as MainWithSidebar, L as ListSidebar, a as MainBlock } from "../../chunks/MainWithSidebar-fd4910a5.js";
import "../../chunks/site-config-b274994e.js";
import "../../chunks/Icon-64ece6d3.js";
/* empty css                            */const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(MainWithSidebar, "MainWithSidebar").$$render($$result, {}, {}, {
    sidebar: () => {
      return `${validate_component(ListSidebar, "ListSidebar").$$render($$result, { slot: "sidebar" }, {}, {})}`;
    },
    default: () => {
      return `${validate_component(MainBlock, "MainBlock").$$render($$result, {}, {}, {
        default: () => {
          return `<p>Hello World
    </p>`;
        }
      })}`;
    }
  })}`;
});
export { Routes as default };
