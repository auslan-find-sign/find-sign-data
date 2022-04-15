import { c as create_ssr_component, e as escape, d as each } from "./index-9328c9de.js";
/* empty css                                             */import hljs from "highlight.js/lib/core";
import hlJSON from "highlight.js/lib/languages/json";
import hlYAML from "highlight.js/lib/languages/yaml";
import hlXML from "highlight.js/lib/languages/xml";
import hlMD from "highlight.js/lib/languages/markdown";
var CodeBlock_svelte_svelte_type_style_lang = "";
const css = {
  code: `.code-block.svelte-zbh57r.svelte-zbh57r{--background:white;--background-selected:#EFEFEF;--gutter-background:#F5F6F6;--gutter-foreground:#4D4E4C;--gutter-background-selected:#DBDCDD;--gutter-foreground-selected:#4D4E4C;--default:#4E4E4C;--comment:#8E908D;--jsdoc:#767775;--keyword:#8959A8;--value:#E58C3B;--strlit:#768A29;--template:#4E4D4C;--regexp:#3D999F;--operator:#3D999F;--punctual:#4E4E4C;--fn-name:#4371AE;display:grid;grid-template-areas:"gutter box";grid-template-columns:max-content 1fr;border:0 solid transparent;border-top:1px solid rgba(0, 0, 0, 0.2);font:12px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;font-size:12px;line-height:1.3;border-radius:2mm;background-color:var(--background);overflow:hidden}.code-block.svelte-zbh57r .highlight.svelte-zbh57r span.hljs-string{color:var(--strlit) }.code-block.svelte-zbh57r .highlight.svelte-zbh57r span.hljs-attr{color:var(--keyword) }.code-block.svelte-zbh57r .highlight.svelte-zbh57r span.hljs-bullet{color:var(--default) }.code-block.svelte-zbh57r .highlight.svelte-zbh57r span.hljs-number{color:var(--value) }.buttons.svelte-zbh57r.svelte-zbh57r{grid-area:box;justify-self:right;font-size:1em}.buttons.svelte-zbh57r button.svelte-zbh57r{appearance:none;background:white;font:inherit;color:inherit;border:0 none transparent;margin:2px;padding:0;border-radius:1mm}@media(pointer: fine){.buttons.svelte-zbh57r button.svelte-zbh57r{transform:translate(0, 0);opacity:0.1;transition:opacity 100ms}div.code-block.svelte-zbh57r:hover .buttons button.svelte-zbh57r{opacity:0.9}}.highlight.svelte-zbh57r.svelte-zbh57r{grid-area:box;overflow-x:scroll;color:var(--default);hyphens:none;tab-size:2;word-spacing:normal;word-break:normal;word-wrap:normal;font-family:inherit;line-height:inherit;font-size:inherit;font-weight:inherit;white-space:pre;padding-left:1ex;padding-right:1ex}.gutter.svelte-zbh57r.svelte-zbh57r{grid-area:gutter;white-space:pre;background-color:var(--gutter-background);color:var(--gutter-foreground);text-align:right;font:12px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;font-size:12px;line-height:1.3;padding-right:1ex;padding-left:2ex;width:max-content}`,
  map: null
};
const CodeBlock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let highlight;
  let hljsOutput;
  let lines;
  let lineNumbers;
  hljs.registerLanguage("json", hlJSON);
  hljs.registerAliases("application/json", { languageName: "json" });
  hljs.registerLanguage("yaml", hlYAML);
  hljs.registerAliases("text/yaml", { languageName: "yaml" });
  hljs.registerLanguage("xml", hlXML);
  hljs.registerAliases("application/xml", { languageName: "xml" });
  hljs.registerAliases("html", { languageName: "xml" });
  hljs.registerAliases("text/html", { languageName: "xml" });
  hljs.registerLanguage("markdown", hlMD);
  hljs.registerAliases("md", { languageName: "markdown" });
  hljs.registerAliases("text/markdown", { languageName: "markdown" });
  let { lang = "none" } = $$props;
  let { text = "" } = $$props;
  const maxLength = 64 * 1024;
  if ($$props.lang === void 0 && $$bindings.lang && lang !== void 0)
    $$bindings.lang(lang);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  $$result.css.add(css);
  highlight = text.length < maxLength && lang && lang !== "none";
  hljsOutput = highlight && hljs.highlight(text, { language: lang, ignoreIllegals: true });
  lines = (hljsOutput ? hljsOutput.value : text).split(/\r|\n|r\n/gmi);
  lines && lines.length.toString().length;
  lineNumbers = lines.map((html, idx) => (idx + 1).toString());
  return `<div class="${["code-block svelte-zbh57r", "has-gutter"].join(" ").trim()}"><div class="${"highlight svelte-zbh57r"}">${highlight ? `<!-- HTML_TAG_START -->${hljsOutput.value}<!-- HTML_TAG_END -->` : `${escape(text)}`}</div>
  ${`<div class="${"gutter svelte-zbh57r"}">${each(lineNumbers, (num) => {
    return `${escape(`${num}
`)}`;
  })}</div>`}
  ${``}
</div>`;
});
export { CodeBlock as C };
