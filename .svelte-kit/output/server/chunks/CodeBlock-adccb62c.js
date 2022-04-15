import { c as create_ssr_component, f as add_attribute, e as escape, d as each, v as validate_component, n as null_to_empty } from "./index-94118fce.js";
import { I as Icon } from "./Icon-64ece6d3.js";
import prism from "prismjs";
function* tokensToRanges(tokens, inheritTypes = []) {
  for (const token of tokens) {
    if (typeof token === "string") {
      yield { text: token, types: inheritTypes };
    } else if (token instanceof prism.Token) {
      const content = Array.isArray(token.content) ? token.content : [token.content];
      yield* tokensToRanges(content, [...inheritTypes, token.type]);
    }
  }
}
const newline = Symbol("newline");
function* splitRangesOnLines(ranges) {
  for (const range of ranges) {
    if (range.text.includes("\n")) {
      const sections = range.text.split("\n");
      yield { text: sections.shift(), types: range.types };
      while (sections.length > 0) {
        yield newline;
        yield { text: sections.shift(), types: range.types };
      }
    } else {
      yield range;
    }
  }
}
function* arrayify(ranges) {
  let accumulator = [];
  for (const range of ranges) {
    if (range === newline) {
      yield accumulator;
      accumulator = [];
    } else {
      accumulator.push(range);
    }
  }
  if (accumulator.length > 0) {
    yield accumulator;
  }
}
function* stripRedundant(lines) {
  for (const line of lines) {
    if (line.length === 0) {
      yield line;
    } else {
      const out = line.slice(0, 1);
      for (const piece of line.slice(1)) {
        if (piece.types.join(" ") === out[out.length - 1].types.join(" ")) {
          out[out.length - 1].text += piece.text;
        } else {
          out.push(piece);
        }
      }
      yield out;
    }
  }
}
function* simplify(lines) {
  for (const line of lines) {
    const out = [];
    for (const token of line) {
      if (token.text.match(/^[ \t\r\n]*$/)) {
        out.push({ text: token.text, types: [] });
      } else {
        out.push(token);
      }
    }
    yield out;
  }
}
function codeToLines(code, language = "json") {
  if (typeof code !== "string")
    code = JSON.stringify(code, null, 2);
  const grammars = {
    json: prism.languages.json5,
    jsonl: prism.languages.json,
    javascript: prism.languages.js,
    yaml: prism.languages.yaml,
    xml: prism.languages.xml,
    html: prism.languages.html,
    markdown: prism.languages.markdown
  };
  const grammar = grammars[language];
  const tokens = grammar ? prism.tokenize(code, grammar) : [code];
  let lines = [...simplify(stripRedundant(arrayify(splitRangesOnLines(tokensToRanges(tokens)))))];
  lines = lines.map((ranges) => ranges.filter(({ text }) => text.length > 0));
  return {
    gutterDigits: lines.length.toString().length,
    lines
  };
}
var CodeBlock_svelte_svelte_type_style_lang = "";
const css = {
  code: `.code-block.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj{display:grid;grid-template-areas:"box"}.buttons.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj{grid-area:box;justify-self:right;font-size:1.5rem}.buttons.svelte-3o8ptj button.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj{appearance:none;background:transparent;font:inherit;color:inherit;border:0 none transparent}@media(pointer: fine){.buttons.svelte-3o8ptj button.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj{transform:translate(0, 0);opacity:0.1;transition:opacity 100ms}div.code-block.svelte-3o8ptj:hover .buttons button.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj{opacity:0.9}}pre.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj{grid-area:box;border:0 solid transparent;border-top:1px solid rgba(0, 0, 0, 0.2);border-bottom:1px solid (255, 255, 255, 0.2);margin:0;padding:0}pre.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj{--background:white;--background-selected:#EFEFEF;--gutter-background:#F5F6F6;--gutter-foreground:#4D4E4C;--gutter-background-selected:#DBDCDD;--gutter-foreground-selected:#4D4E4C;--default:#4E4E4C;--comment:#8E908D;--jsdoc:#767775;--keyword:#8959A8;--value:#E58C3B;--strlit:#768A29;--template:#4E4D4C;--regexp:#3D999F;--operator:#3D999F;--punctual:#4E4E4C;--fn-name:#4371AE;font:12px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;line-height:1.3;border-radius:2mm;overflow-x:scroll;counter-reset:line-number;background-color:var(--background);color:var(--default);hyphens:none;tab-size:2;word-spacing:normal;word-break:normal;word-wrap:normal}span.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj:where(.comment, .prolog, .doctype, .cdata){color:var(--comment) }span.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj:where(.keyword, .key, .property){color:var(--keyword) }span.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj:where(.boolean, .number){color:var(--value) }span.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj:where(.selector, .attr-name, .string, .char, .builtin, .inserted){color:var(--strlit) }span.template-string.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj,.code-block.svelte-3o8ptj>pre.svelte-3o8ptj>code.svelte-3o8ptj>span.tag.svelte-3o8ptj:not(.punctuation, .attr-name, .attr-value){color:var(--template) }span.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj:where(.regex, .important){color:var(--regexp) }span.operator.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj{color:var(--operator) }span.punctuation.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj{color:var(--punctual) }span.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj:where(.atrule, .attr-value, .function, .class-name){color:var(--fn-name) }.code-block[data-language=yaml].svelte-3o8ptj span.punctuation.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj{color:var(--operator) }code.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj{display:block;font-size:inherit;font-family:inherit;font-weight:inherit;white-space:pre}.hasGutter.svelte-3o8ptj code.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj:first-child::before{padding-top:1mm}.hasGutter.svelte-3o8ptj code.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj:last-child::before{padding-bottom:1mm}code.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj:hover{background-color:var(--background-selected)}.hasGutter.svelte-3o8ptj code.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj::before{content:counter(line-number);counter-increment:line-number;display:inline-block;background-color:var(--gutter-background);color:var(--gutter-foreground);text-align:right;width:calc(1ex * var(--digits) + 2ex);padding-left:1ex;padding-right:1ex;margin-right:1ex}.hasGutter.svelte-3o8ptj code.svelte-3o8ptj.svelte-3o8ptj.svelte-3o8ptj:hover::before{background-color:var(--gutter-background-selected);color:var(--gutter-foreground-selected)}`,
  map: null
};
const CodeBlock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let lineData;
  let { lang = "json" } = $$props;
  let { text = "" } = $$props;
  let { lineNumbers = true } = $$props;
  let clipboardState = "clipboard";
  if ($$props.lang === void 0 && $$bindings.lang && lang !== void 0)
    $$bindings.lang(lang);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.lineNumbers === void 0 && $$bindings.lineNumbers && lineNumbers !== void 0)
    $$bindings.lineNumbers(lineNumbers);
  $$result.css.add(css);
  lineData = codeToLines(text, lang);
  return `<div class="${["code-block svelte-3o8ptj", lineNumbers ? "hasGutter" : ""].join(" ").trim()}"${add_attribute("data-language", lang, 0)}><pre style="${"--gutter-digits: " + escape(lineData.gutterDigits)}" class="${"svelte-3o8ptj"}">${each(lineData.lines, (ranges) => {
    return `<code class="${"svelte-3o8ptj"}">${each(ranges, ({ text: text2, types }) => {
      return `${types.length > 0 ? `<span class="${escape(null_to_empty(types.join(" "))) + " svelte-3o8ptj"}">${escape(text2)}</span>` : `${escape(text2)}`}`;
    })}</code>`;
  })}</pre>
  <div class="${"buttons svelte-3o8ptj"}"><button label="${"Copy to Clipboard"}" class="${"svelte-3o8ptj"}">${validate_component(Icon, "Icon").$$render($$result, { name: clipboardState }, {}, {})}</button></div>
</div>`;
});
export { CodeBlock as C };
