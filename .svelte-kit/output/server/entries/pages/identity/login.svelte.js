import { c as create_ssr_component, v as validate_component, h as add_attribute, e as escape } from "../../../chunks/index-9328c9de.js";
import { a as validateIdentity } from "../../../chunks/auth-6c6bc6d8.js";
import { M as MainBlock } from "../../../chunks/MainBlock-9a8c3e9c.js";
import "tweetnacl-ts";
import "../../../chunks/binary-string-9be29c7b.js";
import "../../../chunks/site-config-b274994e.js";
/* empty css                                                                */const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let valid;
  const title = "Login with Identity";
  let identityString = "";
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  valid = validateIdentity(identityString);
  return `${validate_component(MainBlock, "MainBlock").$$render($$result, { title }, {}, {
    default: () => {
      return `<p>Login using Identity string created using Create Identity tool:
  </p>

  <input type="${"password"}"${add_attribute("value", identityString, 0)}>

  <p>Identity field is: ${escape(valid ? "valid" : identityString.length === 0 ? "empty" : "invalid")}</p>`;
    }
  })}`;
});
export { Login as default };
