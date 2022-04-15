import { b as byteArrayToString } from "../../../../chunks/binary-string-9be29c7b.js";
import { a as exists, l as list, r as read } from "../../../../chunks/io-caa68b25.js";
import "../../../../chunks/site-config-b274994e.js";
import "tiny-function-queue";
import "node:fs/promises";
import "node:path";
import "nanoid";
async function get({ params }) {
  const collection = params.collection;
  const readmePath = `collections/${collection}/#README.md`;
  const hasReadme = await exists(readmePath);
  const files = (await list(`collections/${collection}`)).filter(({ name }) => !name.startsWith("#") && !name.startsWith("."));
  if (hasReadme) {
    const readmeBytes = await read(readmePath);
    const readmeMarkdown = await byteArrayToString(readmeBytes);
    return { body: { collection, hasReadme, readmeMarkdown, files } };
  } else {
    return { body: { collection, hasReadme, readmeMarkdown: "", files } };
  }
}
export { get };
