import { c as create_ssr_component, b as compute_slots } from "./index-9328c9de.js";
var MainWithSidebar_svelte_svelte_type_style_lang = "";
const css = {
  code: 'div.layout.svelte-1qen1q2.svelte-1qen1q2{display:grid;grid-auto-flow:column;grid-template-columns:900px;grid-template-areas:"main";max-width:900px;margin-left:auto;margin-right:auto}div.layout.has-sidebar.svelte-1qen1q2.svelte-1qen1q2{grid-template-columns:290px 10px 600px;grid-template-areas:"sidebar gap main"}div.layout.svelte-1qen1q2 div.sidebar.svelte-1qen1q2{grid-area:sidebar}div.layout.svelte-1qen1q2 div.main.svelte-1qen1q2{grid-area:main}',
  map: null
};
const MainWithSidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$slots = compute_slots(slots);
  let { sidebar = !!$$slots.sidebar } = $$props;
  if ($$props.sidebar === void 0 && $$bindings.sidebar && sidebar !== void 0)
    $$bindings.sidebar(sidebar);
  $$result.css.add(css);
  return `<div class="${[
    "svelte-1qen1q2",
    "layout " + (sidebar ? "has-sidebar" : "")
  ].join(" ").trim()}">${sidebar ? `<div class="${["svelte-1qen1q2", "sidebar"].join(" ").trim()}">${slots.sidebar ? slots.sidebar({}) : ``}</div>` : ``}

  <div class="${["svelte-1qen1q2", "main"].join(" ").trim()}">${slots.default ? slots.default({}) : ``}</div>
</div>`;
});
export { MainWithSidebar as M };
