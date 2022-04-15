import { c as create_ssr_component, v as validate_component } from "../../chunks/index-9328c9de.js";
import { C as CodeBlock } from "../../chunks/CodeBlock-693831d6.js";
import { M as MainBlock } from "../../chunks/MainBlock-9a8c3e9c.js";
import { L as ListSidebar } from "../../chunks/ListSidebar-ab43ec0c.js";
import { M as MainWithSidebar } from "../../chunks/MainWithSidebar-c2d2c4b0.js";
/* empty css                                                        */import "highlight.js/lib/core";
import "highlight.js/lib/languages/json";
import "highlight.js/lib/languages/yaml";
import "highlight.js/lib/languages/xml";
import "highlight.js/lib/languages/markdown";
import "../../chunks/site-config-b274994e.js";
/* empty css                                                             */import "../../chunks/Icon-678427fc.js";
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
