import { c as create_ssr_component, e as escape, g as getContext, b as subscribe, d as each, f as add_attribute, v as validate_component, h as compute_slots } from "./index-94118fce.js";
import { s as siteConfig } from "./site-config-b274994e.js";
import { I as Icon } from "./Icon-64ece6d3.js";
/* empty css                 */var MainBlock_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "main.svelte-1swuo0c.svelte-1swuo0c{--paper-shade:hsl(27, 6%, 72%);border-radius:1rem;overflow:hidden;box-shadow:1px 2px 3px rgba(0, 0, 0, 0.2),\n      inset 0 0 4px rgba(255, 255, 255, 0.5);background-color:var(--paper-shade);background-image:linear-gradient(var(--paper-shade), var(--paper-shade)), var(--texture-paper);background-blend-mode:soft-light, luminosity;padding-bottom:1rem}main.svelte-1swuo0c h1.svelte-1swuo0c{font-size:1.5rem;--leather-tint:rgb(69, 33, 122);padding:0.3rem 1rem;margin:0 0 1rem 0;background:linear-gradient(var(--leather-tint), var(--leather-tint)), var(--texture-leather);background-blend-mode:hue, luminosity;background-color:var(--leather-tint);background-size:200px;border-top-left-radius:inherit;border-top-right-radius:inherit;color:rgba(13, 16, 41, 0.674);text-shadow:+0.5px +1px 2px rgb(186, 143, 231),\n      -0.5px -1px 2px rgb(57, 28, 89);box-shadow:inset +1px +3px 4px rgba(190, 143, 231, 0.504),\n      inset -1px -3px 4px rgba(34, 19, 44, 0.357),\n             0    0   5px rgba(26, 9, 40, 0.5)}main.svelte-1swuo0c>*:not(h1){margin-left:1rem;margin-right:1rem}",
  map: null
};
const MainBlock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "Document" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  $$result.css.add(css$2);
  return `${$$result.head += `${$$result.title = `<title>${escape(title)} \u2014 ${escape(siteConfig.title)}</title>`, ""}`, ""}

<main class="${"svelte-1swuo0c"}"><h1 class="${"svelte-1swuo0c"}">${escape(title)}</h1>
  ${slots.default ? slots.default({}) : ``}
</main>`;
});
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    page: {
      subscribe: stores.page.subscribe
    },
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    get preloading() {
      console.error("stores.preloading is deprecated; use stores.navigating instead");
      return {
        subscribe: stores.navigating.subscribe
      };
    },
    session: stores.session,
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
var ListSidebar_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "nav.svelte-1eydjh3.svelte-1eydjh3{--paper-shade:hsl(163, 4%, 68%);border-radius:1rem;overflow:hidden;box-shadow:1px 2px 3px rgba(0, 0, 0, 0.2),\n      inset 0 0 4px rgba(255, 255, 255, 0.5);background-color:var(--paper-shade);background-image:linear-gradient(var(--paper-shade), var(--paper-shade)), var(--texture-paper);background-blend-mode:soft-light, luminosity}nav.svelte-1eydjh3>h2.svelte-1eydjh3{font-size:1.5rem;--leather-tint:rgb(56, 213, 211);padding:0.3rem 1rem;margin:0;background:linear-gradient(var(--leather-tint), var(--leather-tint)), var(--texture-leather);background-blend-mode:hue, luminosity;background-color:var(--leather-tint);background-size:200px;border-top-left-radius:inherit;border-top-right-radius:inherit;color:rgba(13, 14, 41, 0.674);text-shadow:+0.5px +1px 2px rgb(143, 231, 230),\n      -0.5px -1px 2px rgb(28, 89, 87);box-shadow:inset +1px +3px 4px rgba(143, 231, 230, 0.504),\n      inset -1px -3px 4px rgba(19, 44, 44, 0.357),\n             0    0   5px rgba(9, 33, 40, 0.5)}nav.svelte-1eydjh3>h2.svelte-1eydjh3::before{content:'';display:inline-block;width:0.6em;height:0.6em;background-color:rgb(181, 156, 10);border-radius:0.4em;margin-right:0.5em;border:1px solid hsla(190, 92%, 10%, 0.238);box-shadow:inset +1px +3px 0.2em hsl(51, 100%, 80%),\n      inset -1px -3px 0.2em hsl(51, 89%, 24%),\n      +1px +3px 4px rgba(143, 231, 230, 0.4),\n      -1px -3px 4px rgba(19, 44, 44, 0.3)}nav.svelte-1eydjh3 ul.svelte-1eydjh3{list-style:none;margin:0;padding:0.7rem 1rem 0.7rem 1rem}nav.svelte-1eydjh3 ul li.svelte-1eydjh3{margin-top:0.1rem}nav.svelte-1eydjh3 ul li a.svelte-1eydjh3{text-decoration:inherit;color:inherit}nav.svelte-1eydjh3 ul li[aria-current] a span.svelte-1eydjh3{text-decoration:underline;text-overflow:ellipsis;cursor:default}nav.svelte-1eydjh3 ul li:hover a span.svelte-1eydjh3{text-decoration:underline}",
  map: null
};
const ListSidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { title = "Sidebar" } = $$props;
  let { items = [["foo", "/foo"], ["bar", "/bar"], ["baz", "/"]] } = $$props;
  let { icon = "cassette" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  $$result.css.add(css$1);
  $$unsubscribe_page();
  return `<nav class="${"svelte-1eydjh3"}"><h2 class="${"svelte-1eydjh3"}">${escape(title)}</h2>
  ${slots.default ? slots.default({}) : `
    <ul class="${"svelte-1eydjh3"}">${each(items, ([label, href]) => {
    return `<li${add_attribute("aria-current", new URL(href, $page.url).toString() === $page.url.toString().split("?")[0] ? "page" : void 0, 0)} class="${"svelte-1eydjh3"}"><a${add_attribute("href", href, 0)} class="${"svelte-1eydjh3"}">${validate_component(Icon, "Icon").$$render($$result, { name: icon }, {}, {})} <span class="${"svelte-1eydjh3"}">${escape(label)}</span></a>
        </li>`;
  })}</ul>
  `}
</nav>`;
});
var MainWithSidebar_svelte_svelte_type_style_lang = "";
const css = {
  code: 'div.layout.svelte-ddtsxt.svelte-ddtsxt{display:grid;grid-auto-flow:column;grid-template-columns:900px;grid-template-areas:"main";max-width:900px;margin-left:auto;margin-right:auto}div.layout.hasSidebar.svelte-ddtsxt.svelte-ddtsxt{grid-template-columns:290px 10px 600px;grid-template-areas:"sidebar gap main"}div.layout.svelte-ddtsxt div.sidebar.svelte-ddtsxt{grid-area:sidebar}div.layout.svelte-ddtsxt div.main.svelte-ddtsxt{grid-area:main}',
  map: null
};
const MainWithSidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$slots = compute_slots(slots);
  $$result.css.add(css);
  return `<div class="${[
    "svelte-ddtsxt",
    "layout " + ($$slots.sidebar ? "hasSidebar" : "")
  ].join(" ").trim()}">${$$slots.sidebar ? `<div class="${["svelte-ddtsxt", "sidebar"].join(" ").trim()}">${slots.sidebar ? slots.sidebar({}) : ``}</div>` : ``}

  <div class="${["svelte-ddtsxt", "main"].join(" ").trim()}">${slots.default ? slots.default({}) : ``}</div>
</div>`;
});
export { ListSidebar as L, MainWithSidebar as M, MainBlock as a };
