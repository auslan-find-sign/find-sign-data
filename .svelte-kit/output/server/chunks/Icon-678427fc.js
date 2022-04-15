import { c as create_ssr_component, e as escape, n as null_to_empty, h as add_attribute } from "./index-9328c9de.js";
/* empty css                                             */var symbols = "/_app/assets/symbol-defs-818e0542.svg";
const css = {
  code: "svg.svelte-ijoiqg{fill:currentColor;width:1em;height:1em;vertical-align:-0.5ex}",
  map: null
};
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name } = $$props;
  let { label = void 0 } = $$props;
  let { ariaHidden = false } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.ariaHidden === void 0 && $$bindings.ariaHidden && ariaHidden !== void 0)
    $$bindings.ariaHidden(ariaHidden);
  $$result.css.add(css);
  return `<svg class="${escape(null_to_empty($$props.class)) + " svelte-ijoiqg"}"${add_attribute("style", $$props.style, 0)}${add_attribute("aria-label", label ? label : `${name} icon`, 0)}${add_attribute("aria-hidden", ariaHidden, 0)}><use href="${escape(symbols) + "#icon-" + escape(name)}"></use></svg>`;
});
export { Icon as I };
