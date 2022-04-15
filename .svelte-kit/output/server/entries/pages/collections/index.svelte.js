import { c as create_ssr_component, v as validate_component, d as each, e as escape } from "../../../chunks/index-9328c9de.js";
import { M as MainBlock } from "../../../chunks/MainBlock-9a8c3e9c.js";
import { M as MainWithSidebar } from "../../../chunks/MainWithSidebar-c2d2c4b0.js";
import "../../../chunks/site-config-b274994e.js";
/* empty css                                                                */const Collections = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { collections = [] } = $$props;
  if ($$props.collections === void 0 && $$bindings.collections && collections !== void 0)
    $$bindings.collections(collections);
  return `${validate_component(MainWithSidebar, "MainWithSidebar").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(MainBlock, "MainBlock").$$render($$result, { title: "List of Collections" }, {}, {
        default: () => {
          return `${collections.length > 0 ? `<ul>${each(collections, (name) => {
            return `<li><a href="${"/collections/" + escape(encodeURIComponent(name)) + "/"}">${escape(name)}</a></li>`;
          })}</ul>` : `<p>No collections are available</p>`}`;
        }
      })}`;
    }
  })}`;
});
export { Collections as default };
