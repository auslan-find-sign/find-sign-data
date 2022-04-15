import { c as create_ssr_component, v as validate_component } from "../../../chunks/index-9328c9de.js";
import { M as MainBlock } from "../../../chunks/MainBlock-9a8c3e9c.js";
import { C as CodeBlock } from "../../../chunks/CodeBlock-693831d6.js";
import "tweetnacl-ts";
import "../../../chunks/site-config-b274994e.js";
/* empty css                                                                *//* empty css                                                           */import "highlight.js/lib/core";
import "highlight.js/lib/languages/json";
import "highlight.js/lib/languages/yaml";
import "highlight.js/lib/languages/xml";
import "highlight.js/lib/languages/markdown";
const Create = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const title = "Create Identity";
  let identity = "Generating... (ensure javascript is enabled)";
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  return `${validate_component(MainBlock, "MainBlock").$$render($$result, { title }, {}, {
    default: () => {
      return `<h1>New Cryptographic Identity:</h1>
  ${validate_component(CodeBlock, "CodeBlock").$$render($$result, { lang: "text/plain", text: identity }, {}, {})}
  <p>Be sure to keep it somewhere safe, like a password manager.
  </p>`;
    }
  })}`;
});
export { Create as default };
