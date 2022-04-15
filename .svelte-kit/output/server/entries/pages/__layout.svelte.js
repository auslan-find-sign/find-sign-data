import { c as create_ssr_component, a as add_classes } from "../../chunks/index-9328c9de.js";
/* empty css                            */var __layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "body{background-image:var(--texture-purple-waves);background-size:300px 300px}",
  map: null
};
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<nav${add_classes("heading".trim())}></nav>

${slots.default ? slots.default({}) : ``}`;
});
export { _layout as default };
