import { c as create_ssr_component, v as validate_component, e as escape } from "../../chunks/index-9328c9de.js";
import { M as MainWithSidebar } from "../../chunks/MainWithSidebar-c2d2c4b0.js";
import { M as MainBlock } from "../../chunks/MainBlock-9a8c3e9c.js";
import { C as CodeBlock } from "../../chunks/CodeBlock-693831d6.js";
import "../../chunks/site-config-b274994e.js";
/* empty css                                                             *//* empty css                                                        */import "highlight.js/lib/core";
import "highlight.js/lib/languages/json";
import "highlight.js/lib/languages/yaml";
import "highlight.js/lib/languages/xml";
import "highlight.js/lib/languages/markdown";
function load({ error, status }) {
  return {
    props: { message: error.message, status }
  };
}
const _error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { message } = $$props;
  let { status } = $$props;
  if ($$props.message === void 0 && $$bindings.message && message !== void 0)
    $$bindings.message(message);
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  return `${validate_component(MainWithSidebar, "MainWithSidebar").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(MainBlock, "MainBlock").$$render($$result, { title: "Error: " + status }, {}, {
        default: () => {
          return `<p>An error occured on the server: HTTP ${escape(status)}</p>
    ${validate_component(CodeBlock, "CodeBlock").$$render($$result, { lang: "none", text: message }, {}, {})}`;
        }
      })}`;
    }
  })}`;
});
export { _error as default, load };
