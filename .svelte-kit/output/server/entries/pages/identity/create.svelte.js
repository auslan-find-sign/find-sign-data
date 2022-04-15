import { c as create_ssr_component, v as validate_component } from "../../../chunks/index-94118fce.js";
import { C as CodeBlock } from "../../../chunks/CodeBlock-adccb62c.js";
import "tweetnacl";
import "../../../chunks/Icon-64ece6d3.js";
import "prismjs";
const Create = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const title = "Create Identity";
  let identity = "Generating... (ensure javascript is enabled)";
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  return `<h1>New Cryptographic Identity:</h1>
${validate_component(CodeBlock, "CodeBlock").$$render($$result, { lang: "text/plain", text: identity }, {}, {})}
<p>Be sure to keep it somewhere safe, like a password manager.
</p>`;
});
export { Create as default };
