import { c as create_ssr_component, v as validate_component, h as add_attribute } from "../../../../../chunks/index-9328c9de.js";
import { M as MainBlock } from "../../../../../chunks/MainBlock-9a8c3e9c.js";
import { M as MainWithSidebar } from "../../../../../chunks/MainWithSidebar-c2d2c4b0.js";
import { F as FileListing } from "../../../../../chunks/FileListing-d326bdbf.js";
import { C as CodeBlock } from "../../../../../chunks/CodeBlock-693831d6.js";
import "../../../../../chunks/site-config-b274994e.js";
/* empty css                                                                      */import "../../../../../chunks/Icon-678427fc.js";
/* empty css                                                                 */import "highlight.js/lib/core";
import "highlight.js/lib/languages/json";
import "highlight.js/lib/languages/yaml";
import "highlight.js/lib/languages/xml";
import "highlight.js/lib/languages/markdown";
const U5B_pathu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let highlightingType;
  let { collection } = $$props;
  let { files = void 0 } = $$props;
  let { path } = $$props;
  let { contents = void 0 } = $$props;
  let { contentsURL = void 0 } = $$props;
  let { type = void 0 } = $$props;
  let { isFile = false } = $$props;
  if ($$props.collection === void 0 && $$bindings.collection && collection !== void 0)
    $$bindings.collection(collection);
  if ($$props.files === void 0 && $$bindings.files && files !== void 0)
    $$bindings.files(files);
  if ($$props.path === void 0 && $$bindings.path && path !== void 0)
    $$bindings.path(path);
  if ($$props.contents === void 0 && $$bindings.contents && contents !== void 0)
    $$bindings.contents(contents);
  if ($$props.contentsURL === void 0 && $$bindings.contentsURL && contentsURL !== void 0)
    $$bindings.contentsURL(contentsURL);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.isFile === void 0 && $$bindings.isFile && isFile !== void 0)
    $$bindings.isFile(isFile);
  highlightingType = type && {
    "application/json": "json",
    "text/markdown": "markdown",
    "text/yaml": "yaml",
    "application/xml": "xml",
    "text/plain": "none"
  }[type];
  return `


${validate_component(MainWithSidebar, "Layout").$$render($$result, { sidebar: false }, {}, {
    default: () => {
      return `${validate_component(MainBlock, "Main").$$render($$result, {
        title: "Collection: " + collection + "/" + path
      }, {}, {
        default: () => {
          return `${files ? `<h1>Files</h1>
      ${validate_component(FileListing, "FileListing").$$render($$result, { files, collection }, {}, {})}` : ``}
    ${isFile ? `${type.startsWith("video/") ? `
        <video${add_attribute("src", contentsURL, 0)}${add_attribute("type", type, 0)} controls></video>` : `${type.startsWith("image/") ? `
        <img${add_attribute("src", contentsURL, 0)}${add_attribute("type", type, 0)}>` : `${type.startsWith("audio/") ? `<audio${add_attribute("src", contentsURL, 0)}${add_attribute("type", type, 0)} controls></audio>` : `${type.startsWith("text/") ? `${validate_component(CodeBlock, "CodeBlock").$$render($$result, {
            lang: highlightingType || "none",
            text: contents
          }, {}, {})}` : `<p>TODO: implement a download thing on this page
        </p>`}`}`}`}` : ``}`;
        }
      })}`;
    }
  })}`;
});
export { U5B_pathu5D as default };
