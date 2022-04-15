import { e as ensureFolder, l as list } from "../../../chunks/io-caa68b25.js";
import "../../../chunks/site-config-b274994e.js";
import "tiny-function-queue";
import "node:fs/promises";
import "node:path";
import "nanoid";
async function get() {
  await ensureFolder("collections");
  const collections = await list("collections");
  return { body: { collections: collections.map((x) => x.name) } };
}
export { get };
