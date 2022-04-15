import { c as create_ssr_component, v as validate_component } from "../../chunks/index-9328c9de.js";
import { M as MainBlock } from "../../chunks/MainBlock-9a8c3e9c.js";
import { L as ListSidebar } from "../../chunks/ListSidebar-ab43ec0c.js";
import { M as MainWithSidebar } from "../../chunks/MainWithSidebar-c2d2c4b0.js";
import "../../chunks/site-config-b274994e.js";
/* empty css                                                             */import "../../chunks/Icon-678427fc.js";
/* empty css                                                        *//* empty css                            */const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
