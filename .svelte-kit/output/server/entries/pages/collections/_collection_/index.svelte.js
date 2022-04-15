import { c as create_ssr_component, d as each, v as validate_component, e as escape, a as add_classes, h as add_attribute } from "../../../../chunks/index-9328c9de.js";
import { M as MainBlock } from "../../../../chunks/MainBlock-9a8c3e9c.js";
import { M as MainWithSidebar } from "../../../../chunks/MainWithSidebar-c2d2c4b0.js";
import { L as ListSidebar } from "../../../../chunks/ListSidebar-ab43ec0c.js";
import { F as FileListing } from "../../../../chunks/FileListing-d326bdbf.js";
import { Lexer } from "marked";
import { C as CodeBlock } from "../../../../chunks/CodeBlock-693831d6.js";
import "../../../../chunks/site-config-b274994e.js";
/* empty css                                                                   */import "../../../../chunks/Icon-678427fc.js";
/* empty css                                                              *//* empty css                                  */import "highlight.js/lib/core";
import "highlight.js/lib/languages/json";
import "highlight.js/lib/languages/yaml";
import "highlight.js/lib/languages/xml";
import "highlight.js/lib/languages/markdown";
const MarkdownRender = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${data.type === "paragraph" ? `<p>${each(data.tokens, (token) => {
    return `${validate_component(MarkdownRender, "svelte:self").$$render($$result, { data: token }, {}, {})}`;
  })}</p>` : `${data.type === "blockquote" ? `<blockquote>${each(data.tokens, (token) => {
    return `${validate_component(MarkdownRender, "svelte:self").$$render($$result, { data: token }, {}, {})}`;
  })}</blockquote>` : `${data.type === "code" ? `${validate_component(CodeBlock, "CodeBlock").$$render($$result, {
    lang: data.lang || "none",
    text: data.text
  }, {}, {})}` : `${data.type === "heading" ? `${data.depth === 1 ? `<h1>${each(data.tokens, (token) => {
    return `${validate_component(MarkdownRender, "svelte:self").$$render($$result, { data: token }, {}, {})}`;
  })}</h1>` : `${data.depth === 2 ? `<h2>${each(data.tokens, (token) => {
    return `${validate_component(MarkdownRender, "svelte:self").$$render($$result, { data: token }, {}, {})}`;
  })}</h2>` : `${data.depth === 3 ? `<h3>${each(data.tokens, (token) => {
    return `${validate_component(MarkdownRender, "svelte:self").$$render($$result, { data: token }, {}, {})}`;
  })}</h3>` : `${data.depth === 4 ? `<h4>${each(data.tokens, (token) => {
    return `${validate_component(MarkdownRender, "svelte:self").$$render($$result, { data: token }, {}, {})}`;
  })}</h4>` : `${data.depth === 5 ? `<h5>${each(data.tokens, (token) => {
    return `${validate_component(MarkdownRender, "svelte:self").$$render($$result, { data: token }, {}, {})}`;
  })}</h5>` : `${data.depth === 6 ? `<h6>${each(data.tokens, (token) => {
    return `${validate_component(MarkdownRender, "svelte:self").$$render($$result, { data: token }, {}, {})}`;
  })}</h6>` : ``}`}`}`}`}`}` : `${data.type === "hr" ? `<hr>` : `${data.type === "list" ? `${data.ordered ? `<ol style="${"--start-list: " + escape(data.start)}"${add_classes((data.loose ? "loose-list" : "").trim())}>${each(data.items, (item) => {
    return `${validate_component(MarkdownRender, "svelte:self").$$render($$result, { data: item }, {}, {})}`;
  })}</ol>` : `<ul>${each(data.items, (item) => {
    return `${validate_component(MarkdownRender, "svelte:self").$$render($$result, { data: item }, {}, {})}`;
  })}</ul>`}` : `${data.type === "list_item" ? `<li${add_classes(((!!data.task ? "task" : "") + " " + (!!data.checked ? "checked" : "") + " " + (!!data.loose ? "loose" : "")).trim())}>${each(data.tokens, (token) => {
    return `${validate_component(MarkdownRender, "svelte:self").$$render($$result, { data: token }, {}, {})}`;
  })}</li>` : `${data.type === "image" ? `<img${add_attribute("src", data.href, 0)}${add_attribute("alt", data.title, 0)}>` : `${data.type === "html" ? `${escape(data.text)}` : `${data.type === "text" ? `${escape(data.text)}` : `${data.type === "link" ? `<a${add_attribute("href", data.href, 0)}${add_attribute("title", data.title, 0)} referrerpolicy="${"no-referrer"}">${each(data.tokens, (token) => {
    return `${validate_component(MarkdownRender, "svelte:self").$$render($$result, { data: token }, {}, {})}`;
  })}</a>` : `${data.type === "strong" ? `<strong>${each(data.tokens, (token) => {
    return `${validate_component(MarkdownRender, "svelte:self").$$render($$result, { data: token }, {}, {})}`;
  })}</strong>` : `${data.type === "em" ? `<em>${each(data.tokens, (token) => {
    return `${validate_component(MarkdownRender, "svelte:self").$$render($$result, { data: token }, {}, {})}`;
  })}</em>` : `${data.type === "del" ? `<del>${each(data.tokens, (token) => {
    return `${validate_component(MarkdownRender, "svelte:self").$$render($$result, { data: token }, {}, {})}`;
  })}</del>` : `${data.type === "codespan" ? `<code>${escape(data.text)}</code>` : `${data.type === "br" ? `<br>` : ``}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`;
});
const Markdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ast;
  let { markdown = "" } = $$props;
  if ($$props.markdown === void 0 && $$bindings.markdown && markdown !== void 0)
    $$bindings.markdown(markdown);
  ast = Lexer.lex(markdown, { sanitize: false, smartypants: true });
  return `${each(ast, (node) => {
    return `${validate_component(MarkdownRender, "MarkdownRender").$$render($$result, { data: node }, {}, {})}`;
  })}`;
});
function encodePath(path) {
  return path.split("/").map((x) => encodeURIComponent(x)).join("/");
}
const U5Bcollectionu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let sidebarItems;
  let { collection = "" } = $$props;
  let { files = [] } = $$props;
  let { hasReadme = false } = $$props;
  let { readmeMarkdown = "" } = $$props;
  if ($$props.collection === void 0 && $$bindings.collection && collection !== void 0)
    $$bindings.collection(collection);
  if ($$props.files === void 0 && $$bindings.files && files !== void 0)
    $$bindings.files(files);
  if ($$props.hasReadme === void 0 && $$bindings.hasReadme && hasReadme !== void 0)
    $$bindings.hasReadme(hasReadme);
  if ($$props.readmeMarkdown === void 0 && $$bindings.readmeMarkdown && readmeMarkdown !== void 0)
    $$bindings.readmeMarkdown(readmeMarkdown);
  sidebarItems = files.map((x) => ({
    icon: x.isFolder ? "folder" : {
      application: "cassette",
      image: "picture",
      video: "film",
      text: x.type === "text/calendar" ? "calendar" : "file",
      font: "pictures",
      audio: "cassette",
      model: "cassette"
    }[x.type.split("/")[0]],
    label: x.name,
    url: `/collections/${encodeURIComponent(collection)}/files/${encodePath(x.path)}`
  }));
  return `${validate_component(MainWithSidebar, "Layout").$$render($$result, {}, {}, {
    sidebar: () => {
      return `${validate_component(ListSidebar, "ListSidebar").$$render($$result, {
        slot: "sidebar",
        title: "Files",
        icon: "",
        items: sidebarItems
      }, {}, {})}`;
    },
    default: () => {
      return `${validate_component(MainBlock, "Main").$$render($$result, { title: "Collection: " + collection }, {}, {
        default: () => {
          return `<h1>Files</h1>
    ${validate_component(FileListing, "FileListing").$$render($$result, { files, collection }, {}, {})}
    ${hasReadme ? `${validate_component(Markdown, "Markdown").$$render($$result, { markdown: readmeMarkdown }, {}, {})}` : ``}`;
        }
      })}`;
    }
  })}`;
});
export { U5Bcollectionu5D as default };
