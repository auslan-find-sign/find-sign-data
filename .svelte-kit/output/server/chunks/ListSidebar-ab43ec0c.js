import { g as getContext, c as create_ssr_component, f as subscribe, e as escape, d as each, h as add_attribute, v as validate_component } from "./index-9328c9de.js";
import { I as Icon } from "./Icon-678427fc.js";
/* empty css                 */const getStores = () => {
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
const css = {
  code: "nav.svelte-1rlk7yk.svelte-1rlk7yk{--paper-shade:hsl(163, 4%, 68%);border-radius:1rem;overflow:hidden;box-shadow:1px 2px 3px rgba(0, 0, 0, 0.2),\n      inset 0 0 4px rgba(255, 255, 255, 0.5);background-color:var(--paper-shade);background-image:linear-gradient(var(--paper-shade), var(--paper-shade)), var(--texture-paper);background-blend-mode:soft-light, luminosity}nav.svelte-1rlk7yk>h2.svelte-1rlk7yk{font-size:1.5rem;--leather-tint:rgb(56, 213, 211);padding:0.3rem 1rem;margin:0;background:linear-gradient(var(--leather-tint), var(--leather-tint)), var(--texture-leather);background-blend-mode:hue, luminosity;background-color:var(--leather-tint);background-size:200px;border-top-left-radius:inherit;border-top-right-radius:inherit;color:rgba(13, 14, 41, 0.674);text-shadow:+0.5px +1px 2px rgb(143, 231, 230),\n      -0.5px -1px 2px rgb(28, 89, 87);box-shadow:inset +1px +3px 4px rgba(143, 231, 230, 0.504),\n      inset -1px -3px 4px rgba(19, 44, 44, 0.357),\n             0    0   5px rgba(9, 33, 40, 0.5)}nav.svelte-1rlk7yk>h2.svelte-1rlk7yk::before,nav.svelte-1rlk7yk>h2.svelte-1rlk7yk::after{content:'';display:inline-block;width:0.6em;height:0.6em;background-color:rgb(190, 166, 29);background-image:var(--reflection-matcap);background-size:cover;border-radius:0.4em;border:1px solid hsla(190, 92%, 10%, 0.238);box-shadow:inset +1px +3px 0.2em hsl(50, 54%, 68%),\n      inset -1px -3px 0.2em hsl(51, 89%, 24%),\n      +1px +3px 4px rgba(143, 231, 230, 0.4),\n      -1px -3px 4px rgba(19, 44, 44, 0.3)}nav.svelte-1rlk7yk>h2.svelte-1rlk7yk::before{margin-right:0.5em}nav.svelte-1rlk7yk>h2.svelte-1rlk7yk::after{margin-left:0.5em}nav.svelte-1rlk7yk ul.svelte-1rlk7yk{list-style:none;margin:0;padding:0.7rem 1rem 0.7rem 1rem}nav.svelte-1rlk7yk ul li.svelte-1rlk7yk{margin-top:0.1rem}nav.svelte-1rlk7yk ul li a.svelte-1rlk7yk{text-decoration:inherit;color:inherit}nav.svelte-1rlk7yk ul li[aria-current] a span.svelte-1rlk7yk{text-decoration:underline;text-overflow:ellipsis;cursor:default}nav.svelte-1rlk7yk ul li:hover a span.svelte-1rlk7yk{text-decoration:underline}",
  map: null
};
const ListSidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let itemObjects;
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
  $$result.css.add(css);
  itemObjects = items.map((x) => {
    if (Array.isArray(x)) {
      return { label: x[0], url: x[1], icon };
    } else {
      return { label: x.url, url: x.url, icon, ...x };
    }
  });
  $$unsubscribe_page();
  return `<nav class="${"svelte-1rlk7yk"}"><h2 class="${"svelte-1rlk7yk"}">${escape(title)}</h2>
  ${slots.default ? slots.default({}) : `
    <ul class="${"svelte-1rlk7yk"}">${each(itemObjects, ({ label, url, icon: icon2 }) => {
    return `<li${add_attribute("aria-current", new URL(url, $page.url).toString() === $page.url.toString().split("?")[0] ? "page" : void 0, 0)} class="${"svelte-1rlk7yk"}"><a${add_attribute("href", url, 0)} class="${"svelte-1rlk7yk"}">${validate_component(Icon, "Icon").$$render($$result, { name: icon2 }, {}, {})} <span class="${"svelte-1rlk7yk"}">${escape(label)}</span></a>
        </li>`;
  })}</ul>
  `}
</nav>`;
});
export { ListSidebar as L };
