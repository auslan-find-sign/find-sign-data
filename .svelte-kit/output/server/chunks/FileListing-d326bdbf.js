import { c as create_ssr_component, d as each, h as add_attribute, e as escape, v as validate_component } from "./index-9328c9de.js";
import { I as Icon } from "./Icon-678427fc.js";
function friendly(date) {
  if (typeof date === "string")
    date = new Date(date);
  const now = new Date();
  const time = date.toLocaleTimeString();
  if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()) {
    if (date.getDate() === now.getDate()) {
      return `Today ${time}`;
    } else if (date.getDate() === now.getDate() - 1) {
      return `Yesterday ${time}`;
    }
  }
  return `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(-2)}-${`0${date.getDate()}`.slice(-2)} ${time}`;
}
function bytes(bytes2) {
  if (bytes2 < 512) {
    return `${bytes2} b`;
  } else if (bytes2 < 8192) {
    return `${Math.round(bytes2 / 1024 * 10) / 10} kb`;
  } else if (bytes2 < 1024 * 1024) {
    return `${Math.round(bytes2 / 1024)} kb`;
  } else if (bytes2 < 1024 * 1024 * 8) {
    return `${Math.round(bytes2 / (1024 * 1024) * 10) / 10} mb`;
  } else if (bytes2 < 1024 * 1024 * 1024) {
    return `${Math.round(bytes2 / (1024 * 1024))} mb`;
  } else {
    return `${Math.round(bytes2 / (1024 * 1024))} gb`;
  }
}
var FileListing_svelte_svelte_type_style_lang = "";
const css = {
  code: "table.svelte-15xn22j.svelte-15xn22j.svelte-15xn22j{display:grid;grid-template-columns:1fr max-content max-content max-content;margin-left:0;margin-right:0;width:100%}table.svelte-15xn22j thead.svelte-15xn22j.svelte-15xn22j,table.svelte-15xn22j tbody.svelte-15xn22j.svelte-15xn22j,table.svelte-15xn22j tr.svelte-15xn22j.svelte-15xn22j{display:contents}table.svelte-15xn22j thead td.svelte-15xn22j.svelte-15xn22j{border-bottom:1px solid red}table.svelte-15xn22j td.svelte-15xn22j.svelte-15xn22j{padding:1ex}table.svelte-15xn22j td.svelte-15xn22j.svelte-15xn22j:first-child{padding-left:1em}table.svelte-15xn22j td.svelte-15xn22j.svelte-15xn22j:last-child{padding-right:1em}table.svelte-15xn22j td.svelte-15xn22j.svelte-15xn22j:not(:first-child){border-left:1px solid green}tbody.svelte-15xn22j tr.svelte-15xn22j:nth-child(even) td.svelte-15xn22j{background-color:rgba(0, 0, 0, 0.066)}table.svelte-15xn22j td.svelte-15xn22j.svelte-15xn22j:nth-child(1){grid-column:1}table.svelte-15xn22j td.svelte-15xn22j.svelte-15xn22j:nth-child(2){grid-column:2}table.svelte-15xn22j td.svelte-15xn22j.svelte-15xn22j:nth-child(3){grid-column:3}table.svelte-15xn22j td.svelte-15xn22j.svelte-15xn22j:nth-child(4){grid-column:4}table.svelte-15xn22j td.svelte-15xn22j.svelte-15xn22j:nth-child(5){grid-column:5}thead.svelte-15xn22j.svelte-15xn22j.svelte-15xn22j{border-bottom:1px solid red}tbody.svelte-15xn22j td.svelte-15xn22j.svelte-15xn22j:last-child{text-align:right}",
  map: null
};
const FileListing = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { collection } = $$props;
  let { files = [] } = $$props;
  function filePath(file, mode) {
    const subpath = file.path.split("/").slice(2).map((x) => encodeURIComponent(x)).join("/");
    return `/collections/${encodeURIComponent(collection)}/${mode}/${subpath}`;
  }
  if ($$props.collection === void 0 && $$bindings.collection && collection !== void 0)
    $$bindings.collection(collection);
  if ($$props.files === void 0 && $$bindings.files && files !== void 0)
    $$bindings.files(files);
  $$result.css.add(css);
  return `<table class="${"svelte-15xn22j"}"><thead class="${"svelte-15xn22j"}"><tr class="${"svelte-15xn22j"}"><td class="${"svelte-15xn22j"}">Filename</td>
      
      <td class="${"svelte-15xn22j"}">Size</td>
      <td class="${"svelte-15xn22j"}">Modified</td>
      <td class="${"svelte-15xn22j"}">Download</td></tr></thead>
  <tbody class="${"svelte-15xn22j"}">${each(files, (file) => {
    return `<tr class="${"svelte-15xn22j"}"><td class="${"svelte-15xn22j"}"><a${add_attribute("href", filePath(file, "files"), 0)}>${escape(decodeURIComponent(file.name))}</a></td>
        
        <td class="${"svelte-15xn22j"}">${escape(bytes(file.size))}</td>
        <td class="${"svelte-15xn22j"}">${escape(friendly(file.lastModified))}</td>
        <td class="${"svelte-15xn22j"}"><a${add_attribute("href", filePath(file, "raw"), 0)} download>${validate_component(Icon, "Icon").$$render($$result, { name: "out", label: "Download" }, {}, {})}</a></td>
      </tr>`;
  })}</tbody>
</table>`;
});
export { FileListing as F };
