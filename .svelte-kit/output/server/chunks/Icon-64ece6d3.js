import { c as create_ssr_component, e as escape, n as null_to_empty, f as add_attribute } from "./index-94118fce.js";
var symbols = "/_app/assets/symbol-defs-b50b1867.svg";
var Icon_svelte_svelte_type_style_lang = "";
const css = {
  code: "svg.svelte-ijoiqg{fill:currentColor;width:1em;height:1em;vertical-align:-0.5ex}",
  map: null
};
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name } = $$props;
  let { ariaHidden = false } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ariaHidden === void 0 && $$bindings.ariaHidden && ariaHidden !== void 0)
    $$bindings.ariaHidden(ariaHidden);
  $$result.css.add(css);
  return `<svg class="${escape(null_to_empty($$props.class)) + " svelte-ijoiqg"}"${add_attribute("style", $$props.style, 0)} aria-label="${escape(name) + " icon"}"${add_attribute("aria-hidden", ariaHidden, 0)}><use href="${escape(symbols) + "#icon-" + escape(name)}"></use></svg>`;
});
export { Icon as I };
