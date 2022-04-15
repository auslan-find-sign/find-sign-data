import { c as create_ssr_component, e as escape } from "./index-9328c9de.js";
import { s as siteConfig } from "./site-config-b274994e.js";
/* empty css                                                  */const css = {
  code: "main.svelte-11io2te.svelte-11io2te{--paper-shade:hsl(27, 6%, 72%);border-radius:1rem;overflow:hidden;box-shadow:1px 2px 3px rgba(0, 0, 0, 0.2),\n      inset 0 0 4px rgba(255, 255, 255, 0.5);background-color:var(--paper-shade);background-image:linear-gradient(var(--paper-shade), var(--paper-shade)), var(--texture-paper);background-blend-mode:soft-light, luminosity}main.svelte-11io2te h1.title.svelte-11io2te{font-size:1.5rem;--leather-tint:rgb(69, 33, 122);padding:0.3rem 1rem;margin:0 0 1rem 0;background:linear-gradient(var(--leather-tint), var(--leather-tint)), var(--texture-leather);background-blend-mode:hue, luminosity;background-color:var(--leather-tint);background-size:200px;border-top-left-radius:inherit;border-top-right-radius:inherit;color:rgba(13, 16, 41, 0.674);text-shadow:+0.5px +1px 2px rgb(186, 143, 231),\n      -0.5px -1px 2px rgb(57, 28, 89);box-shadow:inset +1px +3px 4px rgba(190, 143, 231, 0.504),\n      inset -1px -3px 4px rgba(34, 19, 44, 0.357),\n             0    0   5px rgba(26, 9, 40, 0.5)}main.svelte-11io2te>*:not(h1.title){margin-left:1rem;margin-right:1rem;margin-top:1rem;margin-bottom:1rem;width:calc(100% - 2rem);box-sizing:border-box}",
  map: null
};
const MainBlock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "Document" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  $$result.css.add(css);
  return `${$$result.head += `${$$result.title = `<title>${escape(title)} \u2014 ${escape(siteConfig.title)}</title>`, ""}`, ""}

<main class="${"svelte-11io2te"}"><h1 class="${"title svelte-11io2te"}">${escape(title)}</h1>
  ${slots.default ? slots.default({}) : ``}
</main>`;
});
export { MainBlock as M };
