import { c as create_ssr_component, v as validate_component } from "../../chunks/index-94118fce.js";
import { C as CodeBlock } from "../../chunks/CodeBlock-adccb62c.js";
import { M as MainWithSidebar, L as ListSidebar, a as MainBlock } from "../../chunks/MainWithSidebar-fd4910a5.js";
import "../../chunks/Icon-64ece6d3.js";
import "prismjs";
import "../../chunks/site-config-b274994e.js";
/* empty css                            */const Code_block = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(MainWithSidebar, "MainWithSidebar").$$render($$result, {}, {}, {
    sidebar: () => {
      return `${validate_component(ListSidebar, "ListSidebar").$$render($$result, { slot: "sidebar" }, {}, {})}`;
    },
    default: () => {
      return `${validate_component(MainBlock, "MainBlock").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(CodeBlock, "CodeBlock").$$render($$result, {
            lang: "javascript",
            text: "// hello world\nx = 1 + 2\n"
          }, {}, {})}`;
        }
      })}`;
    }
  })}`;
});
export { Code_block as default };
